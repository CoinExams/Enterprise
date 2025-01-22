import { ErrorCodeString, ErrorCodes, ErrorResponse, SuccessResponse } from "./types";
declare const errorMsgs: ErrorCodes, eRes: (e?: ErrorCodeString) => ErrorResponse, fullRes: (res?: any, data?: any) => ErrorResponse | SuccessResponse<any>;
export { errorMsgs, eRes, fullRes, };
