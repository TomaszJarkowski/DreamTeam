import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';

const authPages = [
    {
        name: 'Home',
        path: '/home'
    },
    {
        name: 'Folders',
        path: '/folders'
    }
];

const unAuthPages = [
    {
        name: 'Login',
        path: '/login'
    },
    {
        name: 'Register',
        path: '/register'
    }
];

export const Nav = () => {
    const { userData } = useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        localStorage.clear();

        navigate(`../login`);
        window.location.reload();
        handleCloseUserMenu();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const moveTo = (path: string) => {
        navigate(`../${path}`, { replace: true });
    };

    const pages = userData.isAuth ? authPages : unAuthPages;

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        DreamTeam
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.name}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        moveTo(page.path);
                                    }}>
                                    <Typography textAlign='center'>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        DreamTeam
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                variant='outlined'
                                key={page.name}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    moveTo(page.path);
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {userData.isAuth && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                                <IconButton onClick={handleOpenUserMenu}>
                                    <AccountCircleIcon
                                        style={{ fontSize: '35px', color: 'white' }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}>
                                {userData.isAuth && (
                                    <Typography mr={2} p={2}>
                                        {userData.user.email}
                                    </Typography>
                                )}
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center'>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign='center'>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
