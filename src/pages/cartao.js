import React, { useEffect, useState } from "react";

import Header from "../components/header";
import Menu from "../components/menu";

import { Button, Form } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import Cards from 'react-credit-cards-2';

import $ from "jquery";
import axios from "axios";

export default function Cartao() {
    const pagina = "Cartão";

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const [txtNome, setTxtNome] = useState("");
    const [txtSobrenome, setTxtSobrenome] = useState("");
    const [txtNomeCompleto, setTxtNomeCompleto] = useState("");
    const [txtBankNumber, setBankNumber] = useState("");
    const [txtBankExpire, setBankExpire] = useState("");
    
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
                    setTxtSobrenome(response.data.lastName);
                    setTxtNomeCompleto(response.data.firstName +' '+ response.data.lastName);
                    setBankNumber(response.data.bank.cardNumber);
                    setBankExpire(response.data.bank.cardExpire);
                    
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
        <div id="Wrapper" className="Perfil Index Cartao">
            <Menu pagina={pagina} />

            <div className="content">
                <Header pagina={pagina} />

                <div className="container">
                    <div className="wrap">
                        <div className="left">                            
                            <Cards
                                number={txtBankNumber}
                                expiry={txtBankExpire}
                                name={txtNomeCompleto}
                            />
                        </div>

                        <div className="right">
                            <Form>
                                <Form.Field>
                                    <label>Número Cartão</label>
                                    <input
                                        type="text"
                                        name="number"
                                        disabled
                                        value={txtBankNumber}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Nome</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={txtNomeCompleto}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Data Expiração</label>
                                    <input
                                        type="text"
                                        disabled
                                        value={txtBankExpire}
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
