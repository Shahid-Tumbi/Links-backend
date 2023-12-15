"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAO = void 0;
const mongoose_1 = require("mongoose");
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
    save(DocumentModel, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = new DocumentModel(data);
            return document.save();
        });
    }
    findOne(DocumentModel, query, projections = {}, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DocumentModel.findOne(query, projections, options).exec();
        });
    }
    findMany(DocumentModel, query, projections = {}, options) {
        return DocumentModel.find(query, projections, options);
    }
    findIdList(DocumentModel, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield DocumentModel.find(query).select({ _id: 1 }).lean().exec();
            if (!result.length) {
                return [];
            }
            return result.map(({ _id }) => _id.toHexString());
        });
    }
    findId(DocumentModel, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield DocumentModel.findOne(query).select({ _id: 1 }).exec();
            if (result) {
                return result._id;
            }
            return null;
        });
    }
    findById(DocumentModel, id, projections = {}, options) {
        return DocumentModel.findById(id, projections, options);
    }
    exists(DocumentModel, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield DocumentModel.countDocuments(query).exec());
        });
    }
    docExists(DocumentModel, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exists(DocumentModel, {
                _id: new mongoose_1.Types.ObjectId(id),
            });
        });
    }
    /**
     * @description A function to add statges into pipeline to paginate data
     * @param pipeline pipeline previous stages
     * @param pageIndex pageIndex to skip documents
     * @param pageSize pageSize to limit documents
     * @returns single item array with {pageIndex, pageSize, total, data}
     */
    paginate(matchPipeline, options, pipeline) {
        const aggrPipeline = [
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
            aggregate(CollectionModel) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = CollectionModel.aggregate(aggrPipeline).exec();
                    return Object.assign(Object.assign({}, result[0]), { total: result[0].total || 0 });
                });
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
    count(DocumentModel, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return DocumentModel.countDocuments(query).exec();
        });
    }
    paginateWithNextHit(model, aggPipe, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (limit) {
                limit = Math.abs(limit);
                if (limit > 100) {
                    limit = 100;
                }
            }
            else {
                limit = 10;
            }
            if (page && (page !== 0)) {
                page = Math.abs(page);
            }
            else {
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
            const result = yield model.aggregate(aggPipe);
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
        });
    }
}
exports.DAO = new DaoManager();
