import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import $ from "jquery";

export default function Header({ pagina }) {

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);

            $("body div#Wrapper").addClass("logado");

            const firstName = foundUser.firstName;
            const lastName = foundUser.lastName;
            const firstNamecharAt = firstName.charAt(0);
            const lastNamecharAt = lastName.charAt(0);

            $("div.Header .wrap .User strong").html(firstName + " " + lastName);
            $("div.Header .wrap .User .avatar").html(firstNamecharAt + lastNamecharAt);
        } else {
            window.location.href = "/login";
        }
    }, []);

    return (
        <div className="Header">
            <button className="humburguer">
                <i className="icon bars"></i>
            </button>

            <h1 className="title">{pagina}</h1>

            <div className="wrap">
                <div className="alert">
                    <Link>
                        <i className="icon alarm"></i>
                        <span>1</span>
                    </Link>
                </div>

                <div className="User">
                    <div className="avatar"></div>
                    <strong></strong>
                </div>
            </div>
        </div>
    );
}
