"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODERATION_URL = exports.POST_MESSAGES = void 0;
exports.POST_MESSAGES = {
    DATA_NOT_FOUND: 'No Data Found !!',
    INVALID_RATING: "Invalid rating. Rating must be between 0 and 10.",
    NO_POST_FOUND: "No Post Found !!",
    INVALID_LINK_TYPE: "URL type not supported.",
    ALREADY_LIKED: 'You already Liked This post',
    ALREADY_DISLIKED: 'You already Disliked This post'
};
exports.MODERATION_URL = "https://api.openai.com/v1/moderations";
