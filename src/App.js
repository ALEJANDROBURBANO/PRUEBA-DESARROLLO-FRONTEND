import "./App.css";
import ContactForm from "./componentes/ContactForm";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "./componentes/Modal";
import { useState } from "react";
import Listado from "./componentes/Listado";

function App() {
    const [index, setIndex] = useState(undefined);

    const [list, setList] = useState(true);

    const reFetch = () => {
        setList(false);
        setTimeout(function () {
            setList(true);
        });
    };
    return (
        <div className="App">
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                id="activadorModal"
            >
                Crear
            </button>
            <Modal setIndex={setIndex} reFetch={reFetch}>
                <ContactForm index={index?.index} data={index?.data} />
            </Modal>
            {list && <Listado setIndex={setIndex} reFetch={reFetch}></Listado>}
        </div>
    );
}

export default App;
