export interface Address {
  id: string
  label: string
  receiverName: string
  recipient?: string
  phone: string
  street: string
  district: string
  city: string
  province: string
  isDefault: boolean
}