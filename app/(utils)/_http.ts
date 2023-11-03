
import { ResponseGeneric } from '@/app/(models)/_response_generic'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server'

/**
 * STATUS CODES
 */
export const STATUS_CODES = {
    OK: 200,
    REDIRECT: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

export const generateGenericResponse = (responseGeneric: ResponseGeneric) : object => {
    return NextResponse.json(responseGeneric, { status: responseGeneric.statusCode });
}
interface AJAXProps {
    url: string,
    data?: any,
    beforeRequest?: () => void,
    successCallback?: (response: any) => any, // response status code is 200
    errorCallback?: (response: any) => any, // any other response
    finallyCallback?: () => void
};

export const AJAX = {
    post: (config: AJAXProps) => {
        if (config.beforeRequest) {
            config.beforeRequest();
        }

        axios
            .post(
                config.url,
                config.data
            )
            .then((response: any) => {
                if (response.status === STATUS_CODES.OK) {
                    if (config.successCallback) {
                        config.successCallback(response);
                    }
                } else {
                    if (config.errorCallback) {
                        config.errorCallback(response);
                    }
                }
            })
            .catch((axiosError) => {
                if (config.errorCallback) {
                    config.errorCallback(axiosError.response);
                }
            })
            .finally(() => {
                if (config.finallyCallback) {
                    config.finallyCallback();
                }
            })
        ;
    }
};

export const redirectTo = (link: string) : void => {
    const router = useRouter();
    router.push(link);
}

export const forceRedirectTo = (link: string) : void => {
    window.location.href = link;
}