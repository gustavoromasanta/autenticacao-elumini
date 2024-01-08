import React, { useEffect, useState } from "react";

import $ from "jquery";

export default function Header({ pagina }) {
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);

            $("body div#Wrapper").addClass("logado");

            const firstName = foundUser.firstName;
            const lastName = foundUser.lastName;
            const nome = firstName + ' ' + lastName;
            const partesNome = nome.split(" ");
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
                    <a href="#">
                        <i className="icon alarm"></i>
                        <span>1</span>
                    </a>
                </div>

                <div className="User">
                    <div className="avatar"></div>
                    <strong></strong>
                </div>
            </div>
        </div>
    );
}
