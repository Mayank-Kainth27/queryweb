import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faUserPlus, faUser, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {

    logOut = () => {
        sessionStorage.clear();
        this.props.history.push('/')
    }
    render() {
        const login =
            <React.Fragment>
                <Nav.Link className="navbar-item">
                    <Link to="/user/signup" className="nav-link"> <FontAwesomeIcon icon={faUserPlus} /> Sign Up</Link>
                </Nav.Link >
                <Nav.Link className="navbar-item">
                    <Link to="/user/login" className="nav-link"> <FontAwesomeIcon icon={faUser} /> Login</Link>
                </Nav.Link>
            </React.Fragment>

        const logout = <React.Fragment>
            <Nav.Link className="navbar-item">
                <Link to="/exercise/main" className="nav-link"> <FontAwesomeIcon icon={faHome} /> Home</Link>
            </Nav.Link>
            <Nav.Link className="navbar-item">
                <Link onClick={this.logOut} className="nav-link"> <FontAwesomeIcon icon={faSignOutAlt} /> LogOut</Link>
            </Nav.Link>
        </React.Fragment>
        return (
            <div className="fluid flex">

                <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <Navbar.Brand href="/"><FontAwesomeIcon icon={faQuestionCircle} /> Query Web</Navbar.Brand>
                    </div>
                    <div className="nav navbar-nav navbar-right">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="navbar-nav mr-auto">
                                {
                                    sessionStorage.token ? logout : login
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
                <div></div>
            </div >
        );
    }
}




export default withRouter(Header);
