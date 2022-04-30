import React, { useEffect, useState } from "react";
import { Api } from "../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"; // <-- importacion de iconos
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Listado({ setIndex, reFetch, search = "" }) {
    const [localData, setLocalData] = useState([]);
    const [data, setData] = useState(undefined);

    const fetchData = async () => {
        const response = await Api.get();
        console.log(response);
        setData(response);
        setLocalData(response);
    };

    const handleDelete = async (id) => {
        const response = await Api.delete(id);
        reFetch();
    };

    const filter = (string) => {
        var string = string.toUpperCase();
        const filtered = [];

        Object.entries(localData).forEach(([key, el]) => {
            var values = Object.values(el).join(" ");
            if (values.toUpperCase().indexOf(string) > -1) {
                filtered[key] = el;
            }
        });

        setData(filtered);
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
        filter(search);
    }, [search]);

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return "Sin datos por el momento";
    }

    return (
        <>
   
       
        <div className="table-responsive col-12 " style={{marginTop:'120px'}}>
            <table className="table table-hover" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th key={1}>NOMBRE</th>
                        <th key={2}>TELÉFONO</th>
                        <th key={3}>EDAD</th>
                        <th key={4}>DIRECCIÓN</th>
                        <th key={5}>CORREO</th>
                        <th key={6}></th>
                        <th key={7}></th>
                        <th key={8}></th>
                        <th key={9}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, key) => {
                        return (
                            <tr key={key}>
                                <td style={{textAlign:'left'}}>{e.nombre}</td>
                                <td>{e.telefono}</td>
                                <td>{edad(e.fecha)} Años</td>
                                <td>{e.direccion}</td>
                                <td>{e.correo}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary"
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
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-danger" 
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={"#deleteModal"+key}
                                        
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                    <div
                                        className="modal fade"
                                        id={"deleteModal"+key}
                                        aria-labelledby="deleteModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                  <h4><FontAwesomeIcon icon={faTrash} /> Eliminar contacto</h4>  
                                                </div>
                                                <div className="modal-body" style={{textAlign: 'left'}}>
                                                    <h5>¿Esta seguro que desea eliminar el contacto <b>{e.nombre}</b>?</h5>
                                                    <div className="row" style={{textAlign: 'center', marginTop: '60px', marginBottom: '20px'}}>
                                                        <div className="col-md-6">
                                                            <button style={{width: '100%'}} className="btn btn-outline-danger" data-bs-dismiss="modal">NO</button>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <button style={{width: '100%'}} className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleDelete(key)}>SI</button>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td><a href={"mailto:"+e.correo}><button style={{width: '100px'}} className="btn btn-secondary btn-sm"><FontAwesomeIcon icon={faEnvelope} /></button></a></td>
                                <td><a href={"tel:"+e.telefono}><button style={{width: '100px'}} className="btn btn-success btn-sm"><FontAwesomeIcon icon={faPhone} /></button></a></td>

                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
            
        </>
    );
}
