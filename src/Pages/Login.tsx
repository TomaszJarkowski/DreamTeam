import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN_API_URL } from '../api/apiAddresses';

const theme = createTheme();

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(15).required()
});

type TData = {
    email: string;
    password: string;
};

export const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: TData) => {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        try {
            const response = await axios.post(LOGIN_API_URL, {
                email: data.email,
                password: data.password
            });

            localStorage.setItem('auth-token', response.data.access_token);

            setUserData({
                token: response.data.access_token,
                isAuth: true,
                user: {
                    email: response.data.email
                }
            });

            toast.success('Congratulations you have logged in correctly!', {
                pauseOnHover: false
            });
            navigate(`../folders`, { replace: true });
        } catch (err: any) {
            setIsError(true);

            if (err.response.data.detail) {
                setErrorMessage(err.response.data.detail);
            } else {
                setErrorMessage(err.message);
            }
        }

        setIsLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        sx={{ mt: 1 }}>
                        <TextField
                            {...register('email')}
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            color={!errors.email ? 'success' : 'error'}
                        />
                        <TextField
                            {...register('password')}
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            color={!errors.password ? 'success' : 'error'}
                        />
                        {errors.email && (
                            <Typography color='error' variant='body2'>
                                {errors.email.message}
                            </Typography>
                        )}
                        {errors.password && (
                            <Typography color='error' variant='body2'>
                                {errors.password.message}
                            </Typography>
                        )}
                        <FormControlLabel
                            control={<Checkbox value='remember' color='primary' />}
                            label='Remember me'
                        />
                        {isLoading ? (
                            <LoadingButton
                                fullWidth
                                loading
                                variant='outlined'
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </LoadingButton>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                        )}
                        {isError && (
                            <Typography color='error' variant='body2' sx={{ textAlign: 'center' }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Grid container>
                            <Grid container justifyContent='flex-end'>
                                <Grid item>
                                    <Link href='register' variant='body2'>
                                        Don't have an account? Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
