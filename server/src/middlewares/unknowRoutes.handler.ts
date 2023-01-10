import { NotFoundException } from "../utils/exceptions.ts"

export const UnknowRoutesHandler = () => {
    throw new NotFoundException('The requested resource does not exist')
}
