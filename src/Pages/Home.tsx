import { Container, Stack } from '@mui/material';
import welcomeSVG from '../img/welcome.svg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`../folders`);
    };

    return (
        <Container maxWidth='xl'>
            <Stack sx={{ bgcolor: '#f5f6f7', color: '#666666' }} padding={5}>
                <Button
                    sx={{ m: '0px auto 40px', width: '200px' }}
                    onClick={handleClick}
                    variant='contained'>
                    Folders
                </Button>
                <img
                    style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                    alt='page welcome svg'
                    src={welcomeSVG}
                />
            </Stack>
        </Container>
    );
};
