export interface User {
    id: number
    username: string
    email: string
    firstname: string
    lastname: string
    enabled: string
    role: string
    createddatetime: string
    lastloggedindatetime: string
}

export enum ROLES {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN"
}