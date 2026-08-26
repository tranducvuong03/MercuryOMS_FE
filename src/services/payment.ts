import { request } from "./apiClient"
import type { Result } from "../types/result"

export const PaymentMethods = {
    COD: 0,
    VNPay: 1,
} as const

export type PaymentMethod =
    (typeof PaymentMethods)[keyof typeof PaymentMethods]

export type CreatePaymentResponse = {
    paymentId: string
    paymentUrl?: string
}

export type PaymentResponse = {
    id: string
    orderId: string
    amount: number
    method: PaymentMethod
    status: number
}

export const paymentApi = {
    createPayment: async (
        orderId: string,
        method: PaymentMethod
    ) => {
        const res = await request<Result<CreatePaymentResponse>>(
            `/payments?orderId=${orderId}&method=${method}`,
            {
                method: "POST",
                auth: true,
            }
        )

        if (!res.isSuccess || !res.value) {
            throw new Error(res.message || "Create payment failed")
        }

        return res.value
    },

    getByOrderId: async (orderId: string) => {
        const res = await request<Result<PaymentResponse>>(
            `/payments/order/${orderId}`,
            {
                method: "GET",
                auth: true,
            }
        )

        if (!res.isSuccess || !res.value) {
            throw new Error(res.message || "Payment not found")
        }

        return res.value
    },

    vnPayReturn: async (
        params: Record<string, string>
    ) => {
        const query = new URLSearchParams(params).toString()

        const res = await request<Result<void>>(
            `/payments/vnpay-return?${query}`,
            {
                method: "GET",
            }
        )

        if (!res.isSuccess) {
            throw new Error(res.message || "VNPay payment failed")
        }

        return res
    },
}