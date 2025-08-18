import { customerProfileService } from "../services/customerProfile";
import type {
  UpdateProfileRequest,
  CustomerProfile,
  ProfileUpdateResponse,
} from "../services/customerProfile";

export const customerProfileHandler = {
  /**
   * Update customer profile
   */
  updateProfile: async (
    customerId: string,
    updateData: UpdateProfileRequest
  ): Promise<CustomerProfile> => {
    try {
      const response: ProfileUpdateResponse =
        await customerProfileService.updateProfile(customerId, updateData);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  /**
   * Get customer profile
   */
  getProfile: async (customerId: string): Promise<CustomerProfile> => {
    try {
      const response: ProfileUpdateResponse =
        await customerProfileService.getProfile(customerId);
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },
};
