import axios from 'axios';

const fetchClient = () => {
    // Create instance
    const instance = axios.create({
        baseURL: 'localhost',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config: any) {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();
