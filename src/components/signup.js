import React, { Component } from 'react';
import axios from 'axios';
import './css_files/signup_login_css.css';

export default class signup extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fullname: '',
            phone: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    onChangeName(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
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

    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password === this.state.password2) {
            const user = {
                fullname: this.state.fullname,
                phone: this.state.phone,
                email: this.state.email,
                password: this.state.password
            }
            axios.post('http://localhost:5000/user/add', user)
                .then(res => {
                    if (res.data === 'submitted') {
                        this.props.history.push('/user/login')
                    } else {
                        alert(res.data)
                    }
                });

            this.setState({
                fullname: '',
                phone: '',
                email: '',
                password: '',
                password2: ''
            })
        }
        else {
            window.alert("Password Donot Match .....!!")
        }
    }




    render() {
        return (
            <div className="par-divs">
                <div className="content-signup" ></div>
                <div className="container bg-text">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 align="center" className="heading-h1"><b>Create Account</b></h1>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label><b>Full Name : </b></label>
                                    <input type="text"
                                        required
                                        placeholder="Name"
                                        value={this.setState.fullname}
                                        onChange={this.onChangeName}
                                        className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label><b>Phone Number : </b></label>
                                    <input type="number"
                                        required
                                        pattern="[0-9]{10}"
                                        placeholder="Phone Number"
                                        value={this.setState.phone}
                                        onChange={this.onChangePhone}
                                        className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label><b>E-mail : </b></label>
                                    <input type="email"
                                        className="form-control"
                                        placeholder="E-mail"
                                        value={this.setState.email}
                                        onChange={this.onChangeEmail}
                                        required></input>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col-lg-5 col-md-12 col-sm-12">
                                <label><b>Password : </b></label>
                                <input type="password"
                                    maxLength="18"
                                    className="form-control"
                                    required
                                    value={this.setState.password}
                                    onChange={this.onChangePassword}
                                    placeholder="Password must be smaller than 19 characters"></input>
                            </div>

                            <div className="col-lg-2 col-md-0 col-sm-0"></div>

                            <div className="form-group col-lg-5 col-md-12 col-sm-12">
                                <label><b>Confirm Password : </b></label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    required
                                    value={this.setState.password2}
                                    onChange={this.onChangePassword2}
                                    maxLength="18"></input>
                            </div>
                        </div>

                        <div className="form-group" align="center">
                            <input type="submit" value="Sign Up" className="btn btn-primary btn-lg" />
                        </div>
                        <div className="form-group" align="right">
                            <a href="/user/login">Already have an account ?</a>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}