import { ApiException } from "~/types/exceptions";
import {StatusCodes} from "http-status-codes";

class Exception implements ApiException {
    constructor(readonly error: any, readonly status: number) {}
}

export class NotFoundException extends Exception {
    constructor(error: any) {
        super(error, StatusCodes.NOT_FOUND)
    }
}

export class BadRequestException extends Exception {
    constructor(error: any) {
        super(error, StatusCodes.BAD_REQUEST)
    }
}
