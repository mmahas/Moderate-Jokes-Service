export interface ControllerResponse<T extends any> {
    statusCode: number;
    body: T;
    mask?: any;
   }
    
   export class ResponseCode {
    static continue = 100;
    static switchingProtocols = 101;
    static processing = 102;
    static ok = 200;
    static created = 201;
    static accepted = 202;
    static nonAuthoritativeInformation = 203;
    static noContent = 204;
    static resetContent = 205;
    static partialContent = 206;
    static multiStatus = 207;
    static alreadyReported = 208;
    static imUsed = 226;
    static badRequest = 400;
    static unauthorized = 401;
    static paymentRequired = 402;
    static forbidden = 403;
    static notFound = 404;
    static methodNotAllowed = 405;
    static notAcceptable = 406;
    static proxyAuthenticationRequired = 407;
    static requestTimeout = 408;
    static conflict = 409;
    static gone = 410;
    static lengthRequired = 411;
    static preconditionFailed = 412;
    static payloadTooLarge = 413;
    static requestUriTooLong = 414;
    static unsupportedMediaType = 415;
    static requestedRangeNotSatisfiable = 416;
    static expectationFailed = 417;
    static iAmATeapot = 418;
    static misdirectedRequest = 421;
    static unprocessableEntity = 422;
    static locked = 423;
    static failedDependency = 424;
    static upgradeRequired = 426;
    static preconditionRequired = 428;
    static tooManyRequests = 429;
    static requestHeaderFieldsTooLarge = 431;
    static connectionClosedWithoutResponse = 444;
    static unavailableForLegalReasons = 451;
    static clientClosedRequest = 499;
    static internalServerError = 500;
    static notImplemented = 501;
    static badGateway = 502;
    static serviceUnavailable = 503;
    static gatewayTimeout = 504;
    static httpVersionNotSupported = 505;
    static variantAlsoNegotiates = 506;
    static insufficientStorage = 507;
    static loopDetected = 508;
    static notExtended = 510;
    static networkAuthenticationRequired = 511;
    static networkConnectTimeoutError = 599;
   }
    
   export class ServiceError extends Error {
    code: number;
    msg: string;
    body?: any;
    err?: Error;
    
    constructor(code: number, message: string, body?: any, err?: Error) {
      super(`${code}: ${message}`);
      this.code = code;
      this.msg = message;
      this.body = body;
      this.err = err;
    }
   }
    
   export class Responses {
    static defaultResponse: any = {};
    static continue = <T extends any = unknown>(body?: T): ControllerResponse<T> => {
      return { statusCode: 100, body: body ?? Responses.defaultResponse };
    };
    
    static switchingProtocols = (body?: any) => {
      return { statusCode: 101, body: body ?? {} };
    };
    
    static processing = (body?: any) => {
      return { statusCode: 102, body: body ?? {} };
    };
    
    static ok = (body?: any) => {
      return { statusCode: 200, body: body ?? {} };
    };
    
    static created = (body?: any) => {
      return { statusCode: 201, body: body ?? {} };
    };
    
    static accepted = (body?: any) => {
      return { statusCode: 202, body: body ?? {} };
    };
    
    static nonAuthoritativeInformation = (body?: any) => {
      return { statusCode: 203, body: body ?? {} };
    };
    
    static noContent = (body?: any) => {
      return { statusCode: 204, body: body ?? {} };
    };
    
    static resetContent = (body?: any) => {
      return { statusCode: 205, body: body ?? {} };
    };
    
    static partialContent = (body?: any) => {
      return { statusCode: 206, body: body ?? {} };
    };
    
    static multiStatus = (body?: any) => {
      return { statusCode: 207, body: body ?? {} };
    };
    
    static alreadyReported = (body?: any) => {
      return { statusCode: 208, body: body ?? {} };
    };
    
    static imUsed = (body?: any) => {
      return { statusCode: 226, body: body ?? {} };
    };
    
    // static multipleChoices = (body?: any) => {
    //   return { statusCode: 300, body: body ?? {} };
    // };
    //
    // static movedPermanently = (body?: any) => {
    //   return { statusCode: 301, body: body ?? {} };
    // };
    //
    // static found = (body?: any) => {
    //   return { statusCode: 302, body: body ?? {} };
    // };
    //
    // static seeOther = (body?: any) => {
    //   return { statusCode: 303, body: body ?? {} };
    // };
    //
    // static notModified = (body?: any) => {
    //   return { statusCode: 304, body: body ?? {} };
    // };
    //
    // static useProxy = (body?: any) => {
    //   return { statusCode: 305, body: body ?? {} };
    // };
    //
    // static temporaryRedirect = (body?: any) => {
    //   return { statusCode: 307, body: body ?? {} };
    // };
    //
    // static permanentRedirect = (body?: any) => {
    //   return { statusCode: 308, body: body ?? {} };
    // };
    
    static badRequest = (code?: string, message?: string, body?: any) => {
      return { statusCode: 400, body: { code, message, body } };
    };
    
    static unauthorized = (code?: string, message?: string, body?: any) => {
      return { statusCode: 401, body: { code, message, body } };
    };
    
    static paymentRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 402, body: { code, message, body } };
    };
    
    static forbidden = (code?: string, message?: string, body?: any) => {
      return { statusCode: 403, body: { code, message, body } };
    };
    
    static notFound = (code?: string, message?: string, body?: any) => {
      return { statusCode: 404, body: { code, message, body } };
    };
    
    static methodNotAllowed = (code?: string, message?: string, body?: any) => {
      return { statusCode: 405, body: { code, message, body } };
    };
    
    static notAcceptable = (code?: string, message?: string, body?: any) => {
      return { statusCode: 406, body: { code, message, body } };
    };
    
    static proxyAuthenticationRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 407, body: { code, message, body } };
    };
    
    static requestTimeout = (code?: string, message?: string, body?: any) => {
      return { statusCode: 408, body: { code, message, body } };
    };
    
    static conflict = (code?: string, message?: string, body?: any) => {
      return { statusCode: 409, body: { code, message, body } };
    };
    
    static gone = (code?: string, message?: string, body?: any) => {
      return { statusCode: 410, body: { code, message, body } };
    };
    
    static lengthRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 411, body: { code, message, body } };
    };
    
    static preconditionFailed = (code?: string, message?: string, body?: any) => {
      return { statusCode: 412, body: { code, message, body } };
    };
    
    static payloadTooLarge = (code?: string, message?: string, body?: any) => {
      return { statusCode: 413, body: { code, message, body } };
    };
    
    static requestUriTooLong = (code?: string, message?: string, body?: any) => {
      return { statusCode: 414, body: { code, message, body } };
    };
    
    static unsupportedMediaType = (code?: string, message?: string, body?: any) => {
      return { statusCode: 415, body: { code, message, body } };
    };
    
    static requestedRangeNotSatisfiable = (code?: string, message?: string, body?: any) => {
      return { statusCode: 416, body: { code, message, body } };
    };
    
    static expectationFailed = (code?: string, message?: string, body?: any) => {
      return { statusCode: 417, body: { code, message, body } };
    };
    
    static iAmATeapot = (code?: string, message?: string, body?: any) => {
      return { statusCode: 418, body: { code, message, body } };
    };
    
    static misdirectedRequest = (code?: string, message?: string, body?: any) => {
      return { statusCode: 421, body: { code, message, body } };
    };
    
    static unprocessableEntity = (code?: string, message?: string, body?: any) => {
      return { statusCode: 422, body: { code, message, body } };
    };
    
    static locked = (code?: string, message?: string, body?: any) => {
      return { statusCode: 423, body: { code, message, body } };
    };
    
    static failedDependency = (code?: string, message?: string, body?: any) => {
      return { statusCode: 424, body: { code, message, body } };
    };
    
    static upgradeRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 426, body: { code, message, body } };
    };
    
    static preconditionRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 428, body: { code, message, body } };
    };
    
    static tooManyRequests = (code?: string, message?: string, body?: any) => {
      return { statusCode: 429, body: { code, message, body } };
    };
    
    static requestHeaderFieldsTooLarge = (code?: string, message?: string, body?: any) => {
      return { statusCode: 431, body: { code, message, body } };
    };
    
    static connectionClosedWithoutResponse = (code?: string, message?: string, body?: any) => {
      return { statusCode: 444, body: { code, message, body } };
    };
    
    static unavailableForLegalReasons = (code?: string, message?: string, body?: any) => {
      return { statusCode: 451, body: { code, message, body } };
    };
    
    static clientClosedRequest = (code?: string, message?: string, body?: any) => {
      return { statusCode: 499, body: { code, message, body } };
    };
    
    static internalServerError = (code?: string, message?: string, body?: any) => {
      return { statusCode: 500, body: { code, message, body } };
    };
    
    static notImplemented = (code?: string, message?: string, body?: any) => {
      return { statusCode: 501, body: { code, message, body } };
    };
    
    static badGateway = (code?: string, message?: string, body?: any) => {
      return { statusCode: 502, body: { code, message, body } };
    };
    
    static serviceUnavailable = (code?: string, message?: string, body?: any) => {
      return { statusCode: 503, body: { code, message, body } };
    };
    
    static gatewayTimeout = (code?: string, message?: string, body?: any) => {
      return { statusCode: 504, body: { code, message, body } };
    };
    
    static httpVersionNotSupported = (code?: string, message?: string, body?: any) => {
      return { statusCode: 505, body: { code, message, body } };
    };
    
    static variantAlsoNegotiates = (code?: string, message?: string, body?: any) => {
      return { statusCode: 506, body: { code, message, body } };
    };
    
    static insufficientStorage = (code?: string, message?: string, body?: any) => {
      return { statusCode: 507, body: { code, message, body } };
    };
    
    static loopDetected = (code?: string, message?: string, body?: any) => {
      return { statusCode: 508, body: { code, message, body } };
    };
    
    static notExtended = (code?: string, message?: string, body?: any) => {
      return { statusCode: 510, body: { code, message, body } };
    };
    
    static networkAuthenticationRequired = (code?: string, message?: string, body?: any) => {
      return { statusCode: 511, body: { code, message, body } };
    };
    
    static networkConnectTimeoutError = (code?: string, message?: string, body?: any) => {
      return { statusCode: 599, body: { code, message, body } };
    };
   }
    
   export class FormError {
    private static getFieldName = (name: string): any => {
      const parts = name.split('.');
      if (parts.length === 1) {
        return name;
      }
      return parts;
    };
    static create = (errors: Record<string, string>) => {
      return {
        hasFormErrors: true,
        formErrors: Object.entries(errors).map((e) => ({ name: FormError.getFieldName(e[0]), errors: [e[1]] })),
      };
    };
   }
    
    
   
   