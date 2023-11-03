export interface ResponseGeneric {
    isSuccess: boolean,
    message: string,
    statusCode: number,
    metadata?: {}
}