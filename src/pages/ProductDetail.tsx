import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import type { Product } from '../components/ProductGrid';

interface ProductDetailProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Product not found.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', my: 4 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: { xs: 2, sm: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: '100%', maxWidth: 350, borderRadius: 2, objectFit: 'cover', mb: 2 }}
          />
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" fontWeight={700} sx={{ mb: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            sx={{ borderRadius: 2, py: 1.5, fontWeight: 600, fontSize: '1rem', boxShadow: 2, transition: 'all 0.2s', ':hover': { boxShadow: 4 } }}
          >
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetail;
