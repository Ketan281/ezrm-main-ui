export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateOrderData {
  items: Omit<OrderItem, "id">[]
  shippingAddress: Order["shippingAddress"]
}

class OrderService {
  async getOrders(userId?: string): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return [
      {
        id: "order-1",
        userId: userId || "1",
        items: [
          {
            id: "item-1",
            productId: "1",
            productName: "Premium Headphones",
            quantity: 1,
            price: 299.99,
          },
        ],
        total: 299.99,
        status: "delivered",
        shippingAddress: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "USA",
        },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-05T00:00:00Z",
      },
    ]
  }

  async getOrder(id: string): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id,
      userId: "1",
      items: [
        {
          id: "item-1",
          productId: "1",
          productName: "Premium Headphones",
          quantity: 1,
          price: 299.99,
        },
      ],
      total: 299.99,
      status: "processing",
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-02T00:00:00Z",
    }
  }

  async createOrder(orderData: CreateOrderData): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
      id: `order-${Date.now()}`,
      userId: "1",
      items: orderData.items.map((item, index) => ({
        ...item,
        id: `item-${index + 1}`,
      })),
      total,
      status: "pending",
      shippingAddress: orderData.shippingAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async cancelOrder(id: string): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const order = await this.getOrder(id)
    return {
      ...order,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    }
  }
}

export const orderService = new OrderService()
