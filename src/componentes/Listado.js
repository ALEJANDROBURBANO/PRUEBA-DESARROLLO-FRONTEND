import React, { useEffect, useState } from "react";
import { Api } from "../Api";

export default function Listado({ setIndex, reFetch }) {
    const [data, setData] = useState(undefined);

    const fetchData = async () => {
        const response = await Api.get();
        console.log(response);
        setData(response);
    };

    const handleDelete = async (id) => {
        const response = await Api.delete(id);
        reFetch();
    };

    const edad = (fecha) => {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return "Cargando...";
    }

    return (
        <>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <td key={1}>Nombre</td>
                        <td key={2}>Teléfono</td>
                        <td key={3}>Edad</td>
                        <td key={4}>Dirección</td>
                        <td key={5}>Correo</td>
                        <td key={6}></td>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, key) => {
                        return (
                            <tr key={key}>
                                <td>{e.nombre}</td>
                                <td>{e.telefono}</td>
                                <td>{edad(e.fecha)}</td>
                                <td>{e.direccion}</td>
                                <td>{e.correo}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIndex({ index: key, data: e });
                                            setTimeout(function () {
                                                document
                                                    .getElementById(
                                                        "activadorModal"
                                                    )
                                                    .click();
                                            }, 500);
                                        }}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(key)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
