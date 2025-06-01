import { postClient } from "../../Service/clientService";

const useCreateClient = () => {
    const guardarCliente = async (cliente) => {
        try {
            const response = await postClient(cliente);
            return response;
        } catch (error) {
            console.error("Error desde useCreateClient:", error);
            throw error;
        }
    };

    return { guardarCliente };
};

export default useCreateClient;
