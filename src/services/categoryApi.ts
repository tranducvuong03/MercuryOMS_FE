import { request } from "./apiClient"

export const getCategories = async () => {
  const res = await request("/categories")
  return res.value
}

export const getCategoryById = async (id: string) => {
  const res = await request(`/categories/${id}`)
  return res.value
}

export const createCategory = async (data: {
  name: string
}) => {
  return request("/categories", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true
  })
}