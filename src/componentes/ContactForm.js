import React, { useEffect, useState } from "react";
import { Api } from "../Api";

export default function ContactForm(props) {
    const [data, setData] = useState(undefined);

    const [loading, setLoading] = useState(false);

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
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre
                    </label>
                    <input
                        value={data.nombre}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="nombre"
                        placeholder="name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                        Telefono
                    </label>
                    <input
                        value={data.telefono}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="telefono"
                        placeholder="tlf"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                        Fecha nacimiento
                    </label>
                    <input
                        value={data.fecha}
                        onChange={handleChange}
                        type="date"
                        className="form-control"
                        id="fecha"
                        placeholder="dd/mm/yyyy"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">
                        Dirección
                    </label>
                    <input
                        value={data.direccion}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="direccion"
                        placeholder="direccion"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">
                        Correo electronico
                    </label>
                    <input
                        value={data.correo}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="name@example.com"
                    />
                </div>
                {loading ? (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <div className="mb-3">
                        <button className="btn btn-primary">
                            {props.index !== undefined ? "Editar" : "Crear"}
                        </button>
                    </div>
                )}
            </form>
        </>
    );
}
