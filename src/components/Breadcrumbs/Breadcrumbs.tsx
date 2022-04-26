import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { FC } from 'react';
import { useNavigate } from 'react-router';

export const BreadcrumbsElement: FC<any> = ({ data }) => {
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate(`../folders/${id}`, { replace: true });
    };

    if (!data) {
        return <p>Error</p>;
    }

    return (
        <Breadcrumbs aria-label='breadcrumb'>
            {data.parents.map((el: any) => (
                <Link
                    key={el.id}
                    underline='hover'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClick(el.id)}
                    color='inherit'>
                    {el.name}
                </Link>
            ))}
            <Link color='text.primary' aria-current='page'>
                {data.name}
            </Link>
        </Breadcrumbs>
    );
};
