import { useState, useEffect } from "react";
import { getClient, deleteClient } from '../../Service/clientService';
import { useUpdateClient } from "../../Hooks/Clients/useUpdateClient";
import useDeleteClient from "../../Hooks/Clients/useDeleteClient";

import useCreateClient from "../../Hooks/Clients/useCreateClient";

import '../../Styles/ClientList.css';
import Button from "../Button";
import ClientForm from "../Clients/ClientForm";

export const ClientList = () => {
    const [clientes, setClientes] = useState([]);
    const [editar, setEditar] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const { eliminarCliente } = useDeleteClient();

    const { editClient } = useUpdateClient(() => {
        mostrarClientes();
        setEditar(null);
        setShowForm(false);
    });

    const { guardarCliente } = useCreateClient();

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
        const interval = setInterval(mostrarClientes, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (formData) => {
        if (editar) {
            await editClient(editar.id, formData);
        } else {
            await guardarCliente(formData);
        }
    }

    return (
        <>
            

            <table className='table-container'>
                <thead>
                    <tr className='table-row-topics'>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Job</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id} className='table-row-data'>
                            <td>{cliente.name}</td>
                            <td>{cliente.surname}</td>
                            <td>{cliente.job}</td>
                            <td>{cliente.phoneNumber}</td>
                            <td>{cliente.age}</td>
                            <td>
                                <Button className='update-button' onClick={() => {
                                    setEditar(cliente);
                                    setShowForm(true);
                                }}>Editar</Button>
                            </td>
                            <td>
                                <Button className='delete-button' onClick={async () => {
                                    if (window.confirm("¿Seguro que quieres eliminar?")) {
                                        await eliminarCliente(cliente.id);
                                        mostrarClientes();
                                    }
                                }}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button className='save-button' onClick={() => {
                    setEditar(null);
                    setShowForm(true);
                }}
            >
                Agregar Cliente
            </Button>

            {showForm && (
                <ClientForm
                    initialData={editar}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditar(null);
                    }}
                />
            )}
        </>
    );
};

export default ClientList;
