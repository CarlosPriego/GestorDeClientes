import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/Client';

export const postClient = async (clientData) => {
    try {
        const response = await axios.post(baseUrl, clientData);
        return response.data;
    } catch (error) {
        console.log('Error al agregar clientes: ', error);
        throw error;
    }
};

export const getClient = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.log('Error al listar clientes: ', error);
        throw error;
    }
};

export const getByIdClient = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error al obtener cliente: ', error);
        throw error;
    }
};

export const updateClient = async (id, clientData) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, clientData);
        return response.data;
    } catch (error) {
        console.log('Error al actualizar cliente: ', error);
        throw error;
    }
};

export const deleteClient = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error al eliminar cliente: ', error);
        throw error;
    }
};