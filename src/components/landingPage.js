import React, { Component } from 'react';
import './css_files/landingPage_css.css';

export default class landingPage extends Component {

    render() {
        return (
            <div className="content">
                <div className="row">
                    <div className="col-lg-12 content2">
                        <h1 className="fantasy-h1-bold">Query Web</h1>
                        <h3 className="fantasy-h3">The query solving platform</h3>
                        <hr />
                        <button className="btn btn-info btn-lg"><a href="/user/login">Getting Started !</a></button>
                    </div>
                </div>
            </div>
        )
    }
}

