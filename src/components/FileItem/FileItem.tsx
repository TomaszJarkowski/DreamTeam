import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import {
    AiFillFileImage,
    AiFillFilePdf,
    AiFillFileWord,
    AiFillFileMarkdown,
    AiFillFilePpt,
    AiFillFileExcel,
    AiFillFileText,
    AiFillFile
} from 'react-icons/ai';
import { DOWNLOAD_FILE_API_URL } from '../../api/apiAddresses';
import ButtonGroup from '@mui/material/ButtonGroup';
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

const FileIcon = ({ fileName }: any) => {
    const getFileExtension = () => {
        return fileName.split('.').pop();
    };

    switch (getFileExtension()) {
        case 'jpg':
            return <AiFillFileImage style={{ fontSize: '85px' }} />;
        case 'jpeg':
            return <AiFillFileImage style={{ fontSize: '85px' }} />;
        case 'png':
            return <AiFillFileImage style={{ fontSize: '85px' }} />;
        case 'pdf':
            return <AiFillFilePdf style={{ fontSize: '85px' }} />;
        case 'doc':
            return <AiFillFileWord style={{ fontSize: '85px' }} />;
        case 'docx':
            return <AiFillFileWord style={{ fontSize: '85px' }} />;
        case 'otd':
            return <AiFillFileWord style={{ fontSize: '85px' }} />;
        case 'md':
            return <AiFillFileMarkdown style={{ fontSize: '85px' }} />;
        case 'xlsx':
            return <AiFillFileExcel style={{ fontSize: '85px' }} />;
        case 'xls':
            return <AiFillFileExcel style={{ fontSize: '85px' }} />;
        case 'pptx':
            return <AiFillFilePpt style={{ fontSize: '85px' }} />;
        case 'ppt':
            return <AiFillFilePpt style={{ fontSize: '85px' }} />;
        case 'txt':
            return <AiFillFileText style={{ fontSize: '85px' }} />;
        default:
            return <AiFillFile style={{ fontSize: '85px' }} />;
    }
};

export const FileItem: React.FC<any> = ({ children, id, getData }) => {
    const { userData } = useContext(UserContext);

    const handleClick = async () => {
        const response: any = await fetch(`${DOWNLOAD_FILE_API_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userData.token}`
            }
        });

        const url = window.URL.createObjectURL(new Blob([await response.arrayBuffer()]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', children);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <Grid item xs={4}>
            <Item onClick={handleClick}>
                <FileIcon fileName={children} />
                <Typography variant='h6' gutterBottom component='div' mb='0px' ml='10px'>
                    {children}
                </Typography>
            </Item>
            <Buttons size='small' variant='text' aria-label='outlined primary button group'>
                <ChangeNameModal getData={getData} id={id} isFile>
                    {children}
                </ChangeNameModal>
                <DeleteModal getData={getData} id={id} />
            </Buttons>
        </Grid>
    );
};
