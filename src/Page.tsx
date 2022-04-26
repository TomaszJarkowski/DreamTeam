import { Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import { Home } from './Pages/Home';
import { Folders } from './Pages/Folders';
import { SignIn } from './Pages/Login';
import { PageNotFound } from './Pages/404';
import { SignUp } from './Pages/Register';
import UserContext from './context/UserContext';

export const Page = () => {
    const { userData } = useContext(UserContext);

    return userData.isAuth ? (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/folders' element={<Folders />} />
            <Route path='/folders/:id' element={<Folders />} />
            <Route path='/*' element={<PageNotFound />} />
        </Routes>
    ) : (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/*' element={<PageNotFound />} />
        </Routes>
    );
};
