import type { Address } from "../types/address"
import type { Result } from "../types/result"
import { request } from "./apiClient"

export interface CreateAddressRequest {
    label: string
    receiverName: string
    phone: string
    street: string
    district: string
    city: string
    province: string
    isDefault: boolean
}

export interface UpdateAddressRequest {
    id: string
    label: string
    receiverName: string
    phone: string
    street: string
    district: string
    city: string
    province: string
    isDefault: boolean
}

export const addressApi = {
    getAddress: () => {
        return request<Result<Address[]>>("/user-addresses", {
            method: "GET",
            auth: true
        })
    },

    getDefaultAddress: () => {
        return request<Result<Address>>("/user-addresses/default", {
            method: "GET",
            auth: true
        })
    },

    createAddress: (data: CreateAddressRequest) => {
        return request<Result<Address>>("/user-addresses", {
            method: "POST",
            auth: true,
            body: JSON.stringify(data),
        })
    },

    updateAddress: (data: UpdateAddressRequest) => {
        return request<Result<string>>(`/user-addresses`, {
            method: "PUT",
            auth: true,
            body: JSON.stringify(data),
        })
    },
}