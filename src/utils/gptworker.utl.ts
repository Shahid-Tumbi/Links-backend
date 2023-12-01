import { MODERATION_URL } from "@src/app/api/post/post.constants";
import { PostModel } from "@src/app/api/post/post.model";
import { environment } from "./env.util";
const axios = require('axios');
const cheerio = require('cheerio');
const openai = require('openai');
const client = new openai({ apiKey: environment.OPENAI_API_KEY });

const gptWorker = async (data: any) => {
  try {
    const html = data.postData;
    const $ = cheerio.load(html);
    const content = $('p').text();
    if (!content) {
      throw new Error('No content found in the HTML');
    }
    const title = $("meta[property='og:title']").attr("content");
    const description = $("meta[property='og:description']").attr("content");
    const image = $("meta[property='og:image']").attr("content");
    if (!title || !description || !image) {
      console.log('No OG title, description, or image found in the HTML');
    }

    let postdate;
    try {
      postdate = await axios.get(`https://carbondate.cs.odu.edu/cd/${data.link}`);      
    } catch (error) {
      console.error('Error fetching post date:', error);
      // You can choose to handle this error or ignore it if required
      // throw error; // Uncomment this line if you want to propagate the error
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
        data: { input: content }
      };
      const moderation = await axios.request(config);
      moderationResult = moderation.data;
      console.log('Moderation Result:', JSON.stringify(moderationResult));
    } catch (error) {
      console.error('Error in moderation:', error);
      // You can choose to handle this error or ignore it if required
      // throw error; // Uncomment this line if you want to propagate the error
    }

    let summaryResult;
    try {
      const summary = await client.chat.completions.create({
        model: environment.MODEL_NAME,
        messages: [{ role: 'user', content: `Summarize this content ${content}` }],
      });
      summaryResult = summary.choices[0].message.content;
    } catch (error) {
      console.error('Error generating summary:', error);
      // You can choose to handle this error or ignore it if required
      // throw error; // Uncomment this line if you want to propagate the error
    }

    const wordsArray = content.split(' ');
    const wordCount = wordsArray.length;
    const wordsPerMinute = 265;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    const result = await PostModel.findByIdAndUpdate(
      { _id: data.postId },
      {
        gpt_summary: summaryResult || '', // If summary generation fails, set an empty string
        mod_review: true,
        readingTime: readTime,
        title,
        description,
        image,
        postPublished: postdate?.data['estimated-creation-date']
      }
    );

    return result;
  } catch (error) {
    console.error('Error:', error);
    // You can handle the error or rethrow it based on your requirement
    // throw error; // Uncomment this line if you want to propagate the error
  }
};

export default gptWorker;