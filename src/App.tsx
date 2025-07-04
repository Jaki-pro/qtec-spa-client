import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ProductGrid from './components/ProductGrid';
import type { Product } from './components/ProductGrid';
import Cart from './components/Cart';
import type { CartItem } from './components/Cart';
import ProductDetail from './pages/ProductDetail';
import CheckoutModal from './components/CheckoutModal';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './ui/theme';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'High-quality wireless headphones with noise cancellation.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Track your fitness and notifications on the go.',
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Portable speaker with deep bass and long battery life.',
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
    description: 'Monitor your health and activity 24/7.',
  },
  {
    id: 5,
    name: 'Portable Charger',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
    description: 'Charge your devices anywhere, anytime.',
  },
  {
    id: 6,
    name: 'VR Headset',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Experience immersive virtual reality games and apps.',
  },
  {
    id: 7,
    name: 'Gaming Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    description: 'Precision mouse for gaming and productivity.',
  },
  {
    id: 8,
    name: 'Mechanical Keyboard',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    description: 'Tactile mechanical keyboard with RGB lighting.',
  },
  {
    id: 9,
    name: 'Smart Light Bulb',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Control your lighting from your phone.',
  },
  {
    id: 10,
    name: 'Noise Cancelling Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=400&q=80',
    description: 'Enjoy music with active noise cancellation.',
  },
];

function getCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem('cart');
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    setCartItems(getCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);
  console.log(theme);

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id === id) {
          if (newQty < 1) return [];
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  ;
  return (
    <ThemeProvider  theme={theme==='dark'?darkTheme:lightTheme}>
      <Navbar themeName={theme} setTheme={setTheme} cartCount={cartCount} onCartClick={handleCartOpen} />
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={handleCartClose}
        ModalProps={{ keepMounted: true }}
        aria-label="cart drawer"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
      >
        <Box sx={{ width: { xs: 340, sm: 400 }, maxWidth: '100vw' }} role="presentation">
          <Cart
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleQuantityChange}
            onCheckoutClick={() => setCheckoutOpen(true)}
          />
        </Box>
      </Drawer>
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onCheckout={handleCheckout}
      />
      <Routes>
        <Route path="/" element={
          <>
            <ProductGrid products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
