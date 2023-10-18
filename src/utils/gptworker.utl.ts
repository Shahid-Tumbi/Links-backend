import { MODERATION_URL } from "@src/app/api/post/post.constants";
import { PostModel } from "@src/app/api/post/post.model";
const axios = require('axios');
const cheerio = require('cheerio');
const openai = require('openai');
const client = new openai({ apiKey: process.env.OPENAI_API_KEY });
const gptWorker = async (data:any) => {
  try {
    const html = data.postData;
    const $ = cheerio.load(html);
    const content = $('p').text();
    if (!content) {
      throw new Error('No content found in the HTML');
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: MODERATION_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
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
      
      const tagsRequest = await client.chat.completions.create({
          model: process.env.MODEL_NAME,
          messages: [
            { role: 'user', content: `Generate 6 one words tags like what is content about from this content: ${content} ` }
          ]
        });
  
        const tags = tagsRequest.choices[0]?.message?.content;
        const stringArray = tags.split('\n');
        const trimmedArray = stringArray.map((item: string) => item.replace(/^\d+\.\s*/, '').trim());
        const summary = await client.chat.completions.create({
          model: process.env.MODEL_NAME,
          messages: [{ role: 'user', content: `Summarize this content  ${content}` }],
        });
  
        const result = PostModel.findByIdAndUpdate(
          { _id: data.postId },{
          gpt_summary: summary.choices[0].message.content,
          tags: trimmedArray,
          mod_review: true          
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