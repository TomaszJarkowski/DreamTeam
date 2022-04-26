import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { Box, Modal } from '@mui/material';
import { FOLDER_API_URL } from '../../api/apiAddresses';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

interface DeleteModalProps {
    id: string;
    getData: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};

export const DeleteModal: FC<DeleteModalProps> = ({ id, getData }) => {
    const { userData } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(`${FOLDER_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                }
            });

            if(res.ok) {
                getData();
                toast.success('You have deleted correctly!');
            } else {
                const resJSON = await res.json();
                toast.error(resJSON.detail);
            }
        } catch (e) {
            toast.error('Something went wrong while deleting!');
            console.error(e);
        }

        setIsLoading(false);
        handleClose();
    };

    return (
        <Button>
            <DeleteIcon onClick={handleOpen} style={{ color: '#666666' }} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Are you sure you want to delete this folder?
                    </Typography>
                    <Box display='flex' justifyContent='center' m={2}>
                        <Button
                            variant='contained'
                            style={{ margin: '0 10px' }}
                            onClick={handleClose}>
                            No
                        </Button>
                        {isLoading ? (
                            <LoadingButton loading variant='outlined' style={{ margin: '0 10px' }}>
                                Yes
                            </LoadingButton>
                        ) : (
                            <Button
                                variant='outlined'
                                style={{ margin: '0 10px' }}
                                onClick={handleDelete}>
                                Yes
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Button>
    );
};
