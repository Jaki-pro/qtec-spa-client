import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
    themeName: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    cartCount: number;
    onCartClick: () => void;
}
 

const Navbar: React.FC<NavbarProps> = ({ themeName, setTheme, cartCount, onCartClick }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev);
    };

    const drawer = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={handleDrawerToggle}
            onKeyDown={handleDrawerToggle}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={RouterLink} to="/" aria-label="Home">
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={onCartClick} aria-label="Cart">
                        <ListItemIcon>
                            <Badge badgeContent={cartCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary="Cart" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );

    return (
        <AppBar position="static" color="primary" elevation={2}>
            <Toolbar>
                {/* Logo/Title */}
                <Typography
                    variant="h6"
                    noWrap
                    component={RouterLink}
                    to="/"
                    sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        flexGrow: 1,
                        fontWeight: 700,
                        letterSpacing: 1,
                    }}
                >
                    Qtec Shop
                </Typography>
                {/* Desktop Links */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <IconButton
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            aria-label="Home"
                            size="large"
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label={themeName === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            onClick={() => setTheme(themeName === 'dark' ? 'light' : 'dark')}
                            size="large"
                        >
                            {themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                onClick={onCartClick}
                                size="large"
                                aria-label="show cart items"
                                color="inherit"
                            >
                                <Badge badgeContent={cartCount} color="error" aria-label={`Cart with ${cartCount} items`}>
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Box>
                )}
                {/* Mobile Hamburger Icon Only */}
                {isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            color="inherit"
                            aria-label={themeName === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            onClick={() => setTheme(themeName === 'dark' ? 'light' : 'dark')}
                            size="large"
                        >
                            {themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="open navigation menu"
                            onClick={handleDrawerToggle}
                            size="large"
                            sx={{ ml: 1 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    aria-label="mobile navigation menu"
                >
                    {drawer}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
