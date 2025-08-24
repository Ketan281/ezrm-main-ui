import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Modal,
  Grid,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { ProductsTab, ContainerTrucksTab, StuffingResultTab } from "./TabComponents";
import { trucks, type Truck } from "./types";

const LoadCalculation: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTruckModalOpen, setIsTruckModalOpen] = useState(false);
  const [isContainerModalOpen, setIsContainerModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [selectedTruckForDetail, setSelectedTruckForDetail] = useState<Truck | null>(null);
  const [showTruckDetail, setShowTruckDetail] = useState(false);
  const [containerCount, setContainerCount] = useState(1);
  const [containerType, setContainerType] = useState("20' STANDARD");
  const [loadingRules, setLoadingRules] = useState("Auto");
  const [loadSpecificGroups, setLoadSpecificGroups] = useState(false);

  // Modal handlers
  const handleOpenTruckModal = () => {
    setSelectedTruck(null);
    setShowTruckDetail(false);
    setIsTruckModalOpen(true);
  };

  const handleCloseTruckModal = () => {
    setIsTruckModalOpen(false);
    setSelectedTruck(null);
    setShowTruckDetail(false);
  };

  const handleSelectTruck = (truck: Truck) => setSelectedTruck(truck);

  const handleTruckSelect = () => {
    if (selectedTruck) {
      setSelectedTruckForDetail(selectedTruck);
      setShowTruckDetail(true);
      setIsTruckModalOpen(false);
    }
  };

  const handleOpenContainerModal = () => setIsContainerModalOpen(true);
  const handleCloseContainerModal = () => setIsContainerModalOpen(false);

  // Tab navigation handlers
  const handleNextTab = () => setActiveTab(prev => Math.min(prev + 1, 2));
  const handlePrevTab = () => setActiveTab(prev => Math.max(prev - 1, 0));

  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#333", mb: 3, fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"' }}>Load & Stuffing Calculation</Typography>

      <Paper elevation={0} sx={{ border: "1px solid transparent", borderRadius: "8px", overflow: "hidden" }}>
        {/* Tab Header */}
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(251, 251, 251, 1)", minHeight: 56 }}>
          {/* Tabs */}
          {["PRODUCTS", "CONTAINER & TRUCKS", "STUFFING RESULT"].map((tab, index) => (
            <Box
              key={tab}
              onClick={() => setActiveTab(index)}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 600,
                color: activeTab === index ? "#ff6b35" : "rgba(90, 96, 127, 0.77)",
                borderRight: index < 2 ? "3px solid #f0f0f0" : "none",
                borderBottom: activeTab === index ? "2px solid #ff6b35" : "2px solid transparent",
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": { color: "#ff6b35" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  backgroundColor: "#ff6b35",
                  transform: activeTab === index ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "center",
                  transition: "transform 0.3s ease",
                },
              }}
            >
              {tab}
            </Box>
          ))}

          {/* Settings Icon */}
          <IconButton sx={{ m: 1, border: "1px solid transparent", borderRadius: "4px", width: 36, height: 36, bgcolor: "white", "&:hover": { bgcolor: "#f5f5f5" } }}>
            <Settings sx={{ fontSize: 18, color: "#999" }} />
          </IconButton>
        </Box>

        {/* Tab Content */}
        {activeTab === 0 && <ProductsTab onNext={handleNextTab} />}
        
        {activeTab === 1 && (
          <ContainerTrucksTab
            selectedTruckForDetail={selectedTruckForDetail}
            showTruckDetail={showTruckDetail}
            containerCount={containerCount}
            setContainerCount={setContainerCount}
            containerType={containerType}
            setContainerType={setContainerType}
            loadingRules={loadingRules}
            setLoadingRules={setLoadingRules}
            loadSpecificGroups={loadSpecificGroups}
            setLoadSpecificGroups={setLoadSpecificGroups}
            onAddContainer={handleOpenContainerModal}
            onAddTruck={handleOpenTruckModal}
            onNext={handleNextTab}
            onBack={handlePrevTab}
          />
        )}
        
        {activeTab === 2 && <StuffingResultTab onBack={handlePrevTab} />}
      </Paper>

      {/* Truck Selection Modal */}
      <Modal open={isTruckModalOpen} onClose={handleCloseTruckModal} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ width: { xs: "95%", sm: "85%", md: "75%", lg: 1000 }, maxHeight: "90vh", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 0, overflow: "hidden", position: "relative" }}>
          {/* Modal Header with Tabs */}
          <Box sx={{ bgcolor: "#fafafa", px: 3, py: 2, borderBottom: "1px solid #e5e5e5" }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#667080", fontSize: 16, fontWeight: 500, cursor: "pointer" }}>🏛️ Container</Typography>
              <Typography sx={{ display: "flex", alignItems: "center", gap: 1, color: "#1890ff", fontSize: 16, fontWeight: 600, cursor: "pointer", borderBottom: "3px solid #1890ff", pb: 1 }}>🚚 Truck</Typography>
            </Box>
          </Box>

          {/* Modal Content */}
          <Box sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}>
            <Grid container spacing={2}>
              {trucks.map((truck) => (
                <Grid key={truck.id}>
                  <Box
                    onClick={() => handleSelectTruck(truck)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      border: selectedTruck?.id === truck.id ? "3px solid #1890ff" : "1px solid #e1e6ed",
                      p: 2,
                      textAlign: "center",
                      height: "100%",
                      minHeight: 200,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      backgroundColor: "#fff",
                      transition: "border-color 0.3s, transform 0.2s",
                      "&:hover": { borderColor: "#1890ff", transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#18202c", whiteSpace: "pre-line", lineHeight: 1.3, minHeight: 40, display: "flex", alignItems: "center" }}>{truck.name}</Typography>

                    <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Box sx={{ width: 120, height: 80, bgcolor: "#f8f9fa", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🚛</Box>
                    </Box>

                    <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#9aa5b1", textTransform: "uppercase", letterSpacing: 0.5 }}>LEARN MORE</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Modal Footer */}
          <Box sx={{ px: 3, py: 2.5, bgcolor: "#fafafa", borderTop: "1px solid #e5e5e5", display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseTruckModal} sx={{ fontWeight: 600, textTransform: "none", fontSize: 14, px: 4, py: 1, borderRadius: 2, color: "#5992ff", borderColor: "#e1e6ed", "&:hover": { borderColor: "#5992ff", bgcolor: "rgba(89, 146, 255, 0.04)" } }}>Cancel</Button>
            <Button variant="contained" disabled={!selectedTruck} onClick={handleTruckSelect} sx={{ fontWeight: 600, textTransform: "none", fontSize: 14, px: 4, py: 1, borderRadius: 2, bgcolor: "#1890ff", "&:hover": { bgcolor: "#0c7cd5" }, "&:disabled": { bgcolor: "#d1d5db", color: "#9ca3af" } }}>Select</Button>
          </Box>
        </Box>
      </Modal>

      {/* Container Modal */}
      <Modal open={isContainerModalOpen} onClose={handleCloseContainerModal} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, minWidth: 300, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>Coming Soon</Typography>
          <Typography sx={{ mb: 3, color: "#666" }}>Container functionality will be available soon!</Typography>
          <Button variant="contained" onClick={handleCloseContainerModal} sx={{ bgcolor: "#ff8144", px: 4, "&:hover": { bgcolor: "#e55a2b" } }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LoadCalculation;
