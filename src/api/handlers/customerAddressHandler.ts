import { customerAddressService } from "../services/customerAddress";
import type {
  CustomerAddress,
  AddAddressRequest,
  UpdateAddressRequest,
  CustomerAddressResponse,
  CustomerAddressDetailResponse,
} from "../services/customerAddress";

export const customerAddressHandler = {
  /**
   * Get all addresses for a customer
   */
  getAddresses: async (customerId: string): Promise<CustomerAddress[]> => {
    try {
      const response: CustomerAddressResponse =
        await customerAddressService.getAddresses(customerId);
      return response.data || [];
    } catch (error) {
      console.error("Error fetching customer addresses:", error);
      throw error;
    }
  },

  /**
   * Get address detail
   */
  getAddressDetail: async (
    customerId: string,
    addressId: string
  ): Promise<CustomerAddress | null> => {
    try {
      const response: CustomerAddressDetailResponse =
        await customerAddressService.getAddressDetail(customerId, addressId);
      return response.data || null;
    } catch (error) {
      console.error("Error fetching address detail:", error);
      throw error;
    }
  },

  /**
   * Add new address
   */
  addAddress: async (
    customerId: string,
    addressData: AddAddressRequest
  ): Promise<CustomerAddress | null> => {
    try {
      const response: CustomerAddressDetailResponse =
        await customerAddressService.addAddress(customerId, addressData);
      return response.data || null;
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  },

  /**
   * Update address
   */
  updateAddress: async (
    customerId: string,
    addressId: string,
    addressData: UpdateAddressRequest
  ): Promise<CustomerAddress | null> => {
    try {
      const response: CustomerAddressDetailResponse =
        await customerAddressService.updateAddress(
          customerId,
          addressId,
          addressData
        );
      return response.data || null;
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  },

  /**
   * Delete address
   */
  deleteAddress: async (
    customerId: string,
    addressId: string
  ): Promise<boolean> => {
    try {
      await customerAddressService.deleteAddress(customerId, addressId);
      return true;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  },

  /**
   * Set default address
   */
  setDefaultAddress: async (
    customerId: string,
    addressId: string
  ): Promise<CustomerAddress | null> => {
    try {
      const response: CustomerAddressDetailResponse =
        await customerAddressService.setDefaultAddress(customerId, addressId);
      return response.data || null;
    } catch (error) {
      console.error("Error setting default address:", error);
      throw error;
    }
  },
};
