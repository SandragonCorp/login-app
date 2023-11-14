import { Chat } from "@/app/(models)/_chat"
import { User } from "@/app/(models)/_user"

export interface UserChat {
    id: User
    chats: Chat
}