export const POST_MESSAGES = {
    DATA_NOT_FOUND : 'No Data Found !!',
    INVALID_RATING : "Invalid rating. Rating must be between 0 and 10.",
    NO_POST_FOUND : "No Post Found !!",
    INVALID_LINK_TYPE : "URL type not supported.",
    ALREADY_LIKED: 'Your upvote remove from This post',
    ALREADY_DISLIKED : 'Your downvote remove This post'
}

export const MODERATION_URL = "https://api.openai.com/v1/moderations";
export const YTUBE_VIDEO_REGEX = /^(?:(?:https|http):\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be).*(?<=\/|v\/|u\/|embed\/|shorts\/|live\/|watch\?v=)(?<!\/user\/)(?<id>[\w\-]{11})(?=\?|&|$)/;