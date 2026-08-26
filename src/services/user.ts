import type { Result } from "../types/result"
import { request } from "./apiClient"

export interface UserInfo {
    email: string
    fullName: string
}

export const userApi = {
    getUserInfo: () => {
        return request<Result<UserInfo>>("/users/me", {
            method: "GET",
            auth: true
        })
    }

}