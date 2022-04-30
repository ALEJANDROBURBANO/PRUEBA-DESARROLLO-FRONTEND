import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

export default function Modal(props) {
    
    useEffect(() => {
        var myModalEl = document.getElementById("exampleModal");
        myModalEl.addEventListener("hide.bs.modal", function (event) {
            props.setIndex(undefined);
            props.reFetch();
        });
    }, []);
    return (
        // modal o ventana emergente
        <div
            className="modal fade"
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        <FontAwesomeIcon icon={faAddressCard} />  Datos del contacto
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    {/* pega el formulario en el body del modal */}
                    <div className="modal-body">{props.children}</div>
                    
                </div>
            </div>
        </div>
    );
}
