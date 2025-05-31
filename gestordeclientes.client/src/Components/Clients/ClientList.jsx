import { useState, useEffect } from "react";
import { getClient } from '../../Service/clientService';

export const ClientList = () => {
    const [clientes, setClientes] = useState([]);

    const mostrarClientes = async () => {
        try {
            const dataClient = await getClient();
            setClientes(dataClient);
        } catch (error) {
            console.log('Error al listar a los clientes:', error);
        }
    };

    useEffect(() => {
        mostrarClientes();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Job</th>
                    <th>Phone Number</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                        <td>{cliente.name}</td>
                        <td>{cliente.surname}</td>
                        <td>{cliente.job}</td>
                        <td>{cliente.phoneNumber}</td>
                        <td>{cliente.age}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClientList;