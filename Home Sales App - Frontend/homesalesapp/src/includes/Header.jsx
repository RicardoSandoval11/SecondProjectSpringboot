import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthStore } from '../hooks/useAuthStore';
import { useMessageStore } from '../hooks/useMessageStore';
import { Link as RouterLink } from 'react-router-dom';

export const Header = () => {

  const { status } = useSelector( state => state.auth );

  const { numberOfMessages } = useSelector( state => state.messages );

  const navigate = useNavigate();

  /* Authentication */
  const { startLogout } = useAuthStore();


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  const isMenuOpen = Boolean(anchorEl);

  React.useEffect(() => {
  
    if (screenWidth > 890) {
      setMobileMenuOpen(false);
    }
  }, [screenWidth]);
  
  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const redirectDashboard = () => {
    navigate('/user/dashboard');
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    setMobileMenuOpen(true);
  };

  // Authenticated users
  const redirectMyMessages = () => {
    navigate('/messages/my-messages');
  }

  // Authentication
  const redirectLogin = () => {
    navigate('/auth/login');
  }

  const redirectCreateAccount = () => {
    navigate('/auth/register');
  }

  const redirectHome = () => {
    navigate('/');

  }

  const onLogout = () => {
    startLogout();
    navigate('/');
  }

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <>
      {
        status == 'authenticated' ? 
              <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
            <MenuItem onClick={redirectMyMessages}>
              <IconButton 
                size="large" 
                aria-label="show 4 new mails" 
                color="inherit"
              >
                <Badge badgeContent={numberOfMessages} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <p>Messages</p>
            </MenuItem>
            <MenuItem onClick={redirectDashboard}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <IconButton
                size="large"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
              <p>Logout</p>
            </MenuItem>
          </Menu>
        :
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
            <MenuItem onClick={redirectCreateAccount}>
              <IconButton
                size="large"
                color="inherit"
              >
                  <AccountCircle />
              </IconButton>
              <p>Create Account</p>
            </MenuItem>
            <MenuItem onClick={redirectLogin}>
              <IconButton size="large" color="inherit">
                  <LoginIcon />
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </Menu>
      }
    </>
    
  );

  return (
    <Box sx={{ flexGrow: 1, width:'100%' }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={redirectHome}
            sx={{ display: { xs: 'block', sm: 'none', color:'white' }, mr: 2, color:'white' }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'white' } }}
          >
            <RouterLink to={'/'} style={{ textDecoration: 'none', color: 'white'}}>
                Property Sales App
            </RouterLink>  
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {
            status == 'authenticated'?
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton 
                  size="large" 
                  aria-label="show 4 new mails" 
                  color="inherit"
                  onClick={redirectMyMessages}
                >
                    <Badge badgeContent={numberOfMessages} color="error">
                      <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={redirectDashboard}
                  >
                    <AccountCircle />
                </IconButton>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={onLogout}
                >
                    <LogoutIcon />
                </IconButton>
              </Box>
            :
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={redirectCreateAccount}
                >
                  <AccountCircle />
                </IconButton>
                <IconButton size="large" color="inherit" onClick={redirectLogin}>
                  <LoginIcon />
                </IconButton>
              </Box>
          }
          {/* MOBILE MENU */}
          <Box sx={{ display: { xs: 'flex', md: 'none', color:'white' } }} id='more-icon'>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}