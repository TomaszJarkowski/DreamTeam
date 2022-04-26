import { FC } from 'react';
import { Grid, Stack } from '@mui/material';
import { FolderItem } from '../FolderItem/FolderItem';
import { FileItem } from '../FileItem/FileItem';
import { Typography } from '@mui/material';
import emptySVG from '../../img/empty.svg';

interface ListItemsProps {
    getData: () => void;
    folders: any[];
    sharedFolders: any[];
    files: any[];
}

export const ListItems: FC<ListItemsProps> = ({ getData, folders, sharedFolders, files }) => {
    if (!folders.length && !sharedFolders.length && !files.length) {
        return (
            <Stack>
                <Typography variant='h4' sx={{ textAlign: 'center', m: 5, color: '#aaaaaa' }}>
                    Folder is empty
                </Typography>
                <img
                    style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                    alt='empty svg'
                    src={emptySVG}
                />
            </Stack>
        );
    }

    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
            {folders.map((el: any) => (
                <FolderItem id={el.id} getData={getData} key={el.id}>
                    {el.name}
                </FolderItem>
            ))}
            {sharedFolders.map((el: any) => (
                <FolderItem shared id={el.id} getData={getData} key={el.id}>
                    {el.name}
                </FolderItem>
            ))}
            {files.map((el: any) => (
                <FileItem id={el.id} getData={getData} key={el.id}>
                    {el.name}
                </FileItem>
            ))}
        </Grid>
    );
};
