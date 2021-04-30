export default interface User {
    id: number,
    login: string,
    displayName: string | null,
    firstName: string,
    secondName: string,
    email: string,
    avatar: string | null,
    phone: string,
}
