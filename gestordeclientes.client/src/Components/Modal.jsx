import '../Styles/Modal.css'
import Button from './Button';

const Modal = ({ children, estado, cambiarEstado }) => {
    return (
        <>
            {estado && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;