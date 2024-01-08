import React, { useEffect, useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";

import axios from "axios";

export default function Login({ usuario }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    /*
    "id": 15,
    "username": "kminchelle",
    "password" "0lelplR",
    "email": "kminchelle@qq.com",
    "firstName": "Jeanne",
    "lastName": "Halvorson",
    "gender": "female",
    "image": "https://robohash.org/Jeanne.png?set=set4",
    */

    const handleSubmit = async (e) => {
        var usuario = $("input.usuario").val();
        var senha = $("input.senha").val();

        if (usuario === "") {
            toast.error("Informa o seu usuário!", {
                position: toast.POSITION.TOP_RIGHT
            });

            return false;
        }

        if (senha === "") {
            toast.error("Informa sua senha!", {
                position: toast.POSITION.TOP_RIGHT
            });

            return false;
        }

        $(".aguarde").addClass("active");

        e.preventDefault();
        const dadosLogin = {
            username: "" + username + "",
            password: "" + password + ""
        };
        axios({
            method: "POST",
            url: `https://dummyjson.com/auth/login`,
            data: dadosLogin,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                setToken(response.data.token);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data));

                console.log("response >> ", response);

                toast.success('Olá, ' + response.data.firstName + ', aguarde...', {
                    position: toast.POSITION.TOP_RIGHT
                });

                window.location.href = '/';
            })
            .catch(function (error) {
                console.log("ERRORR >> ", error);

                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });

                $(".aguarde").removeClass("active");
            });
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            window.location.href = "/";
        }

        $("div.field").on("click", 'i.icon:not(".slash")', function () {
            $(this).parents("div.field").find("input").attr("type", "text");
            $(this).addClass("slash");
        });

        $("div.field").on("click", "i.icon.slash", function () {
            $(this).parents("div.field").find("input").attr("type", "password");
            $(this).removeClass("slash");
        });
    }, []);

    return (
        <div className="Login">
            <div className="container">
                <div className="image"></div>

                <div className="content">
                    <h1 className="title">Elumini IT</h1>
                    <h2 className="title">Bem-vindo!</h2>
                    <p style={{ textAlign: "center" }}>Faça login para acessar sua conta</p>

                    {user && <div>{user.pessoa.nome} logado!</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <input
                                type="text"
                                className="usuario"
                                placeholder="Digite seu usuário"
                                value={username}
                                onChange={({ target }) => setUsername(target.value)}
                            />
                        </Form.Field>

                        <Form.Field>
                            <input
                                type="password"
                                className="senha"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                            <i className="icon eye"></i>
                        </Form.Field>

                        <Form.Field style={{ textAlign: "right" }}>
                            <a href="#" className="linkComum">
                                Esqueceu sua senha?
                            </a>
                        </Form.Field>

                        <Button type="submit" style={{ marginTop: "40px" }} className="padrao azul">
                            Acessar
                        </Button>
                    </Form>
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
            <div className="ui transition inverted dimmer aguarde">
                <div className="content">
                    <div className="ui large text loader">Aguarde...</div>
                </div>
            </div>
        </div>
    );
}
