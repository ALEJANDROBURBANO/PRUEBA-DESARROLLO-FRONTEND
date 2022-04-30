import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCity, faEnvelope, faPhone, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Api } from "../Api";

export default function ContactForm(props) {

    const formStyle = {
        textAlign: 'left',
        paddingLeft: '40px',
        paddingRight: '40px'
        
    };

    const [data, setData] = useState(undefined);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState(false);

    const handleChange = (el) => {
        const copia = {
            ...data,
            [el.target.id]: el.target.value,
        };

        setData(copia);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const api = Api;
        const response =
            props.index === undefined
                ? await api.create(data)
                : await api.update(data, props.index);
        setLoading(false);
        setData({
            nombre: "",
            telefono: "",
            fecha: "",
            direccion: "",
            correo: "",
        });
        setMessage('Tarea realizada con exito, cierre el formulario para visualizar la acción.');
        return false;
    };

    useEffect(() => {
        setData(
            props.data ?? {
                nombre: "",
                telefono: "",
                fecha: "",
                direccion: "",
                correo: "",
            }
        );
    }, [props.data]);

    if (!data) {
        return "Cargando...";
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} id="form_contact" style={formStyle}>
                <h2> {props.index !== undefined ? "Actualizar" : "Registrar"} contacto</h2>
                <div style={{marginBottom:'30px'}}>Todos los datos identificados con <label className='text-danger'>*</label> son de caracter obligatorio.</div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                    <FontAwesomeIcon icon={faUser} /> <b> Nombre <span className="text-danger">*</span></b>
                    </label>
                    <input
                        value={data.nombre}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                    <FontAwesomeIcon icon={faPhone} /> <b> Teléfono <span className="text-danger">*</span></b>
                    </label>
                    <input
                        value={data.telefono}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="telefono"
                        placeholder="312 456 7890"
                        maxlength="10"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                    <FontAwesomeIcon icon={faCalendar} /> <b> Fecha de nacimiento <span className="text-danger" >*</span></b>
                    </label>
                    <input
                        value={data.fecha}
                        onChange={handleChange}
                        type="date"
                        className="form-control"
                        id="fecha"
                        placeholder="dd/mm/yyyy"
                        
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">
                    <FontAwesomeIcon icon={faCity} /> <b> Dirección <span className="text-danger">*</span></b>
                    </label>
                    <input
                        value={data.direccion}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="direccion"
                        placeholder="Calle 1 # 2-3"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                    <FontAwesomeIcon icon={faEnvelope} /> <b> Correo electronico <span className="text-danger">*</span></b>
                    </label>
                    <input
                        value={data.correo}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="usuario@mail.com"
                        required
                    />
                </div>
                <div>
                    <p className="text-success" id="textSavedContact" >{message}</p>
                </div>
                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div style={{marginBottom:'120px', marginTop:'50px'}}>
                        <button style={{ float: "left" }}
                            type="button"
                            className="btn btn-outline-primary btn-rounded"
                            data-bs-dismiss="modal"
                        >
                            CANCELAR
                        </button>
                        <button className="btn btn-primary btn-rounded" style={{ float: "right" }}>
                            {props.index !== undefined ? "ACTUALIZAR" : "GUARDAR"}
                        </button>
                    </div>
                )}
            </form>
        </>
    );
}
