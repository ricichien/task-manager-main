import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import buildingSunset from '../../assets/building-sunset.jpg';
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
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .max(10)
      .trim(),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .trim(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(3, 'Password must have min 3 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Password confirmation is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

type formType = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setError(false);
      setErrorText('');
      setSubmitting(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_REGISTER}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password
          })
        }
      );
      if (response.ok) {
        navigate('/login');
      } else {
        setSubmitting(false);
        const body = await response.json();
        if (body.error) {
          setError(true);
          setErrorText(body.error);
        } else {
          setError(true);
          setErrorText('An unexpected error occurred');
        }
      }
    } catch (error) {
      setError(true);
      setErrorText('An unexpected error occurred');
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
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        px: 2,
        backgroundColor: theme.palette.background.default
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? '100%' : 400,
          bgcolor: theme.palette.background.paper,
          boxShadow: 0,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background:
              'linear-gradient(to right, rgb(215, 241, 99), rgb(72, 236, 228))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Create your account
        </Typography>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.username}
            >
              <InputLabel htmlFor="username">Username</InputLabel>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    id="username"
                    label="Username"
                    type="text"
                    {...field}
                  />
                )}
              />
              <FormHelperText>
                {errors.username?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.email}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    id="email"
                    label="Email"
                    type="email"
                    {...field}
                  />
                )}
              />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.password}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                )}
              />
              <FormHelperText>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>

            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.confirmPassword}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                )}
              />
              <FormHelperText>
                {errors.confirmPassword?.message}
              </FormHelperText>
            </FormControl>

            {error && (
              <Typography
                color="error"
                align="center"
                sx={{ fontWeight: 'medium', mt: -1, mb: 1 }}
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
              fullWidth
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 3,
                py: 1.5,
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
            >
              REGISTER
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
