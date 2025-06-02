import { deleteClient } from '../../Service/clientService';

const useDeleteClient = () => {
    const eliminarCliente = async (id) => {
        try {
            await deleteClient(id);
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    };

    return { eliminarCliente };
};

export default useDeleteClient;
