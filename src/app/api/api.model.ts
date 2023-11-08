import { Schema, model } from "mongoose";
import { COLLECTION_NAME } from "./api.constants";

const configSchema = new Schema({
	firebase: { type: Schema.Types.Boolean, default: false },
	SMS:{ type: Schema.Types.Boolean, default: false }
},{
	collection: COLLECTION_NAME.configSchema
})
export const ConfigModel = model(COLLECTION_NAME.configSchema, configSchema);