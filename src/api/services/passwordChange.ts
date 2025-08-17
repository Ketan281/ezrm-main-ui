import { API_CONFIG, ENDPOINTS } from "../config";

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

class PasswordChangeService {
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("customer_token")
        : null;

    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  /**
   * Change customer password
   */
  async changePassword(
    passwordData: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    return this.makeRequest<ChangePasswordResponse>(
      ENDPOINTS.PASSWORD_CHANGE.CHANGE,
      {
        method: "POST",
        body: JSON.stringify(passwordData),
      }
    );
  }
}

export const passwordChangeService = new PasswordChangeService();
