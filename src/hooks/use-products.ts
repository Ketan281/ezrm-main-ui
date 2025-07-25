import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: string
}

// Mock API functions (replace with your actual API calls)
const fetchProducts = async (): Promise<Product[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: "1",
      name: "Sample Product 1",
      price: 99.99,
      description: "This is a sample product",
      image: "/placeholder.svg?height=200&width=200",
      category: "electronics",
    },
    {
      id: "2",
      name: "Sample Product 2",
      price: 149.99,
      description: "Another sample product",
      image: "/placeholder.svg?height=200&width=200",
      category: "clothing",
    },
  ]
}

const fetchProduct = async (id: string): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    id,
    name: `Product ${id}`,
    price: 99.99,
    description: `Description for product ${id}`,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
  }
}

const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { ...product, id: Date.now().toString() }
}

// Custom hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
