import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { BreadcrumbsElement } from '../components/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useParams } from 'react-router';
import { ShareFolderModal } from '../components/Modals/ShareFolderModal';
import { CreateFolderModal } from '../components/Modals/CreateFolderModal';
import { UploadFileModal } from '../components/Modals/UploadFileModal';
import { ListItems } from '../components/ListItems/ListItems';
import { useState } from 'react';
import { FOLDER_API_URL } from '../api/apiAddresses';
import { Alert } from '@mui/material';
import errorSVG from '../img/error.svg';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Folders = () => {
    const [data, setData] = useState<any>(null);
    const { userData } = useContext(UserContext);
    const [id, setId] = useState('');
    const [sharedFolders, setSharedFolders] = useState([]);
    const routeParams = useParams();
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [isShared, setIsShared] = useState(false);
    const [sharedUsers, setSharedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Remove any type

    // const sleep = (ms: number) => {
    //     return new Promise((resolve) => {
    //         setTimeout(resolve, ms);
    //     });
    // };

    const getData = async () => {
        setSharedFolders([]);
        setIsLoading(true);
        setIsError(false);
        // await sleep(4000);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            };
            let response;

            if (routeParams.id) {
                response = await axios.get(`${FOLDER_API_URL}/${routeParams.id}`, config);
            } else {
                response = await axios.get(FOLDER_API_URL, config);
            }

            setData(response.data);

            if (response.data.shared && response.data.shared.dirs) {
                setSharedFolders(response.data.shared.dirs);
            }

            setIsShared(response.data.is_shared);
            setSharedUsers(response.data.shared_users);
            setId(response.data.id);
            setFolders(response.data.dirs);
            setFiles(response.data.files);
        } catch (err: any) {
            setIsError(true);
            console.error(err);

            if (err.response.data.detail) {
                setErrorMessage(err.response.data.detail);
            } else {
                setErrorMessage(err.message);
            }
        }

        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, [routeParams]);

    return (
        <Container maxWidth='xl'>
            <Box sx={{ bgcolor: '#f5f6f7' }} padding={5}>
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '100px'
                        }}>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Stack>
                        <Typography
                            variant='h5'
                            sx={{ textAlign: 'center', m: 5, color: '#eb6c6c' }}>
                            {errorMessage}
                        </Typography>
                        <img
                            style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                            alt='page not found svg'
                            src={errorSVG}
                        />
                    </Stack>
                ) : (
                    <>
                        <BreadcrumbsElement data={data} />
                        <Stack
                            spacing={2}
                            mt={5}
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent='center'>
                            <CreateFolderModal id={id} getData={getData} />
                            <UploadFileModal id={id} getData={getData} />
                            <ShareFolderModal />
                        </Stack>
                        {isShared && (
                            <Alert sx={{ m: '20px 0' }} severity='info'>
                                You shared this folder with users:{' '}
                                {sharedUsers.map((el: any) => (
                                    <b key={el.id}>{el.email}</b>
                                ))}
                            </Alert>
                        )}
                        <ListItems
                            getData={getData}
                            folders={folders}
                            sharedFolders={sharedFolders}
                            files={files}
                        />
                    </>
                )}
            </Box>
        </Container>
    );
};
