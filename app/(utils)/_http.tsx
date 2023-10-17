
import { ResponseGeneric } from '@/app/(model)/_response_generic'
import { NextResponse } from 'next/server'

/**
 * STATUS CODES
 */
export const STATUS_CODE_OK = 200;

export const STATUS_CODE_REDIRECT = 301;

export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_FORBIDDEN = 403;
export const STATUS_CODE_NOT_FOUND = 404;

export const STATUS_CODE_INTERNAL_SERVER_ERROR = 500;

export const generateGenericResponse = (responseGeneric: ResponseGeneric) : object => {
    return NextResponse.json({isSuccess: responseGeneric.isSuccess, message: responseGeneric.message}, {status: responseGeneric.statusCode});
}