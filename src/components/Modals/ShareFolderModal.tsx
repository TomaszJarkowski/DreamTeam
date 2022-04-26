import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { FC, useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import { useParams } from 'react-router';
import ShareIcon from '@mui/icons-material/Share';
import { ALL_USERS_API_URL, SHARE_FOLDER_API_URL } from '../../api/apiAddresses';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

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

export const ShareFolderModal: FC = () => {
    const [users, setUsers] = useState([]);
    const { userData } = useContext(UserContext);
    const [openShareModal, setOpenShareModal] = useState(false);
    const routeParams = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenShareModal = async () => {
        if (!users.length) {
            try {
                const response = await fetch(ALL_USERS_API_URL, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                });
                const res = await response.json();

                setUsers(res);
                setOpenShareModal(true);
            } catch (e) {
                toast.error('Something went wrong while downloading users!');
                console.error(e);
            }
        } else {
            setOpenShareModal(true);
        }
    };

    const handleShareFolder = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            await fetch(SHARE_FOLDER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    shared_folder_id: routeParams.id,
                    shared_person_id: data.get('shareFolder')
                })
            });

            toast.success('You have shared the folder!');
        } catch (e) {
            toast.error('Something went wrong while sharing the folder!');
            console.error(e);
        }

        setIsLoading(false);
        handleCloseShareModal();
    };

    const handleCloseShareModal = () => setOpenShareModal(false);

    return (
        <>
            <Button variant='contained' onClick={handleOpenShareModal} key='shareButton'>
                <ShareIcon style={{ marginRight: '10px' }} />
                Share folder
            </Button>
            <Modal
                open={openShareModal}
                onClose={handleCloseShareModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Share folder
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleShareFolder} sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <InputLabel id='shareFolder'>User</InputLabel>
                            <Select
                                labelId='shareFolder'
                                id='shareFolder'
                                name='shareFolder'
                                fullWidth>
                                {users.map((el: any) => (
                                    <MenuItem key={el.id} value={el.id}>
                                        {el.email}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {isLoading ? (
                            <LoadingButton
                                fullWidth
                                loading
                                variant='outlined'
                                sx={{ mt: 3, mb: 2 }}>
                                Share
                            </LoadingButton>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Share
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
