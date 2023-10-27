interface User {
    id: number
    username: string
    password: string
    email: string
    firstname: string
    lastname: string
    enabled: string
    roles: string
    createddatetime: string
    lastloggedindatetime: string
}

export enum ROLES {
    SIMPLE_USER = "SIMPLE_USER"
}