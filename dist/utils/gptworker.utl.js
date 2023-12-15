"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_constants_1 = require("../app/api/post/post.constants");
const post_model_1 = require("../app/api/post/post.model");
const env_util_1 = require("./env.util");
const axios = require('axios');
const cheerio = require('cheerio');
const openai = require('openai');
const client = new openai({ apiKey: env_util_1.environment.OPENAI_API_KEY });
const gptWorker = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
            postdate = yield axios.get(`https://carbondate.cs.odu.edu/cd/${data.link}`);
        }
        catch (error) {
            console.error('Error fetching post date:', error);
            // You can choose to handle this error or ignore it if required
            // throw error; // Uncomment this line if you want to propagate the error
        }
        let moderationResult;
        try {
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: post_constants_1.MODERATION_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${env_util_1.environment.OPENAI_API_KEY}`
                },
                data: { input: content }
            };
            const moderation = yield axios.request(config);
            moderationResult = moderation.data;
            console.log('Moderation Result:', JSON.stringify(moderationResult));
        }
        catch (error) {
            console.error('Error in moderation:', error);
            // You can choose to handle this error or ignore it if required
            // throw error; // Uncomment this line if you want to propagate the error
        }
        let summaryResult;
        try {
            const summary = yield client.chat.completions.create({
                model: env_util_1.environment.MODEL_NAME,
                messages: [{ role: 'user', content: `Summarize this content ${content}` }],
            });
            summaryResult = summary.choices[0].message.content;
        }
        catch (error) {
            console.error('Error generating summary:', error);
            // You can choose to handle this error or ignore it if required
            // throw error; // Uncomment this line if you want to propagate the error
        }
        const wordsArray = content.split(' ');
        const wordCount = wordsArray.length;
        const wordsPerMinute = 265;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        const result = yield post_model_1.PostModel.findByIdAndUpdate({ _id: data.postId }, {
            gpt_summary: summaryResult || '',
            mod_review: true,
            readingTime: readTime,
            title,
            description,
            image,
            postPublished: postdate === null || postdate === void 0 ? void 0 : postdate.data['estimated-creation-date']
        });
        return result;
    }
    catch (error) {
        console.error('Error:', error);
        // You can handle the error or rethrow it based on your requirement
        // throw error; // Uncomment this line if you want to propagate the error
    }
});
exports.default = gptWorker;
