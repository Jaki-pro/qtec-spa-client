import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	category: string;
	rating: number;
	inStock: boolean;
}

interface ProductGridProps {
	products: Product[];
	onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
		const navigate = useNavigate();
	return (
		<Box sx={{ width: '100%', mt: 4 }}>
			<Grid
				container
				spacing={3}
				justifyContent="center"
				alignItems="flex-start"
				sx={{ flexWrap: 'wrap' }}
			>
				{products.map((product) => (
					<Box key={product.id} sx={{ width: 200, display: 'flex' }}>
						<Card
							sx={{ width: 200, display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
							onClick={e => {
								// Prevent click if Add to Cart button is clicked
								if ((e.target as HTMLElement).closest('button')) return;
								navigate(`/product/${product.id}`);
							}}
							tabIndex={0}
							aria-label={`View details for ${product.name}`}
							onKeyDown={e => {
								if (e.key === 'Enter' || e.key === ' ') {
									navigate(`/product/${product.id}`);
								}
							}}
						>
							<CardMedia
								component="img"
								height="140"
								image={product.image}
								alt={product.name}
								sx={{ objectFit: 'cover' }}
							/>
							<CardContent>
								<Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
									{product.name}
								</Typography>
								<Typography variant="body2" color="text.secondary" gutterBottom>
									${product.price.toFixed(2)}
								</Typography>
								<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
									{product.description}
								</Typography>
								<Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
									Category: {product.category}
								</Typography>
								<Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
									Rating: {product.rating} ★
								</Typography>
								<Typography variant="caption" color={product.inStock ? 'success.main' : 'error.main'} sx={{ display: 'block', mb: 1 }}>
									{product.inStock ? 'In Stock' : 'Out of Stock'}
								</Typography>
								<Button
									variant="contained"
									color="primary"
									fullWidth
									onClick={e => {
										e.stopPropagation();
										onAddToCart(product);
									}}
									aria-label={`Add ${product.name} to cart`}
									sx={{ mt: 1, fontWeight: 600 }}
									disabled={!product.inStock}
								>
									Add to Cart
								</Button>
							</CardContent>
						</Card>
					</Box>
				))}
			</Grid>
		</Box>
	);
};

export default ProductGrid;
