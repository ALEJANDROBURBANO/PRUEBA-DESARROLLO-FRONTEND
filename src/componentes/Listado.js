import React, { useEffect, useState } from "react";
import { Api } from "../Api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch } from '@fortawesome/free-solid-svg-icons'; // <-- importacion de iconos
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

    // const filter = () => {
    //     var input, filter, table, tr, td, i, j, visible;
    //     input = document.getElementById("myInput");
    //     filter = input.value.toUpperCase();
    //     table = document.getElementById("myTable");
    //     tr = table.getElementsByTagName("tr");

    //     for (i = 0; i < tr.length; i++) {
    //         visible = false;
    //         /* Obtenemos todas las celdas de la fila, no sólo la primera */
    //         td = tr[i].getElementsByTagName("td");
    //         for (j = 0; j < td.length; j++) {
    //         if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
    //             visible = true;
    //         }
    //         }
    //         if (visible === true) {
    //         tr[i].style.display = "";
    //         } else {
    //         tr[i].style.display = "none";
    //         }
    //     }
    // }

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
        return "Sin datos por el momento";
    }

    return (
        <>
   
        <div className="col-12" style={{marginTop: '100px'}}>
            <button 
                style={{ float: "left" }}
                type="button"
                className="btn btn-outline-secondary btn-rounded "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                id="activadorModal"
            >
                <FontAwesomeIcon icon={faSearch} /> BUSQUEDA AVANZADA
            </button>
        </div>
        <br></br>
        <div className="table-responsive col-12 " style={{marginTop:'50px'}}>
            <table className="table table-hover" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th key={1}>NOMBRE</th>
                        <th key={2}>TELÉFONO</th>
                        <th key={3}>EDAD</th>
                        <th key={4}>DIRECCIÓN</th>
                        <th key={5}>CORREO</th>
                        <th key={6}>EDITAR</th>
                        <th key={7}>ELIMINAR</th>
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
            
        </>
    );
}
