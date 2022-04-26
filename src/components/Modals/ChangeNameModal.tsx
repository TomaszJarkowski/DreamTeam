import { FC, useContext, useState } from 'react';
import { FOLDER_API_URL } from '../../api/apiAddresses';
import UserContext from '../../context/UserContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import { Box, Modal, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

interface ChangeNameModalProps {
    id: string;
    getData: () => void;
    children: ChildNode;
    isFile?: boolean;
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

export const ChangeNameModal: FC<ChangeNameModalProps> = ({ id, getData, children, isFile }) => {
    const [openChangeNameModal, setChangeNameModal] = useState(false);
    const handleOpenChangeNameModal = () => setChangeNameModal(true);
    const handleCloseChangeNameModal = () => setChangeNameModal(false);
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setIsLoading(true);

        try {
            await fetch(`${FOLDER_API_URL}/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    name: data.get('newFolderName')
                })
            });

            getData();
            toast.success('You have changed name!');
        } catch (e) {
            toast.error('Something went wrong while changing name!');
            console.error(e);
        }

        setIsLoading(false);
        handleCloseChangeNameModal();
    };

    return (
        <Button style={{ borderColor: '#666666' }}>
            <CreateIcon onClick={handleOpenChangeNameModal} style={{ color: '#666666' }} />
            <Modal
                open={openChangeNameModal}
                onClose={handleCloseChangeNameModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Rename the folder
                    </Typography>
                    <Typography id='modal-modal-title' variant='body2' component='h2'>
                        The current name of the folder is <b>{children}</b>
                    </Typography>
                    {isFile && (
                        <Typography
                            color='error'
                            id='modal-modal-title'
                            variant='body2'
                            component='h2'>
                            When changing the name, remember to add the appropriate extension, as it
                            was originally.
                        </Typography>
                    )}
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid item>
                            <TextField
                                required
                                fullWidth
                                id='newFolderName'
                                label='New Folder Name'
                                name='newFolderName'
                                autoComplete='family-name'
                            />
                        </Grid>
                        {isLoading ? (
                            <LoadingButton
                                fullWidth
                                loading
                                variant='outlined'
                                sx={{ mt: 3, mb: 2 }}>
                                Rename
                            </LoadingButton>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Rename
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Button>
    );
};
