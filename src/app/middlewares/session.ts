import { UserType } from '@app/constants/user.constants';
import { NextFunction } from 'express';
import { ResponseError } from '@src/utils/error.util';
import { App } from '@app/app.interface';
import { AUTH_TYPES, AUTHORIZATION } from '../constants';
import {  tokenUtil } from '@src/utils';

//TODO add basic auth to environment
const BASIC_TOKEN = Buffer.from(`links:backend`).toString('base64');

export function session(users: UserType[]) {
	return async (req: App.Request, res: App.Response, next: NextFunction) => {
		const { authorization } = req.headers;
		if (!authorization) {
			return next(new ResponseError(400, AUTHORIZATION.REQUIRED));
		}
		const [type, token] = authorization.split(' ');
		if (!type || !token || !Object.values(AUTH_TYPES).includes(type)) {
			return next(new ResponseError(401, AUTHORIZATION.INVALID_MEHTOD));
		}
		if (type === AUTH_TYPES.BASIC && token === BASIC_TOKEN) {
			// Basic Auth
			if (users.includes(UserType.Default)) {
				return next();
			}
			return next(new ResponseError(401, AUTHORIZATION.NO_ACCESS));
		} else if (type === AUTH_TYPES.BEARER) {
			// Bearer Auth
			try {
				req.user = await tokenUtil.authorize(token, users);
				return next();
			} catch ({ name, message }) {
				// @TODO Error Message according to error name
				return next(new ResponseError(401, message));
			}
		}
		return next(new ResponseError(401, AUTHORIZATION.INVALID));
	};
}

export function adminSession(users: UserType[]) {

	return async (req: App.Request, res: App.Response, next: NextFunction) => {
		const { authorization } = req.headers;
		if (!authorization) {
			return next(new ResponseError(400, AUTHORIZATION.REQUIRED));
		}
		const [type, token] = authorization.split(' ');
		if (!type || !token || !Object.values(AUTH_TYPES).includes(type)) {
			return next(new ResponseError(400, AUTHORIZATION.INVALID_MEHTOD));
		}
		if (type === AUTH_TYPES.BASIC && token === BASIC_TOKEN) {
			// Basic Auth
			if (users.includes(UserType.Default)) {
				return next();
			}
			return next(new ResponseError(401, AUTHORIZATION.NO_ACCESS));
		} else if (type === AUTH_TYPES.BEARER) {
			// Bearer Auth
			try {
				req.user = await tokenUtil.authorize(token, users);
				return next();
			} catch ({ name, message }) {
				// @TODO Error Message according to error name
				return next(new ResponseError(401, message));
			}
		}

		return next(new ResponseError(401, AUTHORIZATION.INVALID));
	};
}