"use client";

import { useEffect, useState } from "react";
import { useCompanyDetails } from "@/hooks/use-company-details";
import { useAppStore } from "@/store/use-app-store";

declare global {
  interface Window {
    initChatWidget: (config: any, delay?: number) => void;
  }
}

const ChatWidget: React.FC = () => {
  const { companyDetails, loading: companyLoading } = useCompanyDetails();
  const { customer, isAuthenticated } = useAppStore();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);
  const [widgetInitialized, setWidgetInitialized] = useState(false);

  useEffect(() => {
    console.log("ChatWidget: Component mounted", {
      companyDetails: !!companyDetails,
      customer: !!customer,
      isAuthenticated,
      companyLoading,
    });

    // Check if script is already loaded
    if (window.initChatWidget) {
      console.log("ChatWidget: Script already available");
      setScriptLoaded(true);
      initializeWidget();
      return;
    }

    // Load the MSG91 chat widget script
    const script = document.createElement("script");
    script.src = "https://blacksea.msg91.com/chat-widget.js";
    script.async = true;
    script.onload = () => {
      console.log("ChatWidget: Script loaded successfully");
      setScriptLoaded(true);
      setScriptError(null);

      // Initialize the chat widget once the script is loaded
      if (typeof window.initChatWidget === "function") {
        initializeWidget();
      } else {
        console.error(
          "ChatWidget: Script loaded but initChatWidget function not found"
        );
        setScriptError("Script loaded but initialization function not found");
      }
    };

    script.onerror = () => {
      console.error("ChatWidget: Failed to load MSG91 chat widget script");
      setScriptError("Failed to load chat widget script");
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Re-initialize when dependencies change
  useEffect(() => {
    if (
      scriptLoaded &&
      !widgetInitialized &&
      companyDetails &&
      !companyLoading
    ) {
      console.log("ChatWidget: Dependencies changed, re-initializing");
      initializeWidget();
    }
  }, [
    scriptLoaded,
    widgetInitialized,
    companyDetails,
    companyLoading,
    customer,
    isAuthenticated,
  ]);

  const initializeWidget = () => {
    try {
      if (!window.initChatWidget) {
        console.error("ChatWidget: initChatWidget function not available");
        return;
      }

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

      console.log("ChatWidget: Initializing with config", helloConfig);

      // Initialize with a 2 second delay for better UX
      window.initChatWidget(helloConfig, 2000);
      setWidgetInitialized(true);
      console.log("ChatWidget: Widget initialized successfully");
    } catch (error) {
      console.error("ChatWidget: Error initializing MSG91 chat widget:", error);
      setScriptError(`Initialization error: ${error}`);
    }
  };

  // Debug information in development
  if (process.env.NODE_ENV === "development") {
    console.log("ChatWidget: Render state", {
      scriptLoaded,
      scriptError,
      widgetInitialized,
      companyDetails: !!companyDetails,
      customer: !!customer,
      isAuthenticated,
      companyLoading,
    });
  }

  // Show debug info in development mode
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#f0f0f0",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "12px",
          zIndex: 9999,
          maxWidth: "200px",
        }}
      >
        <strong>Chat Widget Debug:</strong>
        <br />
        Script: {scriptLoaded ? "✅" : "❌"}
        <br />
        Widget: {widgetInitialized ? "✅" : "❌"}
        <br />
        Company: {companyDetails ? "✅" : "❌"}
        <br />
        Customer: {customer ? "✅" : "❌"}
        <br />
        {scriptError && (
          <span style={{ color: "red" }}>Error: {scriptError}</span>
        )}
        <br />
        <br />
        <button
          onClick={() => {
            console.log("Manual initialization attempt");
            if (typeof window.initChatWidget === "function") {
              initializeWidget();
            } else {
              console.log("initChatWidget not available");
            }
          }}
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Test Widget
        </button>
      </div>
    );
  }

  // This component doesn't render anything visible
  return null;
};

export default ChatWidget;
