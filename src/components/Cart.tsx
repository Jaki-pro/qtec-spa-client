import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar, 
  Stack,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onRemove?: (id: number) => void;
  onQuantityChange?: (id: number, newQty: number) => void;
  onCheckoutClick?: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onQuantityChange, onCheckoutClick }) => {
  const theme = useTheme();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        my: 2,
        p: { xs: 1, sm: 2 },
        minWidth: { xs: 280, sm: 340 },
      }}
    >
      <Paper elevation={4} sx={{ borderRadius: 3, p: { xs: 2, sm: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <ShoppingCartCheckoutIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight={700} letterSpacing={1}>
            Your Cart
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {cartItems.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            Your cart is empty.
          </Typography>
        ) : (
          <List disablePadding>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                alignItems="flex-start"
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 2,
                  p: 1.5,
                  transition: 'box-shadow 0.2s',
                  ':hover': { boxShadow: 6, bgcolor: theme.palette.action.hover },
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                }}
                secondaryAction={onRemove && (
                  <IconButton edge="end" aria-label="remove from cart" color="error" onClick={() => onRemove(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              >
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    variant="rounded"
                    sx={{ width: 64, height: 64, mr: 2, borderRadius: 2, boxShadow: 1 }}
                  />
                </ListItemAvatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="primary" fontWeight={600} sx={{ mt: 0.5 }}>
                    ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  {onQuantityChange && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        aria-label="decrease quantity"
                        onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', mr: 1 }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2" sx={{ mx: 1, minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        aria-label="increase quantity"
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', ml: 1 }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        <Divider sx={{ my: 2 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Total Items:
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700}>
            {totalCount}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={700}>
            Total:
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700}>
            ${total.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, fontSize: '1rem', boxShadow: 2, transition: 'all 0.2s', ':hover': { boxShadow: 4 } }}
          disabled={cartItems.length === 0}
          onClick={onCheckoutClick}
        >
          Proceed to Checkout
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
