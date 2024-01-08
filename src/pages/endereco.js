import React, { useEffect, useState } from "react";

import Header from "../components/header";
import Menu from "../components/menu";

import { Button, Form } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import $ from "jquery";
import axios from "axios";

export default function Endereco() {
    const pagina = "Endereço";

    const [pronto, setPronto] = useState(null);

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const [txtRua, setTxtRua] = useState("");
    const [txtCidade, setTxtCidade] = useState("");
    const [txtCep, setTxtCep] = useState("");
    const [txtUf, setTxtUf] = useState("");
    const [txtLat, setTxtLat] = useState("");
    const [txtLng, setTxtLng] = useState("");

    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    const center = {
        lat: 0,
        lng: 0
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBfIViDYjdx3tdEogKrH4GPLoF34TdokEQ"
    })
    
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
    }, [])
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    

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

                    setTxtRua(response.data.address.address);
                    setTxtCidade(response.data.address.city);
                    setTxtCep(response.data.address.postalCode);
                    setTxtUf(response.data.address.state);
                    setTxtLat(response.data.address.coordinates.lat);
                    setTxtLng(response.data.address.coordinates.lng);

                    const center = {
                        lat: response.data.address.coordinates.lat,
                        lng: response.data.address.coordinates.lng
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

                    if(error.message == 'Request failed with status code 401'){
                        setUser({});
                        setToken({});
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
