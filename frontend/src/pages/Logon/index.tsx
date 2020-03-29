import React from "react";

import { FiLogIn } from "react-icons/fi";

import "./styles.css";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form>
                    <h1>Faça o seu logon</h1>
                    <input placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>
                    <a href="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadatro
                    </a>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

export default Logon;