import { useState } from "react";

import { getClient } from '../../Service/clientService'

const [clientes, setClientes] = useState([])

const mostrarClientes = async() => {
    const response = await getClient()

    if (response.ok) {
        const dataClient = await response.json();
        setClientes(dataClient)
    } else {
        console.log('error al listar a los clientes');
    }
}
