import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { Nav } from './components/Navigation/Nav';
import { Footer } from './components/Footer/Footer';
import { Page } from './Page';
import UserContext from './context/UserContext';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { USER_API_URL } from './api/apiAddresses';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        }
    }
});

const App = () => {
    const [userData, setUserData] = useState({
        token: '',
        user: {
            email: ''
        },
        isAuth: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            setLoading(true);
            let token = localStorage.getItem('auth-token');

            if (token) {
                try {
                    const response = await fetch(USER_API_URL, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    const res = await response.json();

                    if (response.ok) {
                        setUserData({
                            token: token,
                            isAuth: true,
                            user: {
                                email: res.email
                            }
                        });
                    } else {
                        setUserData({
                            token: '',
                            isAuth: false,
                            user: {
                                email: ''
                            }
                        });
                    }
                } catch (e) {
                    console.error(e);
                    setUserData({
                        token: '',
                        isAuth: false,
                        user: {
                            email: ''
                        }
                    });
                }
            }

            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{ userData, setUserData }}>
                <ThemeProvider theme={theme}>
                    <div className='App'>
                        <ToastContainer limit={4} autoClose={3000} />
                        <Nav />
                        {loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '100px'
                                }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <Page />
                                <Footer />
                            </>
                        )}
                    </div>
                </ThemeProvider>
            </UserContext.Provider>
        </Router>
    );
};

export default App;
