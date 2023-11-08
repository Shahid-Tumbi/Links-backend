import { Console, ResponseError } from "@src/utils";
import { App } from "../app.interface";
import { ConfigModel } from "./api.model";
import { AppConfig } from "./api.constants";

class ApiService {
    async config(req:App.Request, user:App.User){
		try {
			const configData = await ConfigModel.findOneAndUpdate({}, AppConfig, { upsert: true, new: true });
            const { __v, _id, ...cleanedConfigData } = configData._doc
			return cleanedConfigData;
		} catch (error) {
			Console.error('Error in  service', error);
			return Promise.reject(new ResponseError(422, error));
		}
	}
}

export const apiService = new ApiService();