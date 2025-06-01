import { useState } from 'react';
import { updateClient } from '../../Service/clientService';

export const useUpdateClient = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const editClient = async (id, clientData) => {
        setLoading(true);
        try {
            await updateClient(id, clientData);
            setLoading(false);
            if (onSuccess) onSuccess(); // para recargar lista
        } catch (err) {
            console.error('Error actualizando cliente:', err);
            setError(err);
            setLoading(false);
        }
    };

    return { editClient, loading, error };
};
