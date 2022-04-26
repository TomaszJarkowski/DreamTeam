import { Container, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import errorSVG from '../img/page-not-found.svg';

export const PageNotFound = () => (
    <Container maxWidth='xl'>
        <Stack sx={{ bgcolor: '#f5f6f7', textAlign: 'center', color: '#666666' }} padding={5}>
            <Typography variant='h4' sx={{ textAlign: 'center', m: 5, color: '#aaaaaa' }}>
                Page not found
            </Typography>
            <img
                style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                alt='page not found svg'
                src={errorSVG}
            />
        </Stack>
    </Container>
);
