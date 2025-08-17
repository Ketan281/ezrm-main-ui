import { passwordChangeService } from "../services/passwordChange";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../services/passwordChange";

export const passwordChangeHandler = {
  /**
   * Change customer password
   */
  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<boolean> => {
    try {
      const passwordData: ChangePasswordRequest = {
        currentPassword,
        newPassword,
      };

      const response: ChangePasswordResponse =
        await passwordChangeService.changePassword(passwordData);
      return response.success;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
