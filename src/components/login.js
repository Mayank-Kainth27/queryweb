import React, { Component } from 'react';
import axios from 'axios';
import './css_files/signup_login_css.css';

export default class login extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/user/login', user)
            .then(res => {
                if (res.data.token) {
                    //window.alert('done login')
                    sessionStorage.setItem('token', res.data.token)
                    this.props.history.push('/exercise/main')
                }
                else {
                    alert(res.data)
                }
            });
    }



    render() {
        return (

            <div className="par-divs">

                <div className="content-signup"></div>

                <div className="container bg-text">

                    <h1 align="center" className="heading-h1"><b>Login Here</b></h1>

                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label><b>E mail : </b></label>
                            <input type="email"
                                required
                                className="form-control"
                                placeholder="Email"
                                value={this.setState.email}
                                onChange={this.onChangeEmail} />
                        </div>

                        <div className="form-group">
                            <label><b>Password : </b></label>
                            <input type="password"
                                required
                                placeholder="Password"
                                className="form-control"
                                value={this.setState.password}
                                onChange={this.onChangePassword} />
                        </div>

                        <div className="form-group">
                            <div align="center">
                                <input type="submit"
                                    className="btn btn-primary"
                                    value="Login"
                                ></input></div>
                            <div align="right"><a href="/user/signup">Dont have an account ?</a></div>
                        </div>

                    </form>

                </div>
            </div>

        );
    }
}