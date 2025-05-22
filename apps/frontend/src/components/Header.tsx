import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContextProvider';
import {
  Box,
  Link,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Button
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { accessToken, clearToken } = useAuth();
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<{ sub?: string }>(accessToken);
        if (typeof decoded.sub === 'string') {
          setUserId(decoded.sub);
        }
      } catch {
        setUserId(undefined);
      }
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_LOGOUT}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken
          }
        }
      );

      clearToken();
      navigate('/');
      if (!response.ok) {
        const body = await response.json();
        toast.error(body.message);
      }
    } catch (error) {
      clearToken();
      navigate('/');
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <Box
      component="header"
      sx={{
        px: 3,
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        // bgcolor: 'background.paper',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Link
          color="inherit"
          underline="none"
          href={accessToken ? '/dashboard' : '/'}
        >
          <HomeIcon
            sx={{
              fontSize: 32,
              display: { xs: 'none', sm: 'block' }
            }}
          />
        </Link>

        <Stack
          direction="row"
          spacing={1.5}
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
        >
          {!accessToken && (
            <>
              <Button
                href="/login"
                variant="contained"
                size="medium"
                sx={{
                  borderRadius: 30,
                  bgcolor: theme === 'light' ? 'black' : 'white',
                  color: theme === 'light' ? 'white' : 'black',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: theme === 'light' ? '#222' : '#eee'
                  }
                }}
              >
                Login
              </Button>
              <Button
                href="/register"
                variant="contained"
                size="medium"
                sx={{
                  borderRadius: 30,
                  bgcolor: theme === 'light' ? 'black' : 'white',
                  color: theme === 'light' ? 'white' : 'black',
                  textTransform: 'none',
                  ml: 1,
                  '&:hover': {
                    bgcolor: theme === 'light' ? '#222' : '#eee'
                  }
                }}
              >
                Sign up
              </Button>
            </>
          )}

          {accessToken && (
            <Tooltip title="Settings">
              <IconButton
                href={`/profile/${userId}`}
                aria-label="profile"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          )}

          {!accessToken && (
            <Tooltip title="Login">
              <IconButton href="/login" aria-label="login">
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}

          {accessToken && (
            <Tooltip title="Logout">
              <IconButton aria-label="logout" onClick={logout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Toggle Theme">
            <IconButton
              aria-label="toggle theme"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
