import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
    return (
        <div style={{padding: '40px'}}>
                <div>
                    <h1>Welcome to chat application</h1>
                    <h5>Login and connect with frds</h5>
                    <span style={{color:'red'}}>created by h1 developer</span>
                </div>
        </div>
    );
}

export default Home;
