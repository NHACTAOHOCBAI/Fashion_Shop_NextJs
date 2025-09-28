interface Cart {
    id: number
    user: User
    items: CartItem[]
}
interface CartItem {
    id: number,
    quantity: number,
    cart: Cart,
    variant: Variant,
}