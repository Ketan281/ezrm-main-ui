import axios from "axios";

export interface CompanyDetails {
  name: string;
  fullName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  coverImage: string;
  about: string;
  twitter: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export interface CompanyDetailsResponse {
  success: boolean;
  data: CompanyDetails;
}

export const getCompanyDetails = async (): Promise<CompanyDetails> => {
  try {
    const response = await axios.get<CompanyDetailsResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/public/constants/company-details`
    );

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch company details");
    }
  } catch (error) {
    console.error("Error fetching company details:", error);
    // Return fallback data in case of error
    return {
      name: "EZRM",
      fullName: "EZRM Technologies",
      address: "123 Main St, Anytown, USA",
      phone: "+1234567890",
      email: "tech@ezrm.ai",
      website: "www.ezrm.com",
      logo: "https://www.ezrm.com/logo.png",
      coverImage: "https://www.ezrm.com/banner.png",
      about:
        "EZRM is a company that provides a platform for businesses to manage their inventory and orders.",
      twitter: "https://www.ezrm.com/x.png",
      facebook: "https://www.ezrm.com/facebook.png",
      instagram: "https://www.ezrm.com/instagram.png",
      linkedin: "https://www.ezrm.com/linkedin.png",
      youtube: "https://www.ezrm.com/youtube.png",
    };
  }
};
