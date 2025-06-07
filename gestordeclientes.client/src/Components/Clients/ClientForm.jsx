import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../Button";
import Input from "../Input";

import '../../Styles/ClientForm.css';

const ClientForm = ({ initialData = null, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            job: "",
            phoneNumber: "",
            age: ""
        }
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        } else {
            reset({
                name: "",
                surname: "",
                job: "",
                phoneNumber: "",
                age: ""
            });
        }
    }, [initialData, reset]);

    const submitHandler = async (data) => {
        try {
            await onSubmit(data);
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

                <form onSubmit={handleSubmit(submitHandler)} className="form-inputs">
                    <Input
                        placeholder="Nombre"
                        {...register("name", { required: "El nombre es obligatorio", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
                    />
                    {errors.name && <p className="error-form">{errors.name.message}</p>}

                    <Input
                        placeholder="Apellido"
                        {...register("surname", { required: "El apellido es obligatorio", minLength: { value: 2, message: "Mínimo 2 caracteres" } })}
                    />
                    {errors.surname && <p className="error-form">{errors.surname.message}</p>}

                    <Input
                        placeholder="Trabajo"
                        {...register("job", { required: "El trabajo es obligatorio" })}
                    />
                    {errors.job && <p className="error-form">{errors.job.message}</p>}

                    <Input
                        placeholder="Telefono"
                        {...register("phoneNumber", {
                            required: "El telefono es obligatorio",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Solo números permitidos"
                            }
                        })}
                    />
                    {errors.phoneNumber && <p className="error-form">{errors.phoneNumber.message}</p>}

                    <Input
                        placeholder="Edad"
                        type="number"
                        {...register("age", {
                            required: "La edad es obligatoria",
                            min: { value: 0, message: "Edad no puede ser negativa" },
                            max: { value: 120, message: "Edad no válida" }
                        })}
                    />
                    {errors.age && <p className="error-form">{errors.age.message}</p>}

                    <div className="form-actions">
                        <Button
                            type="submit"
                            className={initialData ? 'update-button-form' : 'save-button-form'}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (initialData ? "Actualizando..." : "Guardando...") : (initialData ? "Actualizar" : "Guardar")}
                        </Button>

                        <Button type="button" className="close-button" onClick={onCancel} disabled={isSubmitting}>
                            Cerrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientForm;