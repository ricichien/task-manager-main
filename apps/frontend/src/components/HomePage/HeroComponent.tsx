import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { Box, Button, Typography, useTheme } from '@mui/material';
import buildingSunset from '../../assets/building-sunset.jpg';

const HeroComponent = () => {
  const { theme } = useContext(ThemeContext);
  const muiTheme = useTheme();

  return (
    <Box
      component="section"
      role="banner"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 3,
        py: { xs: 8, md: 12 },
        transition: 'background-color 0.4s ease'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          maxWidth: 960,
          width: '100%',
          // boxShadow: muiTheme.shadows[3],
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor:
            theme === 'dark'
              ? 'rgba(29, 30, 32, 0.9)'
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          transition: 'all 0.4s ease'
        }}
      >
        <Box
          sx={{
            p: { xs: 4, sm: 6 },
            width: { xs: '100%', md: '55%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.75rem', md: '3rem' },
              fontWeight: 700,
              color: theme === 'dark' ? '#f1f5f9' : '#1e293b',
              mb: 3,
              lineHeight: 1.2,
              textShadow:
                theme === 'dark'
                  ? '0 2px 8px rgba(0,0,0,0.8)'
                  : '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            Organize Your Tasks Efficiently
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              color: theme === 'dark' ? '#cbd5e1' : '#475569',
              mb: 5,
              lineHeight: 1.5,
              textShadow:
                theme === 'dark'
                  ? '0 1px 4px rgba(0,0,0,0.5)'
                  : 'none'
            }}
          >
            Keep your productivity high by managing all your tasks in
            one place — clean, fast and accessible anywhere.
          </Typography>

          <Button
            href="/register"
            variant="contained"
            size="large"
            sx={{
              alignSelf: { xs: 'center', md: 'flex-start' },
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              background:
                'linear-gradient(to right, rgb(215, 241, 99), rgb(72, 236, 228))',
              boxShadow: muiTheme.shadows[0],
              transition: 'all 0.35s ease',
              '&:hover': {
                background:
                  'linear-gradient(to right, rgb(195, 229, 70), rgb(39, 219, 195))',
                transform: 'scale(1.03)'
              },
              '&:focus-visible': {
                outline: '3px solid #9be7ff',
                outlineOffset: 2
              }
            }}
          >
            Register / Get Started
          </Button>
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '45%' },
            height: { xs: 220, md: 'auto' },
            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src={buildingSunset}
            alt="Sunset Building"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: theme === 'dark' ? 'brightness(0.65)' : 'none',
              transition: 'filter 0.4s ease'
            }}
          />
          {theme === 'dark' && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%)'
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HeroComponent;
