import './App.css';

import ClientList from './Components/Clients/ClientList.jsx';
import ClientForm from './Components/Clients/ClientForm';
import Modal from './Components/Modal';
import Button from './Components/Button';
import Input from './Components/Input';

import { useState } from 'react';

function App() {
    const [estadoModalForm, setEstadoModalForm] = useState(false);

    return (
        <>
            <ClientList />
            <Modal
                estado={estadoModalForm}
                cambiarEstado={setEstadoModalForm}
            >
                <ClientForm cambiarEstado={setEstadoModalForm} />

            </Modal>
        </>
    )
}   

export default App;