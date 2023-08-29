import { App } from "@src/app/app.interface";
import { Console, ResponseError } from "@src/utils";
// import { DB_PROJECTION } from "./photographerReview.constants"
// import { REVIEW_MESSAGES } from "./notification.constants";
import { INotification, IPhotographerReview } from "./notification.interface";
import { NotificationModel } from "./notification.model";
import { DAO } from "@src/database";
import { ObjectId } from "mongodb";
class NotificationService {
	readonly Model = NotificationModel;

	async register({ ...data }: INotification.Doc, client?: Partial<App.Client>) {
		try {
			Console.info(`partial ${JSON.stringify(client)}`);
			let result = await this.Model.create({
				...data
			});
			return result
		} catch (error) {
			Console.error('Error in regsiteration service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}


	async notificationList(payload: INotification.INotificationFilter, client: Partial<App.Client>) {
		try {
			const pipeline: any =

				[
					{
						"$match": {}
					},
					{
						"$lookup": {
							"from": payload.app == "photographer" ? "user" : "photographer",
							//  "localField": "photographerId",
							let: { photographerId: "$fromUser" },
							// "foreignField": "_id",
							"as": "fromUserDetails",
							"pipeline": [{
								"$match": {
									"$expr": {
										"$and": [{
											"$eq": ["$_id", "$$photographerId"]
										}]
									}
								},
							}, { "$project": { "name": 1, "email": 1, "profileImage":1 }, }

							]

						},
					},
					{ "$unwind": "$fromUserDetails" },
					{
						"$sort": {
							"createdAt": -1
						}
					}
				]

			
			if (payload.toUser) {
				let toUser=new ObjectId(payload.toUser)
				pipeline[0].$match['$and'] = pipeline[0].$match['$and'] ? pipeline[0].$match['$and'] : []
				pipeline[0].$match['$and'] = [...pipeline[0].$match['$and'], ...[{ toUser: toUser }]]
			}
			// console.log("payload.userId",payload.userId)
			//   console.log("PAIPELINE",JSON.stringify(pipeline))
			return await DAO.paginateWithNextHit(NotificationModel, pipeline, payload.limit, payload.page);
		} catch (error) {
			Console.error('Error in admin login service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

	async deleteNotification(payload: IPhotographerReview, client: Partial<App.Client>) {
		try {
			return await NotificationModel.remove({ _id: payload._id });
		} catch (error) {
			Console.error('Error in admin fetchPhotographerDetail service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}

}

export const notificationService = new NotificationService();