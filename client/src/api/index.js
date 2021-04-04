import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const addCompany = (companyData) => API.post('/company/createcompany', companyData);
export const getCompanies = () => API.get('company/getallcompany');
export const getUnverifiedCompanies = () => API.get('company/getunverifiedcompany');
export const getAllCompanies = () => API.get('company/getallcompany');
export const getCompanyById = (id) => API.get(`company/getcompanybyid/${id}`);
export const verifyCompany = (companyData) => API.post('/company/verifycompany', companyData);

export const getProduct = () => API.get('product/getproduct');
export const getProductById = (id) => API.get(`product/getproductbyid/${id}`);
export const getAllProduct = () => API.get('product/getallproduct');
export const createProduct = (productData) => API.post('product/createproduct', productData);
export const updateProduct = (productData) => API.post('product/updateproduct', productData);
export const deleteProduct = (id) => API.delete(`product/deleteproduct/${id}`);

export const getInquiry = () => API.get('inquiry/getinquiry');
export const addInquiry = (inquiryData) => API.post('inquiry/addinquiry', inquiryData);

export const getOrder = () => API.get('order/getorder');
export const acceptOrder = (id) => API.get(`order/acceptorder/${id}`);
export const dispatchOrder = (id) => API.get(`order/dispatchorder/${id}`);
export const declineOrder = (id) => API.delete(`order/declineorder/${id}`);
export const addOrder = (orderData) => API.post('order/addorder', orderData);

export const addContact = (contactData) => API.post(`/contact`, contactData);