
import { DateTime } from "@/app/(models)/_datetime";
import { User } from "@/app/(models)/_user"

export interface Chat {
    id: number
    message: string
    sender: User
    recipient: User
    sentDateTime: DateTime
}