import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { Customer } from "@/api/services/customerAuth"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  uniqueId: string
}

interface AppState {
  // Customer auth state
  customer: Customer | null
  isAuthenticated: boolean

  // Product-related state
  favorites: string[]
  cart: CartItem[]
  cartTotal: number

  // UI state
  theme: "light" | "dark"

  // Customer auth actions
  setCustomer: (customer: Customer) => void
  clearCustomer: () => void

  // Actions
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean

  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartItemQuantity: (productId: string) => number

  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        customer: null,
        isAuthenticated: false,
        favorites: [],
        cart: [],
        cartTotal: 0,
        theme: "light",

        // Customer auth actions
        setCustomer: (customer) => set({ customer, isAuthenticated: true }),
        clearCustomer: () => set({ customer: null, isAuthenticated: false }),

        // Favorite actions
        toggleFavorite: (productId) => {
          const { favorites } = get()
          const newFavorites = favorites.includes(productId)
            ? favorites.filter((id) => id !== productId)
            : [...favorites, productId]
          set({ favorites: newFavorites })
        },

        isFavorite: (productId) => {
          const { favorites } = get()
          return favorites.includes(productId)
        },

        // Cart actions
        addToCart: (item) => {
          const { cart } = get()
          const existingItem = cart.find((cartItem) => cartItem.id === item.id)

          if (existingItem) {
            set({
              cart: cart.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
              ),
            })
          } else {
            set({ cart: [...cart, { ...item, quantity: 1 }] })
          }

          // Update cart total
          const newCart = get().cart
          const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
          set({ cartTotal: total })
        },

        removeFromCart: (id) => {
          const { cart } = get()
          const newCart = cart.filter((item) => item.id !== id)
          const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
          set({ cart: newCart, cartTotal: total })
        },

        updateCartItemQuantity: (id, quantity) => {
          if (quantity <= 0) {
            get().removeFromCart(id)
            return
          }

          const { cart } = get()
          const newCart = cart.map((item) => (item.id === id ? { ...item, quantity } : item))
          const total = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
          set({ cart: newCart, cartTotal: total })
        },

        clearCart: () => set({ cart: [], cartTotal: 0 }),

        getCartItemQuantity: (productId) => {
          const { cart } = get()
          const item = cart.find((item) => item.id === productId)
          return item?.quantity || 0
        },

        // UI actions
        toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      }),
      {
        name: "app-store",
        partialize: (state) => ({
          customer: state.customer,
          isAuthenticated: state.isAuthenticated,
          favorites: state.favorites,
          cart: state.cart,
          cartTotal: state.cartTotal,
          theme: state.theme,
        }),
      },
    ),
    { name: "app-store" },
  ),
)
