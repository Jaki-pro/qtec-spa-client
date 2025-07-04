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
    name: "Gaming Graphics Card",
    price: 399.99,
    description: "NVIDIA RTX 3060 with 12GB GDDR6 memory, perfect for 1080p and 1440p gaming.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    category: "Graphics Card",
    rating: 4.7,
    inStock: true
  },
  {
    id: 2,
    name: "UltraWide Monitor",
    price: 299.99,
    description: "34-inch curved UltraWide monitor, 144Hz refresh rate, immersive experience.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "Monitor",
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with blue switches for tactile feedback.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    category: "Keyboard",
    rating: 4.6,
    inStock: true
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    description: "High-precision wireless mouse with customizable DPI and RGB lighting.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "Mouse",
    rating: 4.4,
    inStock: true
  },
  {
    id: 5,
    name: "Gaming Headset",
    price: 89.99,
    description: "Surround sound gaming headset with noise-cancelling microphone.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    category: "Headset",
    rating: 4.3,
    inStock: true
  },
  {
    id: 6,
    name: "High-Speed SSD",
    price: 149.99,
    description: "1TB NVMe SSD for ultra-fast game loading and file transfers.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "Storage",
    rating: 4.8,
    inStock: true
  },
  {
    id: 7,
    name: "Gaming Chair",
    price: 199.99,
    description: "Ergonomic gaming chair with adjustable armrests and lumbar support.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "Chair",
    rating: 4.2,
    inStock: true
  },
  {
    id: 8,
    name: "4K Streaming Webcam",
    price: 99.99,
    description: "Ultra HD webcam for streaming and video calls with built-in microphone.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Webcam",
    rating: 4.1,
    inStock: true
  },
  {
    id: 9,
    name: "RGB Mouse Pad",
    price: 39.99,
    description: "Large RGB mouse pad with customizable lighting effects.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    category: "Mouse Pad",
    rating: 4.5,
    inStock: true
  },
  {
    id: 10,
    name: "Gaming Microphone",
    price: 59.99,
    description: "USB condenser microphone for clear voice chat and streaming.",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80",
    category: "Microphone",
    rating: 4.6,
    inStock: true
  },
  {
    id: 11,
    name: "PC Cooling Fan",
    price: 24.99,
    description: "120mm RGB cooling fan for optimal airflow and aesthetics.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Cooling",
    rating: 4.4,
    inStock: true
  },
  {
    id: 12,
    name: "Gaming Desk",
    price: 249.99,
    description: "Spacious gaming desk with cable management and LED lighting.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    category: "Desk",
    rating: 4.7,
    inStock: true
  },
  {
    id: 13,
    name: "Power Supply Unit",
    price: 109.99,
    description: "750W modular PSU with 80+ Gold efficiency for gaming PCs.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    category: "Power Supply",
    rating: 4.5,
    inStock: true
  },
  {
    id: 14,
    name: "Gaming Controller",
    price: 69.99,
    description: "Wireless controller compatible with PC and consoles.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "Controller",
    rating: 4.3,
    inStock: true
  },
  {
    id: 15,
    name: "Streaming Light",
    price: 49.99,
    description: "Adjustable LED light for professional streaming setup.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Lighting",
    rating: 4.2,
    inStock: true
  },
  {
    id: 16,
    name: "External Hard Drive",
    price: 89.99,
    description: "2TB portable hard drive for game backups and storage.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Storage",
    rating: 4.6,
    inStock: true
  },
  {
    id: 17,
    name: "WiFi 6 Gaming Router",
    price: 179.99,
    description: "High-speed WiFi 6 router for lag-free online gaming.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "Networking",
    rating: 4.7,
    inStock: true
  },
  {
    id: 18,
    name: "Capture Card",
    price: 129.99,
    description: "1080p60 capture card for streaming and recording gameplay.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    category: "Capture Card",
    rating: 4.4,
    inStock: true
  },
  {
    id: 19,
    name: "Gaming Speakers",
    price: 79.99,
    description: "2.1 channel gaming speakers with subwoofer for immersive sound.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    category: "Speakers",
    rating: 4.3,
    inStock: true
  },
  {
    id: 20,
    name: "VR Motion Controllers",
    price: 149.99,
    description: "Pair of motion controllers for VR gaming systems.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "VR",
    rating: 4.5,
    inStock: true
  }
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
