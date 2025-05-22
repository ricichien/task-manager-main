import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Paper,
  CssBaseline,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContextProvider';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(3, 'Password must have min 3 characters')
});

type formType = z.infer<typeof formSchema>;

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(false);
      setErrorText('');
      setSubmitting(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_LOGIN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        }
      );

      if (response.ok) {
        const body = await response.json();
        setToken(body.access_token, body.refresh_token);
        navigate('/dashboard');
      } else {
        const body = await response.json();
        setError(true);
        setErrorText(body.error ?? 'An unexpected error occurred');
      }
    } catch (error) {
      setError(true);
      setErrorText('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '90vh',
          // bgcolor: '#f5f5f5',
          // bgcolor: theme.palette.background.paper,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            boxShadow: '0',
            background: theme.palette.background.paper
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
              background:
                'linear-gradient(to right, rgb(215, 241, 99), rgb(72, 236, 228))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <FormControl
                variant="outlined"
                fullWidth
                error={Boolean(errors.email)}
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email"
                      autoComplete="email"
                      disabled={submitting}
                    />
                  )}
                />
                <FormHelperText>
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>

              <FormControl
                variant="outlined"
                fullWidth
                error={Boolean(errors.password)}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      autoComplete="current-password"
                      disabled={submitting}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={submitting}
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                <FormHelperText>
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>

              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{ textAlign: 'center', mb: 1 }}
                >
                  {errorText}
                </Typography>
              )}

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                loading={submitting}
                loadingPosition="end"
                endIcon={<SendIcon />}
                sx={{
                  borderRadius: 2,
                  background:
                    'linear-gradient(to right, rgb(215, 241, 99), rgb(72, 236, 228))',
                  boxShadow: theme.shadows[0],
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    background:
                      'linear-gradient(to right, rgb(195, 229, 70), rgb(39, 219, 195))',
                    transform: 'scale(1.03)'
                  }
                }}
                fullWidth
              >
                Login
              </LoadingButton>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;
