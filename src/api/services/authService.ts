export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful login
    return {
      user: {
        id: "1",
        email: credentials.email,
        name: "John Doe",
        role: "user",
        avatar: "/placeholder.svg?height=100&width=100",
        createdAt: "2024-01-01T00:00:00Z",
      },
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: "user",
        createdAt: new Date().toISOString(),
      },
      token: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
    }
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { token: "new-mock-jwt-token" }
  }

  async getProfile(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      role: "user",
      avatar: "/placeholder.svg?height=100&width=100",
      createdAt: "2024-01-01T00:00:00Z",
    }
  }
}

export const authService = new AuthService()
