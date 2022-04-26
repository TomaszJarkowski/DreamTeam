import { FC, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import UserContext from '../../context/UserContext';
import { FOLDER_API_URL } from '../../api/apiAddresses';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

interface CreateFolderModalProps {
    getData: () => void;
    id: string;
}

type TInputCreateFolder = {
    folderName: string;
};

const schema = yup.object().shape({
    folderName: yup.string().min(3).max(15).required()
});

export const CreateFolderModal: FC<CreateFolderModalProps> = ({ getData, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { userData } = useContext(UserContext);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            folderName: ''
        }
    });

    const onSubmit = async (data: TInputCreateFolder) => {
        setIsLoading(true);

        try {
            await fetch(`${FOLDER_API_URL}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify({
                    name: data.folderName
                })
            });

            getData();
            toast.success('You have created a new folder!');
        } catch (e) {
            toast.error('Something went wrong while creating the folder!');
            console.error(e);
        }

        setIsLoading(false);
        handleClose();
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpen} key='createButton'>
                <CreateNewFolderIcon style={{ marginRight: '10px' }} />
                Create new folder
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Create new folder
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                {...register('folderName')}
                                required
                                fullWidth
                                id='folderName'
                                label='Folder Name'
                                name='folderName'
                                autoComplete='family-name'
                            />
                        </Grid>
                        {errors.folderName && (
                            <Typography color='error' variant='body2'>
                                {errors.folderName.message}
                            </Typography>
                        )}
                        {isLoading ? (
                            <LoadingButton
                                fullWidth
                                loading
                                variant='outlined'
                                sx={{ mt: 3, mb: 2 }}>
                                Create
                            </LoadingButton>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Create
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
