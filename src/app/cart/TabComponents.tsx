import type React from "react";
import {
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Settings, ArrowUpward, ArrowDownward, DeleteOutline } from "@mui/icons-material";
import { sampleProducts, type Truck } from "./types";

interface ProductsTabProps {
  onNext: () => void;
}

interface ContainerTrucksTabProps {
  selectedTruckForDetail: Truck | null;
  showTruckDetail: boolean;
  containerCount: number;
  setContainerCount: (count: number) => void;
  containerType: string;
  setContainerType: (type: string) => void;
  loadingRules: string;
  setLoadingRules: (rules: string) => void;
  loadSpecificGroups: boolean;
  setLoadSpecificGroups: (value: boolean) => void;
  onAddContainer: () => void;
  onAddTruck: () => void;
  onNext: () => void;
  onBack: () => void;
}

interface StuffingResultTabProps {
  onBack: () => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ onNext }) => {
  return (
    <>
      {/* Action Buttons for Products Tab */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, p: 2, bgcolor: "rgba(251, 251, 251, 1)", borderBottom: "1px solid #f0f0f0", mt: 2, mb: 2 }}>
        <Box>
          <Button
            size="medium"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "none",
              color: "#fff",
              background: "linear-gradient(90deg, #F58A4E 0%, #F16A3C 100%)",
              minWidth: 135,
              height: 38,
              borderRadius: "5px",
              "&:hover": { borderColor: "#d0d0d0" },
            }}
          >
            + Add Group
          </Button>
        </Box>
        <Box display={"flex"} gap={2}>
          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "none",
              borderColor: "#e0e0e0",
              color: "#52c41a",
              bgcolor: "rgba(238, 249, 236, 1)",
              minWidth: 135,
              height: 38,
              borderRadius: "5px",
              "&:hover": { borderColor: "#52c41a", bgcolor: "rgba(82, 196, 26, 0.05)" },
            }}
          >
            Import
          </Button>

          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "none",
              borderColor: "#e0e0e0",
              color: "#1890ff",
              bgcolor: "rgba(230, 232, 255, 1)",
              minWidth: 135,
              height: 38,
              borderRadius: "5px",
              "&:hover": { borderColor: "#1890ff", bgcolor: "rgba(24, 144, 255, 0.05)" },
            }}
          >
            Export
          </Button>

          <Button
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "none",
              borderColor: "#e0e0e0",
              color: "#fff",
              background: "linear-gradient(90deg, rgba(255, 199, 0, 1) 0%, rgba(255, 143, 107, 1) 100%)",
              minWidth: 135,
              height: 38,
              borderRadius: "5px",
              "&:hover": { borderColor: "#faad14", bgcolor: "rgba(250, 173, 20, 0.05)" },
            }}
          >
            Upgrade
          </Button>
        </Box>
      </Box>

      {/* Products Table Section */}
      <Box sx={{ p: 2, bgcolor: "white" }}>
        {/* Group Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, p: 1, borderBottom: "1px solid rgba(203, 204, 214, 1)" }}>
          <Box sx={{ width: 12, height: 12, bgcolor: "#333", borderRadius: "50%" }} />
          <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#333" }}>Group #1</Typography>
          <IconButton size="small" sx={{ ml: "auto" }}></IconButton>
          <IconButton size="small" sx={{ color: "#ff4d4f" }}>
            <img src="/bin.png" alt="Delete" style={{ width: 16, height: 16 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: "#1890ff" }}>
            <ArrowUpward sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: "#52c41a" }}>
            <ArrowDownward sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }}>Type</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }}>Product Name</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Length/Diameter</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Width</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Height</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Weight</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Quantity</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Color</TableCell>
                <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#666", py: 1 }} align="center">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Product Rows */}
              {sampleProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ width: 24, height: 24, bgcolor: "#f0f0f0", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>{product.type}</Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5 }}>
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 16px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa" }}>{product.name}</Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5 }} align="center">
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 12px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa" }}>{product.length} <span style={{ color: "#999" }}>mm</span></Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5 }} align="center">
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 12px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa" }}>{product.width} <span style={{ color: "#999" }}>mm</span></Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5 }} align="center">
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 12px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa" }}>{product.height} <span style={{ color: "#999" }}>mm</span></Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5 }} align="center">
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 12px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa" }}>{product.weight} <span style={{ color: "#999" }}>kg</span></Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", py: 1.5, fontWeight: 600 }} align="center">
                    <Box component="span" sx={{ border: "1px solid rgba(217, 217, 217, 1)", borderRadius: "20px", width: "100px", padding: "6px 16px", display: "inline-block", fontSize: "12px", backgroundColor: "#fafafa", fontWeight: 600 }}>{product.quantity}</Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }} align="center">
                    <Box sx={{ width: 16, height: 16, bgcolor: product.color, borderRadius: "50%", mx: "auto" }} />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }} align="center">
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                      <IconButton size="small" sx={{ color: "#1890ff" }}><Settings sx={{ fontSize: 14 }} /></IconButton>
                      <IconButton size="small" sx={{ color: "#ff4d4f" }}><img src="/bin.png" alt="Delete" style={{ width: 14, height: 14 }} /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Product Link */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
          <Button size="small" sx={{ fontSize: "12px", color: "#1890ff", textTransform: "none", fontWeight: 500, p: 0, minWidth: "auto", "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}>+ Add Product</Button>
          <Typography sx={{ fontSize: "12px", color: "#999", ml: 2 }}>Use Palette ?</Typography>
        </Box>

        {/* Product Count */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ fontSize: "12px", color: "#1890ff", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>1,245 Product(s)</Typography>
        </Box>
      </Box>

      {/* Next Button for Products Tab */}
      <Box sx={{ display: "flex", justifyContent: "center", p: 3, backgroundColor: "white", borderTop: "1px solid #f0f0f0" }}>
        <Button variant="contained" onClick={onNext} sx={{ bgcolor: "#ff6b35", color: "white", fontSize: "14px", fontWeight: 600, textTransform: "none", px: 4, py: 1, borderRadius: "4px", minWidth: 120, "&:hover": { bgcolor: "#e55a2b" } }}>Next</Button>
      </Box>
    </>
  );
};

export const ContainerTrucksTab: React.FC<ContainerTrucksTabProps> = ({
  selectedTruckForDetail,
  showTruckDetail,
  containerCount,
  setContainerCount,
  containerType,
  setContainerType,
  loadingRules,
  setLoadingRules,
  loadSpecificGroups,
  setLoadSpecificGroups,
  onAddContainer,
  onAddTruck,
  onNext,
  onBack,
}) => {
  return (
    <Box sx={{ bgcolor: "#fff", fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'", px: { xs: 1, sm: 1, md: 2.5 }, pt: { xs: 2, sm: 3, md: 4 } }}>
      {/* Top Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: { xs: 2, md: 3.5 } }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" disableElevation onClick={onAddContainer} sx={{ fontSize: "15px", fontWeight: 500, textTransform: "none", bgcolor: "#FF8043", color: "#fff", px: 3, py: 1, minWidth: "160px", borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#FF8043" } }}>+ Add Container</Button>
          <Button variant="contained" disableElevation onClick={onAddTruck} sx={{ fontSize: "15px", fontWeight: 500, textTransform: "none", bgcolor: "#FF8043", color: "#fff", px: 3, py: 1, minWidth: "140px", borderRadius: "10px", boxShadow: "none", "&:hover": { bgcolor: "#FF8043" } }}>+ Add Truck</Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#fff7f1", px: 2.4, py: 0.75, borderRadius: "12px", minHeight: 40, boxShadow: "none" }}>
          <Checkbox size="small" checked sx={{ p: 0, color: "#FF8043", "&.Mui-checked": { color: "#FF8043" }, mr: 1.2, "& .MuiSvgIcon-root": { fontSize: "1.45rem" } }} />
          <Typography sx={{ fontSize: "15px", fontWeight: 500, fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'", color: "#FF8043", letterSpacing: 0, whiteSpace: "nowrap" }}>Automatic container selection</Typography>
        </Box>
      </Box>

      {/* Main Content Box */}
      {selectedTruckForDetail && showTruckDetail ? (
        <Box sx={{ py: 2, borderRadius: 2, bgcolor: "#fff", maxWidth: 900, mx: "auto" }}>
          {/* Dropdown and action icons row */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Select size="small" value={containerType} onChange={(e) => setContainerType(e.target.value)} sx={{ width: 150, fontSize: 13 }} variant="outlined">
              <MenuItem value="20' STANDARD">20&apos; STANDARD</MenuItem>
              <MenuItem value="40' STANDARD">40&apos; STANDARD</MenuItem>
              <MenuItem value="40' HIGH CUBE">40&apos; HIGH CUBE</MenuItem>
            </Select>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small" sx={{ color: "#ff4d4f" }}><DeleteOutline fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "#1890ff" }}><ArrowUpward fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: "#52c41a" }}><ArrowDownward fontSize="small" /></IconButton>
            </Box>
          </Box>

          {/* Main row with image and inputs */}
          <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start", mb: 2 }}>
            <Box sx={{ width: 200, height: 180, bgcolor: "#ebebe9", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Box sx={{ fontSize: 80, color: "#999" }}>📦</Box>
            </Box>

            {/* Form inputs section */}
            <Box sx={{ flex: 1 }}>
              {/* First row - Labels */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Typography sx={{ fontSize: 13, width: "80px", textAlign: "center" }}>Count</Typography>
                <Typography sx={{ fontSize: 13, width: "100px", textAlign: "center" }}>Length</Typography>
                <Typography sx={{ fontSize: 13, width: "100px", textAlign: "center" }}>Width</Typography>
                <Typography sx={{ fontSize: 13, width: "100px", textAlign: "center" }}>Height</Typography>
                <Typography sx={{ fontSize: 13, width: "100px", textAlign: "center" }}>Max Weight</Typography>
              </Box>

              {/* Second row - Input fields */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                {/* Count field with +/- buttons inside */}
                <TextField 
                  size="small" 
                  type="number" 
                  value={containerCount} 
                  onChange={(e) => setContainerCount(Math.max(1, parseInt(e.target.value) || 1))} 
                  InputProps={{
                    startAdornment: (
                      <IconButton 
                        size="small" 
                        onClick={() => setContainerCount(Math.max(1, containerCount - 1))}
                        sx={{ p: 0, minWidth: 'auto', width: 20, height: 20, fontSize: "12px", color: "#666" }}
                      >
                        -
                      </IconButton>
                    ),
                    endAdornment: (
                      <IconButton 
                        size="small" 
                        onClick={() => setContainerCount(containerCount + 1)}
                        sx={{ p: 0, minWidth: 'auto', width: 20, height: 20, fontSize: "12px", color: "#666" }}
                      >
                        +
                      </IconButton>
                    )
                  }}
                  inputProps={{ 
                    min: 1, 
                    style: { 
                      textAlign: "center", 
                      fontSize: 12, 
                      padding: "6px 4px"
                    } 
                  }} 
                  sx={{ 
                    width: 80,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      }
                    }
                  }} 
                />

                {/* Length field */}
                <TextField 
                  size="small" 
                  defaultValue="678" 
                  InputProps={{
                    endAdornment: <Typography sx={{ fontSize: 10, color: "#999" }}>mm</Typography>
                  }}
                  inputProps={{ 
                    readOnly: true, 
                    style: { 
                      textAlign: "center", 
                      fontSize: 12,
                      padding: "6px 8px"
                    } 
                  }} 
                  sx={{ 
                    width: 100,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      }
                    }
                  }} 
                />

                {/* Width field */}
                <TextField 
                  size="small" 
                  defaultValue="678" 
                  InputProps={{
                    endAdornment: <Typography sx={{ fontSize: 10, color: "#999" }}>mm</Typography>
                  }}
                  inputProps={{ 
                    readOnly: true, 
                    style: { 
                      textAlign: "center", 
                      fontSize: 12,
                      padding: "6px 8px"
                    } 
                  }} 
                  sx={{ 
                    width: 100,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      }
                    }
                  }} 
                />

                {/* Height field */}
                <TextField 
                  size="small" 
                  defaultValue="678" 
                  InputProps={{
                    endAdornment: <Typography sx={{ fontSize: 10, color: "#999" }}>mm</Typography>
                  }}
                  inputProps={{ 
                    readOnly: true, 
                    style: { 
                      textAlign: "center", 
                      fontSize: 12,
                      padding: "6px 8px"
                    } 
                  }} 
                  sx={{ 
                    width: 100,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      }
                    }
                  }} 
                />

                {/* Max Weight field */}
                <TextField 
                  size="small" 
                  defaultValue="678" 
                  InputProps={{
                    endAdornment: <Typography sx={{ fontSize: 10, color: "#999" }}>kg</Typography>
                  }}
                  inputProps={{ 
                    readOnly: true, 
                    style: { 
                      textAlign: "center", 
                      fontSize: 12,
                      padding: "6px 8px"
                    } 
                  }} 
                  sx={{ 
                    width: 100,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      }
                    }
                  }} 
                />
              </Box>

              {/* Third row - Loading rules label */}
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: 13 }}>Loading rules</Typography>
              </Box>

              {/* Fourth row - Loading rules select and checkbox */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Select 
                  size="small" 
                  value={loadingRules} 
                  onChange={(e) => setLoadingRules(e.target.value)} 
                  sx={{ 
                    width: 120, 
                    fontSize: 12,
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgba(217, 217, 217, 1)",
                      borderRadius: "20px",
                      backgroundColor: "#fafafa",
                      height: "32px",
                      "& fieldset": {
                        border: "none"
                      },
                      "&:hover fieldset": {
                        border: "none"
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid rgba(217, 217, 217, 1)"
                      },
                      "& .MuiSelect-select": {
                        padding: "6px 12px",
                        fontSize: 12,
                        textAlign: "center"
                      }
                    }
                  }}
                >
                  <MenuItem value="Auto">Auto</MenuItem>
                  <MenuItem value="Manual">Manual</MenuItem>
                </Select>
                <FormControlLabel
                  control={<Checkbox size="small" checked={loadSpecificGroups} onChange={(e) => setLoadSpecificGroups(e.target.checked)} />}
                  label={<Typography sx={{ fontSize: 13, fontWeight: 400, color: "#000" }}>Load only specific groups</Typography>}
                />
              </Box>
            </Box>
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
            <Button variant="outlined" onClick={onBack} sx={{ minWidth: 96, borderRadius: 2, borderColor: "#f6e1da", color: "#ff8144", fontWeight: 600, fontSize: 14, textTransform: "none", "&:hover": { borderColor: "#f6e1da", bgcolor: "rgba(255, 129, 68, 0.04)" } }}>Back</Button>
            <Button variant="contained" onClick={onNext} sx={{ minWidth: 112, borderRadius: 2, bgcolor: "#ff8144", fontWeight: 600, fontSize: 14, textTransform: "none", "&:hover": { bgcolor: "#e55a2b" } }}>Next</Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ bgcolor: "#fff", borderRadius: "16px", boxShadow: "none", minHeight: { xs: 250, sm: 330, md: 340 }, display: "flex", alignItems: "center", justifyContent: "center", mb: { xs: 2.5, md: 5 }, border: "2px solid rgba(248,248,248, 1)", px: { xs: 0, sm: 2, md: 4 }, py: { xs: 3, sm: 4, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", pt: 1, pb: 1 }}>
            <Box sx={{ mb: 2.25, width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ fontSize: 54, color: "#1890ff" }}>📦</Box>
            </Box>
            <Typography sx={{ fontFamily: "'Inter', 'Roboto', Arial, 'sans-serif'", fontWeight: 600, fontSize: "18px", color: "#220c1b", letterSpacing: 0.02 }}>Please add Transport</Typography>
          </Box>
        </Box>
      )}

      {!showTruckDetail && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 3, mb: 1.5, mt: { xs: 2, md: 0 } }}>
          <Button variant="contained" disableElevation onClick={onBack} sx={{ minWidth: "120px", borderRadius: "8px", background: "#ffe7db", color: "#ff8144", boxShadow: "none", fontSize: "16px", fontWeight: 600, textTransform: "none", height: 44, mr: 1.5, "&:hover": { background: "#ffe7db", color: "#ff8144" } }}>Back</Button>
          <Button variant="contained" disableElevation onClick={onNext} sx={{ minWidth: "120px", borderRadius: "8px", background: "#ff8144", color: "#fff", fontSize: "16px", fontWeight: 600, textTransform: "none", height: 44, boxShadow: "none", "&:hover": { background: "#ff8144", color: "#fff" } }}>Next</Button>
        </Box>
      )}
    </Box>
  );
};



export const StuffingResultTab: React.FC<StuffingResultTabProps> = ({ onBack }) => {
  return (
    <Box sx={{ bgcolor: "#fff", p: 2, fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'" }}>
      {/* Main Content Container */}
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        
        {/* Left Column - Container Details */}
        <Box sx={{ width: 200, flexShrink: 0 }}>
          {/* Container Type Header */}
          <Box sx={{ 
            bgcolor: "#f8f9fa", 
            border: "1px solid #e9ecef", 
            borderRadius: "4px 4px 0 0",
            px: 2, 
            py: 1,
            textAlign: "center"
          }}>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#495057" }}>
              20 STANDARD
            </Typography>
          </Box>

          {/* Container 3D Visualization */}
          <Box sx={{ 
            border: "1px solid #e9ecef", 
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            bgcolor: "#fff",
            p: 2,
            textAlign: "center",
            minHeight: 180
          }}>
            {/* Container Image Placeholder */}
            <Box sx={{ 
              width: "100%", 
              height: 120, 
              bgcolor: "#f8f9fa", 
              borderRadius: "4px",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}>
              {/* Simplified 3D Container representation */}
              <Box sx={{
                width: 80,
                height: 60,
                bgcolor: "#e9ecef",
                borderRadius: "2px",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: -8,
                  left: 8,
                  width: 80,
                  height: 60,
                  bgcolor: "#dee2e6",
                  borderRadius: "2px",
                  zIndex: -1
                }
              }} />
            </Box>

            {/* Container Stats */}
            <Box sx={{ textAlign: "left", fontSize: "11px", color: "#6c757d" }}>
              <Box sx={{ mb: 0.5 }}>
                <Typography component="span" sx={{ color: "#dc3545", fontWeight: 600 }}>1</Typography>
                <Typography component="span" sx={{ ml: 0.5 }}>Unit</Typography>
              </Box>
              <Box sx={{ mb: 0.5 }}>
                <Typography component="span" sx={{ fontSize: "10px" }}>Weight: </Typography>
                <Typography component="span" sx={{ fontSize: "10px", fontWeight: 600 }}>14300.00 kg</Typography>
              </Box>
              <Box>
                <Typography component="span" sx={{ fontSize: "10px" }}>Volume: </Typography>
                <Typography component="span" sx={{ fontSize: "10px", fontWeight: 600 }}>28.36 m³</Typography>
              </Box>
            </Box>
          </Box>

          {/* Second Container */}
          <Box sx={{ mt: 3 }}>
            <Box sx={{ 
              bgcolor: "#f8f9fa", 
              border: "1px solid #e9ecef", 
              borderRadius: "4px 4px 0 0",
              px: 2, 
              py: 1,
              textAlign: "center"
            }}>
              <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#495057" }}>
                20 STANDARD #1
              </Typography>
            </Box>

            <Box sx={{ 
              border: "1px solid #e9ecef", 
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
              bgcolor: "#fff",
              p: 2,
              textAlign: "center",
              minHeight: 180,
              position: "relative"
            }}>
              {/* 3D Visualization with colored boxes */}
              <Box sx={{ 
                width: "100%", 
                height: 120, 
                bgcolor: "#f8f9fa", 
                borderRadius: "4px",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* 3D Container with stacked boxes */}
                <Box sx={{ position: "relative", width: 100, height: 80 }}>
                  {/* Bottom layer - green boxes */}
                  <Box sx={{ 
                    position: "absolute", 
                    bottom: 0, 
                    left: 10,
                    width: 80, 
                    height: 20, 
                    bgcolor: "#28a745",
                    borderRadius: "1px"
                  }} />
                  
                  {/* Middle layer - purple/magenta box */}
                  <Box sx={{ 
                    position: "absolute", 
                    bottom: 20, 
                    left: 20,
                    width: 60, 
                    height: 30, 
                    bgcolor: "#e83e8c",
                    borderRadius: "1px"
                  }} />
                  
                  {/* Top layer - additional green */}
                  <Box sx={{ 
                    position: "absolute", 
                    bottom: 50, 
                    left: 30,
                    width: 40, 
                    height: 15, 
                    bgcolor: "#28a745",
                    borderRadius: "1px"
                  }} />
                </Box>
              </Box>

              <Box sx={{ textAlign: "left", fontSize: "11px", color: "#6c757d" }}>
                <Box sx={{ mb: 0.5 }}>
                  <Typography component="span" sx={{ color: "#dc3545", fontWeight: 600 }}>1</Typography>
                  <Typography component="span" sx={{ ml: 0.5 }}>Unit</Typography>
                </Box>
                
                {/* Efficiency indicator */}
                <Box sx={{ 
                  position: "absolute", 
                  bottom: 8, 
                  right: 8,
                  bgcolor: "#dc3545",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  borderRadius: "12px",
                  fontSize: "9px",
                  fontWeight: 600
                }}>
                  🔥 29 View
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Column - Statistics and Table */}
        <Box sx={{ flex: 1 }}>
          
          {/* Statistics Summary */}
          <Box sx={{ mb: 3 }}>
            {/* Total Stats */}
            <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: "14px", color: "#6c757d", mb: 0.5 }}>Total</Typography>
                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "#495057" }}>190 Packages</Typography>
              </Box>
            </Box>

            {/* Cargo Details */}
            <Box sx={{ display: "flex", gap: 4, mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#6c757d", mb: 0.5 }}>Cargo Volume</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#495057" }}>
                  28.30 m³ 
                  <Typography component="span" sx={{ fontSize: "11px", color: "#28a745", ml: 1 }}>
                    (85% of volume)
                  </Typography>
                </Typography>
              </Box>
              
              <Box>
                <Typography sx={{ fontSize: "12px", color: "#6c757d", mb: 0.5 }}>Cargo Weight</Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#495057" }}>
                  14300.00 kg
                  <Typography component="span" sx={{ fontSize: "11px", color: "#28a745", ml: 1 }}>
                    (90% of max weight)
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Main Content Area with Chart and Table */}
          <Box sx={{ display: "flex", gap: 3 }}>
            
            {/* Pie Chart */}
            <Box sx={{ width: 120, height: 120, position: "relative", flexShrink: 0 }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#e9ecef"
                  strokeWidth="18"
                />
                
                {/* Big Bags - Blue */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#007bff"
                  strokeWidth="18"
                  strokeDasharray="45 237"
                  strokeDashoffset="0"
                  transform="rotate(-90 60 60)"
                />
                
                {/* Socks - Pink */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#e83e8c"
                  strokeWidth="18"
                  strokeDasharray="126 156"
                  strokeDashoffset="-45"
                  transform="rotate(-90 60 60)"
                />
                
                {/* Boxes 1 - Green */}
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="#28a745"
                  strokeWidth="18"
                  strokeDasharray="111 171"
                  strokeDashoffset="-171"
                  transform="rotate(-90 60 60)"
                />
                
                {/* Center white circle */}
                <circle cx="60" cy="60" r="27" fill="white" />
              </svg>
            </Box>

            {/* Data Table */}
            <Box sx={{ flex: 1 }}>
              {/* Table Headers */}
              <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                gap: 2,
                mb: 1,
                pb: 1,
                borderBottom: "1px solid #e9ecef"
              }}>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6c757d" }}>Name</Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6c757d", textAlign: "center" }}>Packages</Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6c757d", textAlign: "center" }}>Volume</Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6c757d", textAlign: "center" }}>Weight</Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6c757d", textAlign: "center" }}></Typography>
              </Box>

              {/* Table Rows */}
              {[
                { name: "Big Bags", packages: 16, volume: "10.00 m³", weight: "105.00 kg", color: "#007bff", icon: "📦" },
                { name: "Socks", packages: 100, volume: "4.060 m³", weight: "105.00 kg", color: "#e83e8c", icon: "🧦" },
                { name: "Boxes 1", packages: 80, volume: "4.060 m³", weight: "109.00 kg", color: "#28a745", icon: "📦" }
              ].map((item, index) => (
                <Box key={index} sx={{ 
                  display: "grid", 
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: 2,
                  py: 1,
                  alignItems: "center",
                  "&:hover": { bgcolor: "#f8f9fa" }
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ 
                      width: 12, 
                      height: 12, 
                      borderRadius: "50%", 
                      bgcolor: item.color 
                    }} />
                    <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#495057" }}>
                      {item.name}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: "11px", color: "#6c757d" }}>{item.icon}</Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#495057" }}>
                      {item.packages}
                    </Typography>
                  </Box>
                  
                  <Typography sx={{ fontSize: "12px", color: "#495057", textAlign: "center" }}>
                    {item.volume}
                  </Typography>
                  
                  <Typography sx={{ fontSize: "12px", color: "#495057", textAlign: "center" }}>
                    {item.weight}
                  </Typography>
                  
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: "11px", color: "#6c757d" }}>📊</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 4, pt: 3, borderTop: "1px solid #e9ecef" }}>
        <Button 
          variant="outlined" 
          onClick={onBack} 
          sx={{ 
            minWidth: "100px", 
            borderRadius: "8px", 
            borderColor: "#ff8144",
            color: "#ff8144", 
            bgcolor: "#fff",
            fontSize: "14px", 
            fontWeight: 500, 
            textTransform: "none", 
            height: 36,
            px: 3,
            "&:hover": { 
              borderColor: "#ff8144", 
              bgcolor: "#fff5f2" 
            } 
          }}
        >
          Back
        </Button>
        
        <Button 
          variant="contained" 
          sx={{ 
            minWidth: "100px", 
            borderRadius: "8px", 
            bgcolor: "#ff8144", 
            color: "#fff", 
            fontSize: "14px", 
            fontWeight: 500, 
            textTransform: "none", 
            height: 36,
            px: 3,
            boxShadow: "none", 
            "&:hover": { 
              bgcolor: "#e55a2b",
              boxShadow: "none"
            } 
          }}
        >
          Create as PDF
        </Button>
        
        <Button 
          variant="contained" 
          sx={{ 
            minWidth: "100px", 
            borderRadius: "8px", 
            bgcolor: "#ff8144", 
            color: "#fff", 
            fontSize: "14px", 
            fontWeight: 500, 
            textTransform: "none", 
            height: 36,
            px: 3,
            boxShadow: "none", 
            "&:hover": { 
              bgcolor: "#e55a2b",
              boxShadow: "none"
            } 
          }}
        >
          Copy Result
        </Button>
      </Box>
    </Box>
  );
};

