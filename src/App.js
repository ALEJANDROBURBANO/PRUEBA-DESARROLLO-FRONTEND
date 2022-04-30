import "./App.css";
import ContactForm from "./componentes/ContactForm";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- importacion boostrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
        <div className="App " style={{fontFamily: 'arial'}}>
            <div className="row" style={{ width: "100%", padding:'20px 0px 20px 0px', backgroundColor: "#1565c0", marginLeft: '0px'}}>
                <div className="col-md-2" style={{padding: '0px'}}>
                    <div className="col-md-12" style={{height:'80px', backgroundColor: "#e3f2fd", borderTopRightRadius:'6px', borderBottomRightRadius: '6px'}}>
                        <img style={{width: '160px'}} src="brm.gif"/>
                    </div>
                </div>
                
                <div className="col-md-10">
                    <div style={{backgroundColor: '#e3f2fd', padding: '8px', height: '40px', width: '60%', float: 'right', borderRadius: '6px', marginTop:'20px'}}>
                        <div style={{float: 'left', borderRight: '1px solid gray', paddingRight: '10px', paddingLeft: '10px'}}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <div>
                            <input type="text" style={{backgroundColor:'transparent', border:'0px', width: '84%', outline: 'none'}} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "whitesmoke" }}>
                <div style={{ padding: "40px", backgroundColor: "white", minHeight: '58vh' }} className="col-md-10 offset-md-1">
                    <h2 style={{float:'left'}}>Agenda de contactos</h2>
                    
                    
                    <button 
                        style={{ float: "right" }}
                        type="button"
                        className="btn btn-primary btn-rounded "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        id="activadorModal"
                    >
                       <FontAwesomeIcon icon={faPlus} style={{ width:'60px', fontSize: '30px'}}/> REGISTRAR NUEVO CONTACTO
                    </button>
                    <Modal setIndex={setIndex} reFetch={reFetch}>
                        <ContactForm index={index?.index} data={index?.data} />
                    </Modal>
                    <div>
                        {list && <Listado setIndex={setIndex} reFetch={reFetch}></Listado>}
                    </div>
                </div>
                
            </div>
            
            <div style={{ width: '100%', backgroundColor: '#003c8f', padding: '20px', color: 'white', left: '0', bottom: '0'}}>
                <div>
                <b>© Copyrai 2022 </b>| Yerson Alejandro Burbano Ramos
                <br></br>
                <b>Celular: </b> 320 402 0143
                <br></br>
                <b>Correo: </b> yeal199838@gmail.com
                <br></br>
                <b>Dirección: </b> Kra 2 E # 1 - 27 Sur, Cajicá - Cundinamarca
                <hr></hr>
                <div className="row">
                    <div className="col-md-6" style={{textAlign: 'left'}}>
                        PRUEBA DESARROLLADOR FRONTEND | <a href="https://www.brm.com.co/">BRM Grandes Interacciones</a>
                    </div>
                    <div className="col-md-6" style={{textAlign: 'right'}}>
                        <a target="_blank" style={{color: 'white'}} href="https://www.facebook.com/yersonalejandro.burbanoramos/"><FontAwesomeIcon icon={faFacebook} style={{marginRight:'3px', marginLeft:'5px'}}/></a> |
                        <a target="_blank" style={{color: 'white'}} href="https://www.linkedin.com/in/yerson-alejandro-burbano-ramos-98324b21a/"><FontAwesomeIcon icon={faLinkedin} style={{marginRight:'3px', marginLeft:'5px'}}/></a> |
                        <a target="_blank" style={{color: 'white'}} href="https://api.whatsapp.com/send?phone=573204020143"><FontAwesomeIcon icon={faWhatsapp} style={{marginRight:'3px', marginLeft:'5px'}}/></a> |
                        <a target="_blank" style={{color: 'white'}} href="https://persona.computrabajo.com.co/Candidate/Home?f=FEE939887FF3D46C"><FontAwesomeIcon icon={faLaptopCode} style={{marginRight:'3px', marginLeft:'5px'}}/></a>
                    </div>
                </div>
                
                </div>
            </div>
    
        </div>
    );
}

export default App;
