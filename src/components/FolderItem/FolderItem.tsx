import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Badge } from '@mui/material';
import { ChangeNameModal } from '../Modals/ChangeNameModal';
import { DeleteModal } from '../Modals/DeleteModal';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(2),
    marginTop: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.palette.text.secondary
}));

const Buttons = styled(ButtonGroup)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const FolderItem: React.FC<any> = ({ children, id, getData, shared }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`../folders/${id}`, { replace: true });
    };

    return (
        <Grid item xs={4}>
            {shared ? (
                <Item onClick={handleClick}>
                    <Badge badgeContent={'Shared'} color='primary'>
                        <FolderIcon style={{ fontSize: '85px' }} />
                    </Badge>
                    <Typography variant='h6' gutterBottom component='div' mb='0px' ml='10px'>
                        {children}
                    </Typography>
                </Item>
            ) : (
                <Item onClick={handleClick}>
                    <FolderIcon style={{ fontSize: '85px' }} />
                    <Typography variant='h6' gutterBottom component='div' mb='0px' ml='10px'>
                        {children}
                    </Typography>
                </Item>
            )}
            <Buttons size='small' variant='text' aria-label='outlined primary button group'>
                <ChangeNameModal getData={getData} id={id}>
                    {children}
                </ChangeNameModal>
                <DeleteModal getData={getData} id={id}/>
            </Buttons>
        </Grid>
    );
};
