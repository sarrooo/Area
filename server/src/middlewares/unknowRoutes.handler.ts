import { NotFoundException } from "~/utils/exceptions"

export const UnknowRoutesHandler = () => {
    throw new NotFoundException('The requested resource does not exist')
}
