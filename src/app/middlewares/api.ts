import { NextFunction } from 'express';
import { ResponseError } from '@utils/error.util';
import { Console } from '@src/utils';
import { App } from '../app.interface';
import { LangCode } from '../constants';

export function apiMiddleware(req: App.Request | any, res: App.Response, next: NextFunction) {
  Console.info('Api Middleware');

  res.success = function (this: App.Response, messages: string | App.MessageData | any , result: any = null, {
    status: statusCode = 200, meta,
  } = {}) {
    const { language = LangCode.English } = req.client;
    const message = messages[language] || messages || 'Success';
    this.status(statusCode === 204 ? 200 : statusCode).json({ statusCode, message, result, meta });
  };

  res.error = function (this: App.Response, {
    status: statusCode = 500, messages, message: msg, errorCode,
  }: ResponseError) {
    const { language = LangCode.English } = req.client;
    const message = messages && messages[language] || msg || `Oops! we couldn't process your request, please try again later!`;
    this.status(statusCode).json({ statusCode, message, result: null, errorCode });
  };

  try {
    req.client = {
      language: Object.values(LangCode).find((lang) => {
        return req.acceptsLanguages().some((val:any) => new RegExp(lang, 'i').test(val));
      }) || LangCode.English,
    } as any;

    const deviceHeaders = {
      deviceId: 'Device-Id',
      deviceType: 'Device-Type',
      deviceModel: 'Device-Model',
      ipAddress: 'IP-Address',
    };

    Object.entries(deviceHeaders).forEach(([key, headerName]) => {
      const headerValue = req.header(headerName);
      req.client[key] = headerValue;
    });
  } catch (error) {
    return next(error);
  }

  next();
}
