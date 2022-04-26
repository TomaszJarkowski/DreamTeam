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
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { REGISTER_API_URL } from '../api/apiAddresses';

const theme = createTheme();

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(15).required()
});

type TData = {
    email: string;
    password: string;
};

export const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            await axios.post(REGISTER_API_URL, {
                email: data.email,
                password: data.password
            });

            toast.success('Congratulations, your registration was successful!', {
                pauseOnHover: false
            });
            navigate(`../login`, { replace: true });
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
                        Sign up
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    {...register('email')}
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    {...register('password')}
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value='allowExtraEmails' color='primary' />}
                                    label='I want to receive inspiration, marketing promotions and updates via email.'
                                />
                            </Grid>
                        </Grid>
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
                                Sign Up
                            </Button>
                        )}
                        {isError && (
                            <Typography color='error' variant='body2' sx={{ textAlign: 'center' }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='login' variant='body2'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
