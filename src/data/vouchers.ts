export interface VoucherOption {
  id: string
  code: string
  title: string
  discount: number
  discountType: "percent" | "fixed"
}

export const availableVouchers: VoucherOption[] = [
  {
    id: "1",
    code: "FASHION50",
    title: "Giảm 50K - Fashion Plus Store",
    discount: 50000,
    discountType: "fixed"
  },
  {
    id: "2",
    code: "GADGET15",
    title: "Giảm 15% - Tech Gadgets Vietnam",
    discount: 15,
    discountType: "percent"
  },
  {
    id: "3",
    code: "SUMMER20",
    title: "Giảm 20% - Mua hè này",
    discount: 20,
    discountType: "percent"
  }
]

export const checkoutVouchers: VoucherOption[] = [
  {
    id: "1",
    code: "FASHION50",
    title: "Giảm 50K - Fashion Plus Store",
    discount: 50000,
    discountType: "fixed"
  },
  {
    id: "2",
    code: "GADGET15",
    title: "Giảm 15% - Tech Gadgets Vietnam",
    discount: 15,
    discountType: "percent"
  },
  {
    id: "3",
    code: "SUMMER20",
    title: "Giảm 20% - Mua hè này",
    discount: 20,
    discountType: "percent"
  },
  {
    id: "4",
    code: "GAMING30",
    title: "Giảm 30K - Gaming Hub Pro",
    discount: 30000,
    discountType: "fixed"
  },
  {
    id: "5",
    code: "SPORTS70",
    title: "Giảm 70K - Sports Plus",
    discount: 70000,
    discountType: "fixed"
  },
  {
    id: "6",
    code: "TRAVEL40",
    title: "Giảm 40K - Travel Store",
    discount: 40000,
    discountType: "fixed"
  }
]
