import { model, Schema } from 'mongoose';
import { IAdmin } from './faq.interface';

const adminFAQSchema = new Schema(
	{

		question: {
			type: String,
			required: true
		},
		answer: {
			type: String,
			required: true
		},
		lang: {
			type: String,
			required: true
		},
		status: { type: String },
		userType: {
			type: Number,
			required: true
		}
	},
	{
		timestamps: true,
		collection: 'faq',
	});

export const AdminFAQModel = model<IAdmin.IFAQ>('faq', adminFAQSchema);