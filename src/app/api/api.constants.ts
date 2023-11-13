/**
 * @constant SESSION_AGE
 * @description It is a time in seconds
 */
export const SESSION_AGE = 5 * 60 * 60;

export enum ReactionType {
	None = '0',
	Like = '1',
	Love = '2',
	Haha = '3',
	Wow = '4',
	Sad = '5',
	Angry = '6',
}

export enum AppLanguage {
	ENGLISH = 'EN',
	SPANISH = 'ES',
	CHINESE = 'ZH_HANS',
	MANDARIN = 'ZH_HANT',
}

export const CONSTANT = {
	STATUS_CODE: {
		SUCCESS: {
			OK: 200,
		},
		ERROR: {
			400: 400,
			WRONG: 422,
		},
	},
	PG_MODEL_REF: {
		USER: 'users',
		ADMIN: 'admin',
	},
	DATABASE: {
		ENTITY: {
			ADMIN: 'admin',
			USER: 'user',
			PET: 'pet',
			POST: 'post',
			STORY: 'story',
			TEMPLATE: 'template',
			CONNECTION: 'connection',
			HASHTAG: 'hashtag',
			EVENT: 'event',
			REPORTED_CONTENT: 'reported_contents',
		},
		STATUS: {
			ACTIVE: '1',
			DELETED: '3',
			INACTIVE: '2',
		},
		USER: {
			GENDER: {
				MALE: '1',
				FEMALE: '2',
				OTHER: '3',
			},
		},
		PROFILE_TYPE: {
			PET: 'PET',
			USER: 'USER',
		},
	},
	BLOG: {
		AVG_WORD_PER_MIN: 250,
	},
	CHAT: {
		ROOM: {
			GROUP_LIMIT: 30,
			BROADCAST_LIMIT: 256,
			FAVOURITE_ROOM_LIMIT: 3,
			TYPE: {
				INDIVIDUAL: '0',
				GROUP: '1',
				BROADCAST: '2',
			},
			CHAT_LIST_VIEW_ACTION: {
				DELETE_REQUESTS: 'delete_requests',
				DELETE: 'delete',
				ARCHIVE_UNARCHIVE: 'archive_unarchive',
				FAV_UNFAV: 'fav_unfav',
				ACCEPT_MESSAGE_REQUEST: 'accept_message_request',
			},
		},
		MESSAGE: {
			SYSTEM_GENERATED_MESSAGE_TYPE: {
				participant_added: 'participant_added',
				room_name_changed: 'room_name_changed',
				room_icon_url_changed: 'room_icon_url_changed',
				room_icon_url_removed: 'room_icon_url_removed',
				make_room_admin: 'make_room_admin',
				participant_left: 'participant_left',
				participant_removed: 'participant_removed',
				room_created: 'room_created',
				broadcast_list_created: 'broadcast_list_created',
				recipient_added_to_list: 'recipient_added_to_list',
				recipient_removed_to_list: 'recipient_removed_to_list',
				converted_to_admin: 'converted_to_admin',
				ended_chat: 'ended_chat',
				revoke_room_admin: 'revoke_room_admin'
			},
			SHARED_MEDIA: {
				RECENT: '1',
				LAST_WEEK: '2',
				LAST_MONTH: '3',
				MONTH: '4',
				YEAR: '5',
			},
			CONTENT_TYPE: {
				TEXT: '0',
				IMAGE: '1',
				VIDEO: '2',
				STICKER: '3',
				AUDIO: '4',
				GIF: '5',
				EVENT: '6',
				SYSTEM_GENERATED: '7',
				OTHER: '8',
				POST: '9',
				STORY: '10',
				USER: '11',
				PET: '12',
				LIVE: '13',
				STORY_TEXT_REPLY: '14',
				STORY_REACTION_REPLY: '15',
			},
			STATUS_ACTION: {
				SAVE: 'save',
				UNSAVE: 'unsave',
				DELETE: 'delete',
				SEEN: 'seen',
				DELIVERED: 'delivered',
				AUDIO_PLAYED: 'audio_played',
				UPDATE_VIEW_COUNT: 'update_view_count',
				CLEAR_CHAT: 'clear_chat',
			},
			VIEW_TYPE: {
				VIEW_ONCE: '0',
				ALLOW_REPLAY: '1',
				KEEP_IN_CHAT: '2',
			},
		},
	},
	SOCKET: {
		ON_AUTH_ERROR: {
			auth_required: 'auth_required',
			auth_expired: 'auth_expired',
			not_valid: 'not_valid',
		},

		ON_EVENTS: {
			connection: 'connection',
			disconnect: 'disconnect',
			ping: 'PING',
			reconnect: 'reconnect',
			live_events: 'live_events', // live streaming events
			chat_events: 'chat_events', // chat events
		},
		LIVE_EVENT_RECEIVE_ACTION: {
			start_streaming: 'start_streaming',
			join_stream: 'join_stream',
			comment: 'comment',
			end_streaming: 'end_streaming',
			leave_streaming: 'leave_streaming',
			change_settings: 'change_settings',
			accept_or_reject_invite_or_request: 'accept_or_reject_invite_or_request',
			pin_comment: 'pin_comment',
			invite_or_request_for_dual_stream: 'invite_or_request_for_dual_stream',
			remove_pin: 'remove_pin',
			post_question: 'post_question',
			post_reply: 'post_reply',
			share_question: 'share_question',
			wave: 'wave',
			react: 'react',
			leave_dual_stream: 'leave_dual_stream',
			reset_count: 'reset_count',
			long_press: 'long_press',
			recording: 'recording',
			joined_dual_broadcast: 'joined_dual_broadcast',
			screen_share: 'screen_share',
			request_action_from_viewer: 'request_action_from_viewer',
		},
		LIVE_EVENT_EMIT_ACTION: {
			stream_started: 'stream_started',
			user_joined: 'user_joined',
			counts: 'counts',
			comment: 'comment',
			stream_ended: 'stream_ended',
			stream_ended_success: 'stream_ended_success',
			join_stream: 'join_stream',
			user_left: 'user_left',
			change_settings: 'change_settings',
			invite_or_request_for_dual_stream: 'invite_or_request_for_dual_stream',
			join_broadcast: 'join_broadcast',
			pinned_comment: 'pinned_comment',
			recieved_request_for_dual_stream: 'recieved_request_for_dual_stream',
			remove_pin: 'remove_pin',
			post_question: 'post_question',
			post_reply: 'post_reply',
			accept_or_reject_invite_or_request: 'accept_or_reject_invite_or_request',
			share_question: 'share_question',
			wave: 'wave',
			react: 'react',
			wants_to_join: 'wants_to_join',
			leave_dual_stream: 'leave_dual_stream',
			kicked_or_left: 'kicked_or_left',
			last_five_minutes: 'last_five_minutes',
			reported_action: 'reported_action',
			joined_dual_broadcast: 'joined_dual_broadcast',
			long_press: 'long_press',
			recording: 'recording',
			screen_share: 'screen_share',
			request_action_from_viewer: 'request_action_from_viewer',
			one_hour_passed: 'one_hour_passed',
			already_viewer_in_dual: 'already_viewer_in_dual',
		},
		LIVE_SUB_ACTION: {
			user_joined: 'joined',
			user_commented: 'commented',
			shared_emoticons: 'shared_emoticons',
			wave: 'wave',
		},

		CHAT_EVENT_RECEIVE_ACTION: {
			create_new_room: 'create_new_room',
			remove_message: 'remove_message',
			message_status_handler: 'message_status_handler',
			typing: 'typing',
			update_active_status: 'update_active_status',
			check_online: 'check_online',
			send_message: 'send_message',
			update_room_info: 'update_room_info',
			update_participant_settings: 'update_participant_settings',
			add_participants: 'add_participants',
			remove_participants: 'remove_participants',
			leave_room: 'leave_room',
			end_room: 'end_room',
			update_last_seen: 'update_last_seen',
			edit_message: 'edit_message',
			save_messages: 'save_messages',
			unsave_messages: 'unsave_messages',
			react_messages: 'react_messages',
			make_admin: 'make_admin',
			revoke_admin: 'revoke_admin',
			recording: 'recording',
			chat_list_view_handler: 'chat_list_view_handler',
			get_count: 'get_count',
			forward_message: 'forward_message',
			SUB_ACTION: {
				unread_message_count: 'unread_message_count',
				active_chat_count: 'active_chat_count',
				message_request_count: 'message_request_count',
				broadcast_list_count: 'broadcast_list_count',
			},
		},
		CHAT_EVENT_EMIT_ACTION: {
			update_chat_listing: 'update_chat_listing',
			new_message_receive: 'new_message_receive',
			message_sent_ack: 'message_sent_ack',
			participant_added: 'participant_added',
			participant_left: 'participant_left',
			participant_removed: 'participant_removed',
			message_delivered: 'message_delivered',
			message_seen: 'message_seen',
			typing_ack: 'typing_ack',
			recording_ack: 'recording_ack',
			room_ended: 'room_ended',
			message_removed: 'message_removed',
			message_reacted: 'message_reacted',
			message_edited: 'message_edited',
			block_unblock: 'block_unblock',
			active_status_ack: 'active_status_ack',
			ack_online_status: 'ack_online_status',
			room_info_updated: 'room_info_updated',
			audio_played: 'audio_played',
			update_message_request_count: 'update_message_request_count',
			broadcast_created: 'broadcast_created',
			chat_removed: 'chat_removed',
			request_accepted: 'request_accepted',
		},
	},
	OTP: {
		BY_PASS: '123456',
		EXP_TIME: 300,
		PHONE_EXP_TIME: 300, // seconds
		EMAIL_EXP_TIME: 300,
	},
	REGEX: {
		EMAIL: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,320}$/,
		URL: /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i,
		ZIP_CODE: /^[0-9]{5}(?:-[0-9]{4})?$/,
		// PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,40})/,
		PASSWORD: /[a-zA-Z0-9!@#\$%\^&\*]{8,40}/,
		COUNTRY_CODE: /^(\+\d{1,3}|\d{1,4})$/,
		MOBILE_NUMBER: /^\d{7,15}$/,
		OBJECT_ID: /^[0-9a-fA-F]{24}$/,
		HASHTAG: /^#+[a-zA-Z0-9_]{1,50}$/,
		USERNAME: /^(?=.*[A-Za-z0-9])[A-Za-z0-9_.]{5,30}$/,
	},
	LIVE: {
		SESSION_MAX_TIME: 3600, // It is in Seconds = 1 hour
		NOTIFICATION_TIME: 300, // It is in Seconds = 5 mins
		RECORDING_AVAILABLE_MAX_TIME: 3600 * 24, // It is in seconds = 24 hours
	},
	REDIS: {
		LIVE: {
			SESSION_END: '1',
			SESSION_INFO: 'session_info',
		},
	},
	COMMON_QUERY: {
		FOLLOWER: 'case when u.id = ANY (select c.follower_id from connections c where c.following_id = :id and c.status = :status and following_pet_id is null ) then true else false end as follower',
		FOLLOWING: 'case when u.id = ANY (select c.following_id from connections c where c.follower_id = :id and c.status = :status and following_pet_id is null ) then true else false end as following',
	},
	REFERRAL_USAGE_COUNT : {
		COUNT: 1
	}
};

// define enum like properties for status
Object.defineProperties(CONSTANT.DATABASE.STATUS, {
	1: { value: 'Active' },
	2: { value: 'Inactive' },
	3: { value: 'Deleted' },
});

// define enum like properties for user gender
Object.defineProperties(CONSTANT.DATABASE.USER.GENDER, {
	1: { value: 'Male' },
	2: { value: 'Female' },
	3: { value: 'Other' },
});
export const COLLECTION_NAME = {
	configSchema: 'config',
	user : 'user' ,
	userDetail : 'user_detail',
	follow : 'follows',
	followRequest : 'followRequest', 
	post : "posts",
    like : "likes" ,
    dislike : "dislikes" ,
    comment : "comments",
    share : "shares",
	notification:'notification'
  };
export const AppConfig = {
	firebase : 1,
	SMS: 0
  }