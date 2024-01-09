import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import $ from "jquery";

export default function Menu({ pagina }) {

    const handleLogout = () => {
        $(".aguarde").addClass("active");

        localStorage.clear();

        window.location.href = "";
    };

    useEffect(() => {
        $("div.Menu").on("click", "button.acao", function () {
            var _this = $(this);

            if (_this.hasClass("close")) {
                $("div.Menu").removeClass("open").addClass("close");

                $("body").css("overflow", "visible");
            }

            if (_this.hasClass("open")) {
                $("div.Menu").removeClass("close").addClass("open");
            }
        });

        var menuAtivo = $("div.Menu ul").attr("rel");
        $('div.Menu ul li a[title="' + menuAtivo + '"]').addClass("ativo");

        $("div.Header").on("click", "button.humburguer", function () {
            if ($("div.Menu").hasClass("close")) {
                $("div.Menu").removeClass("close").addClass("open");
                $("body").css("overflow", "hidden");

                return false;
            }

            if ($("div.Menu").hasClass("open")) {
                $("div.Menu").removeClass("open").addClass("close");
                $("body").css("overflow", "visible");

                return false;
            }
        });
    },[]);

    return (
        <div className="Menu close">
            <ul rel={pagina}>
                <li className="inicio">
                    <Link to={{pathname: "/"}} title="Início">
                        <i className="icon home"></i>
                        <span>Início</span>
                    </Link>
                </li>

                <li className="perfil">
                    <Link to={{pathname: "/"}} title="Perfil">
                        <i className="icon user"></i>
                        <span>Perfil</span>
                    </Link>
                </li>

                <li className="endereco">
                    <Link to={{pathname: "/endereco"}} title="Endereço">
                        <i className="icon map marker"></i>
                        <span>Endereço</span>
                    </Link>
                </li>

                <li className="trabalho">
                    <Link to={{pathname: "/trabalho"}} title="Trabalho">
                        <i className="icon building outline"></i>
                        <span>Trabalho</span>
                    </Link>
                </li>

                <li className="cartao">
                    <Link to={{pathname: "/cartao"}} title="Cartão">
                        <i className="icon credit card"></i>
                        <span>Cartão</span>
                    </Link>
                </li>

                <li className="sair">
                    <Link onClick={handleLogout} href="#" title="Sair">
                        <i className="icon log out"></i>
                        <span>Sair</span>
                    </Link>
                </li>
            </ul>

            <button className="acao close" title="Fechar">
                <i className="icon long arrow alternate left"></i>
                <span>Fechar</span>
            </button>

            <button className="acao open" title="Abrir">
                <i className="icon long arrow alternate right"></i>
            </button>
        </div>
    );
}