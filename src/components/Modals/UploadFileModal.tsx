import { FC, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserContext from '../../context/UserContext';
import { TextField } from '@mui/material';
import { FILE_UPLOAD_API_URL } from '../../api/apiAddresses';
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

interface UploadFileModalProps {
    getData: () => void;
    id: string;
}

export const UploadFileModal: FC<UploadFileModalProps> = ({ getData, id }) => {
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => setOpenUploadModal(false);
    const [selectedFile, setSelectedFile] = useState<any>();
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitUploadModal = async (event: any) => {
        setIsLoading(true);
        event.preventDefault();
        let formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await fetch(`${FILE_UPLOAD_API_URL}/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userData.token}`
                },
                body: formData
            });

            getData();
            toast.success('You have uploaded a new file!');
        } catch (e) {
            toast.error('Something went wrong while uploading the file!');
            console.error(e);
        }

        setIsLoading(false);
        handleCloseUploadModal();
    };

    const changeHandler = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <>
            <Button variant='contained' onClick={handleOpenUploadModal} key='uploadButton'>
                <FileUploadIcon style={{ marginRight: '10px' }} />
                Upload file
            </Button>
            <Modal
                open={openUploadModal}
                onClose={handleCloseUploadModal}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Upload file
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmitUploadModal}
                        sx={{ mt: 3 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id='uploadFile'
                                name='uploadFile'
                                type='file'
                                onChange={changeHandler}
                            />
                        </Grid>
                        {isLoading ? (
                            <LoadingButton
                                fullWidth
                                loading
                                variant='outlined'
                                sx={{ mt: 3, mb: 2 }}>
                                Upload
                            </LoadingButton>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{ mt: 3, mb: 2 }}>
                                Upload
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
