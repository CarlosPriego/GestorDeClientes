import Button from "../Button";
import Input from "../Input";
import '../../Styles/ClientForm.css';
import { useState, useEffect } from "react";
import useCreateClient from "../../Hooks/Clients/useCreateClient";

const valoresIniciales = {
    name: '',
    surname: '',
    job: '',
    phoneNumber: '',
    age: ''
};

const ClientForm = ({ initialData = null, onSubmit, onCancel }) => {
    const [cliente, setCliente] = useState(valoresIniciales);
    const { guardarCliente } = useCreateClient();

    useEffect(() => {
        if (initialData) {
            setCliente(initialData);
        } else {
            setCliente(valoresIniciales);
        }
    }, [initialData]);

    const actualizarDatos = (e) => {
        const { name, value } = e.target;
        setCliente({
            ...cliente,
            [name]: value
        });
    };
    
    const enviarDatos = async () => {
        try {
            await onSubmit(cliente);
            alert(initialData ? "Cliente actualizado con éxito." : "Cliente guardado con éxito.");
            onCancel();
        } catch (error) {
            alert("Error al guardar cliente.");
        }
    };


    return (
        <div className="client-form-container">
            <div className="form-box">
                <h1 className="form-title">
                    {initialData ? "Editar Cliente" : "Nuevo Cliente"}
                </h1>

                <div className="form-inputs">
                    <Input placeholder="name" name="name" value={cliente.name} onChange={actualizarDatos} />
                    <Input placeholder="surname" name="surname" value={cliente.surname} onChange={actualizarDatos} />
                    <Input placeholder="job" name="job" value={cliente.job} onChange={actualizarDatos} />
                    <Input placeholder="phone number" name="phoneNumber" value={cliente.phoneNumber} onChange={actualizarDatos} />
                    <Input placeholder="age" name="age" value={cliente.age} onChange={actualizarDatos} />
                </div>

                <div className="form-actions">
                    <Button
                        className={initialData ? 'update-button-form' : 'save-button-form'}
                        onClick={enviarDatos}
                    >
                        {initialData ? "Actualizar" : "Guardar"}
                    </Button>
                    <Button className='close-button' onClick={onCancel}>Cerrar</Button>
                </div>
            </div>
        </div>
    );
};

export default ClientForm;