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
} from "@mui/material";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { useAppStore } from "@/store/use-app-store";
import { useUpdateCartItem, useRemoveFromCart } from "@/api/handlers/cartHandler";

interface CartItem {
  product: {
    _id: string;
  };
  productName: string;
  productPrice: number;
  quantity: number;
}

interface CartItemsProps {
  cartItems: CartItem[];
}

const CartItems: React.FC<CartItemsProps> = ({ cartItems }) => {
  const { customer } = useAppStore();
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1 || !customer?.id) return;
    updateCartItemMutation.mutate({
      productId,
      data: { customerId: customer.id, quantity: newQuantity },
    });
  };

  const removeFromCart = (productId: string) => {
    if (!customer?.id) return;
    removeFromCartMutation.mutate({ customerId: customer.id, productId });
  };

  return (
    <Box sx={{ flex: 1 }}>
      {/* Cart Items Table */}
      <TableContainer sx={{ backgroundColor: "white", borderRadius: 1, mb: 3 }}>
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", py: 2, borderBottom: "1px solid rgba(234, 104, 36, 1)", backgroundColor: "transparent" }}>Item</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", py: 2, borderBottom: "1px solid rgba(234, 104, 36, 1)", backgroundColor: "transparent" }}>Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", py: 2, borderBottom: "1px solid rgba(234, 104, 36, 1)", backgroundColor: "transparent" }}>Quantity</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", py: 2, borderBottom: "1px solid rgba(234, 104, 36, 1)", backgroundColor: "transparent" }}>Subtotal</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", py: 2, borderBottom: "1px solid rgba(234, 104, 36, 1)", backgroundColor: "transparent" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.product._id}
                sx={{
                  "& td": {
                    backgroundColor: "#fafafa",
                    border: "none",
                    "&:first-of-type": { borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px" },
                    "&:last-of-type": { borderTopRightRadius: "20px", borderBottomRightRadius: "20px" },
                  },
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 60, height: 60, backgroundColor: "#ffa500", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>📦</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem", mb: 0.5 }}>{item.productName}</Typography>
                      <Typography variant="body2" sx={{ color: "#666", fontSize: "0.75rem" }}>Product ID: {item.product._id}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  <Typography sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem" }}>${item.productPrice.toFixed(2)}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      sx={{ width: 24, height: 24, border: "1px solid #ddd", borderRadius: "50%", "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <Remove sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Box sx={{ mx: 1, textAlign: "center", minWidth: 40 }}>
                      <Typography sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem" }}>{item.quantity}</Typography>
                      <Typography sx={{ color: "#4caf50", fontSize: "0.625rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>IN STOCK: 6</Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      sx={{ width: 24, height: 24, border: "1px solid #ddd", borderRadius: "50%", "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <Add sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ py: 2 }}>
                  <Typography sx={{ fontWeight: 600, color: "#333", fontSize: "0.875rem" }}>${(item.productPrice * item.quantity).toFixed(2)}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => removeFromCart(item.product._id)}
                    disabled={removeFromCartMutation.isPending}
                    sx={{ color: "#f44336", "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" } }}
                  >
                    <DeleteOutline fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CartItems;