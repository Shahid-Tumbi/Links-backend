import { App } from "@src/app/app.interface";
import { DAO } from "@src/database";
import { Console, ResponseError } from "@src/utils";
import { IAdmin } from "./faq.interface";
import { AdminFAQModel } from "./faq.model";

class AdminFAQService {
	readonly Model = AdminFAQModel;

	async createFAQ(payload: IAdmin.IFAQ, client: Partial<App.Client>) {
		try {
			return await this.Model.create(payload);
		} catch (error) {
			Console.error('Error in admin create faq service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
	async fetchFAQs(payload: IAdmin.IFAQ, client: Partial<App.Client>) {
		try {
			const pipeline = [
				{ $match: {} },
				{ $sort: { createdAt: -1 } },
			];
			return await DAO.paginateWithNextHit(this.Model, pipeline, payload.limit, payload.page);
		} catch (error) {
			Console.error('Error in admin fetch faq service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
	async fetchFAQ(payload: IAdmin.IFAQ, client: Partial<App.Client>) {
		try {
			return await this.Model.findOne({ _id: payload._id });
		} catch (error) {
			Console.error('Error in admin login service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async removeFAQ(payload: IAdmin.IFAQ, client: Partial<App.Client>) {
		try {
			return await this.Model.remove({ _id: payload._id });
		} catch (error) {
			Console.error('Error in admin faq remove service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async updateFAQ(payload: IAdmin.IFAQ, client: Partial<App.Client>) {
		try {
			console.error(`we have an error`, payload);
			return await this.Model.updateOne({ _id: payload._id }, { ...payload });
		} catch (error) {
			Console.error('Error in admin faq remove service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
}

export const adminFAQService = new AdminFAQService();