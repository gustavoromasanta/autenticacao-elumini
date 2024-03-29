import React, { useEffect, useState } from "react";

import Header from "../components/header";
import Menu from "../components/menu";

import { Form } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import $ from "jquery";
import axios from "axios";

const containerStyle = {
    width: '400px',
    height: '400px'
};

export default function Trabalho() {
    const pagina = "Trabalho";

    const [pronto, setPronto] = useState(null);

    const [txtRua, setTxtRua] = useState("");
    const [txtCidade, setTxtCidade] = useState("");
    const [txtCep, setTxtCep] = useState("");
    const [txtUf, setTxtUf] = useState("");

    const [txtNome, setTxtNome] = useState("");
    const [txtDepartamento, setTxtDepartamento] = useState("");
    const [txtCargo, setTxtCargo] = useState("");

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBfIViDYjdx3tdEogKrH4GPLoF34TdokEQ"
    })
    
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const token = localStorage.getItem("token");
            const userToken = JSON.parse(token);

            axios({
                method: "GET",
                url: `https://dummyjson.com/user/me`,
                headers: {
                    'Authorization': 'Bearer '+userToken+'',
                }
            })
                .then(function (response) {
                    //console.log('Response >> ', response);

                    setTxtRua(response.data.company.address.address);
                    setTxtCidade(response.data.company.address.city);
                    setTxtCep(response.data.company.address.postalCode);
                    setTxtUf(response.data.company.address.state);

                    setTxtDepartamento(response.data.company.department);
                    setTxtNome(response.data.company.name);
                    setTxtCargo(response.data.company.title);

                    const center = {
                        lat: response.data.company.address.coordinates.lat,
                        lng: response.data.company.address.coordinates.lng
                    };

                    setTimeout(function(){
                        setPronto(center);

                        $(".aguarde").removeClass("active");
                    },500);
                })
                .catch(function (error) {
                    console.log("error >> ", error);

                    toast.error(error.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });

                    if(error.message === 'Request failed with status code 401'){
                        localStorage.clear();

                        window.location.href = "";
                    }

                    $(".aguarde").removeClass("active");
                });
        } else {
            window.location.href = "/login";
        }
    }, []);

    return isLoaded ? (
        <>
            {pronto !== null ? (
                <>
                    <div id="Wrapper" className="Perfil Index Mapa">
                        <Menu pagina={pagina} />

                        <div className="content">
                            <Header pagina={pagina} />

                            <div className="container">
                                <div className="wrap">
                                    <div className="left">
                                        <GoogleMap
                                            mapContainerStyle={containerStyle}
                                            center={pronto}
                                            zoom={17}
                                        >
                                        </GoogleMap>                           
                                    </div>

                                    <div className="right">
                                        <Form>
                                            <Form.Field>
                                                <label>Empresa</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="empresa"
                                                    value={txtNome}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Cargo</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="cargo"
                                                    value={txtCargo}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Departamento</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="departamento"
                                                    value={txtDepartamento}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Rua</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="rua"
                                                    value={txtRua}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>Cidade</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="cidade"
                                                    value={txtCidade}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>CEP</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="cep"
                                                    value={txtCep}
                                                />
                                            </Form.Field>

                                            <Form.Field>
                                                <label>UF</label>
                                                <input
                                                    type="text"
                                                    className="uf"
                                                    disabled
                                                    value={txtUf}
                                                />
                                            </Form.Field>
                                        </Form>
                                    </div>
                                </div>
                            </div>

                            <ToastContainer
                                autoClose={3000}
                                limit={2}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                                theme="light"
                            />
                        </div>
                    </div>
                </>
            ) : (
                <div className="ui transition inverted dimmer aguarde active">
                    <div className="content">
                        <div className="ui large text loader">Aguarde...</div>
                    </div>
                </div>
            )}
        </>
    ): <></>
}
