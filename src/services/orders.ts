import { request } from "./apiClient"
import type { Result } from "../types/result"

export interface PendingOrderItemResponse {
    id: string
    productId: string
    productVariantId: string
    productName: string
    quantity: number
    unitPrice: number
}

export interface PendingOrderResponse {
    id: string
    orderDate: string
    totalAmount: number
    status: string
    items: PendingOrderItemResponse[]
}

export const orderApi = {
    createOrder: async () => {
        const res = await request<Result<string>>("/orders", {
            method: "POST",
            auth: true,
            body: JSON.stringify({})
        })

        if (!res.isSuccess || !res.value) {
            throw new Error(res.message || "Create order failed")
        }

        return res.value
    },

    getAll: async () => {
        return await request<Result<any[]>>("/orders", {
            method: "GET",
            auth: true,
        })
    },

    getPending: async () => {
        return await request<Result<PendingOrderResponse[]>>("/orders/pending", {
            method: "GET",
            auth: true,
        })
    },

    getTotalPrice: async (orderId: string) => {
        return await request<Result<number>>(
            `/orders/${orderId}/total-price`,
            {
                method: "GET",
                auth: true,
            }
        )
    }
}