"use client";

import { useEffect } from "react";
import { useCompanyDetails } from "@/hooks/use-company-details";
import { useAppStore } from "@/store/use-app-store";

declare global {
  interface Window {
    initChatWidget: (config: any, delay?: number) => void;
  }
}

const ChatWidget: React.FC = () => {
  const { companyDetails } = useCompanyDetails();
  const { customer, isAuthenticated } = useAppStore();

  useEffect(() => {
    // Check if script is already loaded
    if (window.initChatWidget) {
      initializeWidget();
      return;
    }

    // Load the MSG91 chat widget script
    const script = document.createElement("script");
    script.src = "https://blacksea.msg91.com/chat-widget.js";
    script.async = true;
    script.onload = () => {
      // Initialize the chat widget once the script is loaded
      if (window.initChatWidget) {
        initializeWidget();
      }
    };

    script.onerror = () => {
      console.error("Failed to load MSG91 chat widget script");
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [companyDetails, customer, isAuthenticated]);

  const initializeWidget = () => {
    try {
      const helloConfig = {
        widgetToken: "1e8f9",
        hide_launcher: false,
        show_widget_form: true,
        show_close_button: true,
        launch_widget: false,
        show_send_button: true,
        unique_id: customer?.id || `guest_${Date.now()}`,
        name:
          customer?.firstName && customer?.lastName
            ? `${customer.firstName} ${customer.lastName}`
            : undefined,
        number: customer?.phone || undefined,
        mail: customer?.email || companyDetails?.email || undefined,
        country: "UK", // Default country
        city: "Bristol", // Default city
        region: "England", // Default region
      };

      // Initialize with a 2 second delay for better UX
      window.initChatWidget(helloConfig, 2000);
    } catch (error) {
      console.error("Error initializing MSG91 chat widget:", error);
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default ChatWidget;
