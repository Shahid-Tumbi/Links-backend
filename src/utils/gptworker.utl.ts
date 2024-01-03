import { MODERATION_URL } from "@src/app/api/post/post.constants";
import { PostModel } from "@src/app/api/post/post.model";
import { environment } from "./env.util";
import { consumer, producer } from "@src/rabbitmq";
import { QueueName } from "@src/app/api/user/user.constants";
import { User } from "@src/app/api/user";
import { DbLogger } from "./logger.util";
const axios = require('axios');
const openai = require('openai');
const client = new openai({ apiKey: environment.OPENAI_API_KEY });

const gptWorker = async (data: any) => {
  try {

    let postdate;
    try {
      postdate = await axios.get(`https://carbondate.cs.odu.edu/cd/${data.link}`);      
    } catch (error) {
      console.error('Error fetching post date:', error);
      DbLogger.error('Error fetching post date:', error);
      // You can choose to handle this error or ignore it if required
      // throw error;
    }

    let moderationResult;
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: MODERATION_URL,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${environment.OPENAI_API_KEY}`
        },
        data: { input:data?.postData }
      };
      const moderation = await axios.request(config);
      moderationResult = moderation.data;
      console.log('Moderation Result:', JSON.stringify(moderationResult));
    } catch (error) {
      console.error('Error in moderation:', error);
      DbLogger.error('Error in moderation:', error);
      // You can choose to handle this error or ignore it if required
      // throw error; 
    }

    let summaryResult;
    try {
      const summary = await client.chat.completions.create({
        model: environment.MODEL_NAME,
        messages: [{ role: 'user', content: `Summarize this content ${data.link}.content sould be based on main article.` }],
      });
      summaryResult = summary.choices[0].message.content;
    } catch (error) {
      console.error('Error generating summary:', error);
      DbLogger.error('Error generating summary:', error);
      // You can choose to handle this error or ignore it if required
      // throw error; 
    }

    const wordsArray = data?.postData.split(' ');
    const wordCount = wordsArray.length;
    const wordsPerMinute = 265;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    const result = await PostModel.findByIdAndUpdate(
      { _id: data.postId },
      {
        gpt_summary: summaryResult || '', // If summary generation fails, set an empty string
        mod_review: moderationResult?.results[0]?.flagged === false ? true : false,
        readingTime: readTime,
        postPublished: postdate?.data['estimated-creation-date'] || new Date()
      }
    );

    return result;
  } catch (error) {
    console.error('Error:', error);
    DbLogger.error('Error:', error);
    const userData = await User.findOne({_id:data.userId})
    producer({
      token: userData.deviceToken,

      notification: {
        title: 'Posting failed',
        body: 
        'Recent published post rejected',
      },
      id: data.postId,             
    },QueueName.notification);
    consumer(QueueName.notification);
    // You can handle the error or rethrow it based on your requirement
    // throw error; // Uncomment this line if you want to propagate the error
  }
};

export default gptWorker;