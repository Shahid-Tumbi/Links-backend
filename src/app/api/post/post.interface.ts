export namespace IPost {
	export interface Doc {
		userId: string;
        desc: string;
        img: string;
		content: string;
		title: string;
        postId: string,      
	}
}
export interface ICreatePostData {
    userId: string;
    title: string;
    content: string;
    img: string;
    gpt_summary: string;
}
export interface IUpdatePostData {
    _id: string;
    title: string;
    content: string;
    img: string;
}
export interface IPostDetail {
    _id: string;
    title: string;
    content: string;
    img: string;
}
export interface IDeletePostData {
    _id: string;
}