import React, { useEffect, useState } from "react";

import Header from "../components/header";
import Menu from "../components/menu";

import { Button, Form } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import $ from "jquery";

import axios from "axios";

export default function Perfil() {
    const pagina = "Perfil";

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const [txtNome, setTxtNome] = useState("");
    const [txtSobrenome, setTxtSobrenome] = useState("");
    const [txtEmail, setTxtEmail] = useState("");
    const [txtGenero, setTxtGenero] = useState("");
    const [txtAvatar, setTxtAvatar] = useState("");
    const [txtTel, setTxtTel] = useState("");
    const [txtSsn, setTxtSsn] = useState("");

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

                    setTxtNome(response.data.firstName);
                    setTxtEmail(response.data.email);
                    setTxtSobrenome(response.data.lastName);
                    setTxtGenero(response.data.gender);
                    setTxtAvatar(response.data.image);
                    setTxtTel(response.data.phone);
                    setTxtSsn(response.data.ssn);
                    $(".aguarde").removeClass("active");
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

    return (
        <div id="Wrapper" className="Perfil Index">
            <Menu pagina={pagina} />

            <div className="content">
                <Header pagina={pagina} />

                <div className="container">
                    <div className="wrap">
                        <div className="left">                            
                            <img src={txtAvatar} />
                        </div>

                        <div className="right">
                            <Form>
                                <Form.Field>
                                    <label>Nome</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="nome"
                                        value={txtNome}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Sobrenome</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="sobrenome"
                                        value={txtSobrenome}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Gênero</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="genero"
                                        value={txtGenero}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>E-mail</label>
                                    <input
                                        type="text"
                                        disabled
                                        className="email"
                                        value={txtEmail}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Telefone</label>
                                    <input
                                        type="text"
                                        className="telefone"
                                        disabled
                                        value={txtTel}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Documento</label>
                                    <input
                                        type="text"
                                        className="ssn"
                                        disabled
                                        value={txtSsn}
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

                {/* Loading */}
                <div className="ui transition inverted dimmer aguarde active">
                    <div className="content">
                        <div className="ui large text loader">Aguarde...</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
