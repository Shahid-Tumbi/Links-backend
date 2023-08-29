import { Document, Model, Types } from 'mongoose';
import { App } from '@app/app.interface';

/**
 * @class DaoManager
 * @description A class to access database server
 * @author Shahid Tumbi
 */
class DaoManager {
	// constructor() { }
	/**
	 * @class DaoManager
	 * @description A function to save a document to database collection
	 * @param DocumentModel A database model
	 * @param data Document data to be saved
	 */
	async save<T extends Document>(DocumentModel: Model<T>, data: any): Promise<T> {
		const document = new DocumentModel(data);
		return document.save();
	}

	async findOne(
		DocumentModel: Model<any>,
		query: object,
		projections: { [key: string]: 1 | 0 } = {},
		options?: any,
	) {
		return await DocumentModel.findOne(query, projections, options).exec();
	}

	findMany<T extends Document>(
		DocumentModel: Model<T>,
		query: object,
		projections: { [key: string]: 1 | 0 } = {},
		options?: any,
	) {
		return DocumentModel.find(query, projections, options);
	}

	async findIdList<T extends Document>(DocumentModel: Model<T>, query: object): Promise<string[]> {
		const result: any = await DocumentModel.find(query).select({ _id: 1 }).lean().exec();
		if (!result.length) {
			return [];
		}
		return result.map(({ _id }: any) => _id.toHexString());
	}
	async findId<T extends Document>(DocumentModel: Model<T>, query: object): Promise<string | null> {
		const result = await DocumentModel.findOne(query).select({ _id: 1 }).exec();
		if (result) {
			return result._id;
		}
		return null;
	}
	findById<T extends Document>(
		DocumentModel: Model<T>,
		id: string,
		projections: { [key: string]: 1 | 0 } = {},
		options?: any,
	) {
		return DocumentModel.findById(id, projections, options);
	}
	async exists<T extends Document>(DocumentModel: Model<T>, query: object): Promise<boolean> {
		return !!await DocumentModel.countDocuments(query).exec();
	}
	async docExists<T extends Document>(DocumentModel: Model<T>, id: string): Promise<boolean> {
		return this.exists<T>(DocumentModel, {
			_id: new Types.ObjectId(id),
		});
	}
	/**
	 * @description A function to add statges into pipeline to paginate data
	 * @param pipeline pipeline previous stages
	 * @param pageIndex pageIndex to skip documents
	 * @param pageSize pageSize to limit documents
	 * @returns single item array with {pageIndex, pageSize, total, data}
	 */
	paginate(matchPipeline: object[], options: App.PaginateOptions, pipeline: object[]) {
		const aggrPipeline: any = [
			...matchPipeline,
			{
				$facet: {
					data: [
						{ $skip: (options.page - 1) * options.limit },
						{ $limit: options.limit },
						...pipeline,
					],
					total: [
						{ $count: 'count' },
					],
				},
			},

			{
				$addFields: {
					pageIndex: options.page - 1,
					pageSize: options.limit,
					total: {
						$let: {
							vars: {
								item: { $arrayElemAt: ['$total', 0] },
							},
							in: '$$item.count',
						},
					},
				},
			},
		];
		return {
			pipeline: aggrPipeline,
			async aggregate<T extends Document = any>(CollectionModel: Model<T>) {
				const result = CollectionModel.aggregate(aggrPipeline).exec();
				return {
					...result[0],
					total: result[0].total || 0,
				};
			},
		};
	}
	// async signin(
	// 	DocumentModel: Model<IAdminDocument>,
	// 	query: object,
	// 	password: string,
	// ): Promise<IAdminDocument | null> {
	// 	const doc = await DocumentModel.findOne(query).exec();
	// 	if (doc && await doc.verifyPassword(password)) {
	// 		return doc;
	// 	}
	// 	return null;
	// }
	async count(
		DocumentModel: Model<any>,
		query: object,
	): Promise<number> {
		return DocumentModel.countDocuments(query).exec();
	}
	async paginateWithNextHit(model: Model<any>, aggPipe: any, limit: number, page: number) {
		if (limit) {
			limit = Math.abs(limit);
			if (limit > 100) {
				limit = 100;
			}
		} else {
			limit = 10;
		}
		if (page && (page !== 0)) {
			page = Math.abs(page);
		} else {
			page = 1;
		}
		const skip = (limit * (page - 1));

		aggPipe.push({
			$facet: {
				data: [
					{ $skip: skip },
					{ $limit: limit },
				],
				metadata: [
					{ $count: 'total' },
					{ $addFields: { page } },
				],
			}
		});
		const result = await model.aggregate(aggPipe);
		/* tslint:disable:no-string-literal */
		let next_hit = false;
		const total_page = (result[0].data.length > 0) ? Math.ceil(result[0].metadata[0].total / limit) : 0;
		if (result[0]['data'].length > limit) {
			result[0]['data'].pop();
		}

		if (total_page > page) {
			next_hit = true;
		}

		return {
			count: result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]['total'] : 0,
			page: result[0]['metadata'] && result[0]['metadata'][0] ? result[0]['metadata'][0]['page'] : page,
			totalPage: total_page,
			hasNextPage: next_hit,
			limit,
			rows: result[0]['data'],
		};
	}
}

export const DAO = new DaoManager();