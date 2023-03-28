declare class ResponseError extends Error {
    constructor(messageOrError: string | Error, properties?: any);
  

    /**
     * The HTTP error code.
     */
    code: number;

    /**
     * The OAuth error code.
     */
    name: string;

    /**
     * A human-readable error message.
     */
    message: string;
}
export {ResponseError}