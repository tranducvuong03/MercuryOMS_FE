export type Result<T = void> = {
    isSuccess: boolean
    message?: string
    value?: T
}