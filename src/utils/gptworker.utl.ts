import { MODERATION_URL } from "@src/app/api/post/post.constants";
import { PostModel } from "@src/app/api/post/post.model";
import { environment } from "./env.util";
const axios = require('axios');
const cheerio = require('cheerio');
const openai = require('openai');
const client = new openai({ apiKey: environment.OPENAI_API_KEY });
const gptWorker = async (data:any) => {
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
        console.log('No OG title ,description or image found in the HTML');
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: MODERATION_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.OPENAI_API_KEY}`
      },
      data: { input: content }
    };
    const moderation = await axios.request(config).catch((err:any)=>{
      console.log('error in moderation',err);
      throw err            
    })
    const moderationResult = moderation.data;
    console.log('Moderation Result:', JSON.stringify(moderationResult));
    if (moderationResult.results[0].flagged === false) {
      //tags generation
      const tagsRequest = await client.chat.completions.create({
          model: environment.MODEL_NAME,
          messages: [
            { role: 'user', content: `Generate 6 one words tags like what is content about from this content: ${content} ` }
          ]
        });
        const tags = tagsRequest.choices[0]?.message?.content;
        //Summary generation
        const stringArray = tags.split('\n');
        const trimmedArray = stringArray.map((item: string) => item.replace(/^\d+\.\s*/, '').trim());
        const summary = await client.chat.completions.create({
          model: environment.MODEL_NAME,
          messages: [{ role: 'user', content: `Summarize this content  ${content}` }],
        });
        // Read time 
        const wordsArray = content.split(' ');
        const wordCount = wordsArray.length;
        const wordsPerMinute = 265;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        const result = PostModel.findByIdAndUpdate(
          { _id: data.postId },{
          gpt_summary: summary.choices[0].message.content,
          tags: trimmedArray,
          mod_review: true,
          readingTime:readTime,
          title,
          description,
          image    
        });
        return result
      
    } else {
      console.log("The content is flagged. Handle it accordingly.");
    } 
  } catch (error) {
    console.error('Error:',error)
  }   
}
export default gptWorker;