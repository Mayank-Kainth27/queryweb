import React, { Component } from 'react';
import './css_files/mainPage_css.css';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default class mainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ques: [],
            ans: []
        }
    }

    fetchData = () => {
        axios.get('http://localhost:5000/exercise/myques', {
            headers: {
                'authorization': sessionStorage.token
            }
        })
            .then((response) => {
                console.log("Response " + response.data)
                this.setState({ ques: response.data })
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/exercise/myans', {
            headers: {
                'authorization': sessionStorage.token
            }
        })
            .then((response) => {
                console.log("Response " + response.data)
                this.setState({ ans: response.data })
            })
            .catch(err => console.log(err))

    }

    componentDidMount() {
        this.fetchData();
    }

    showQues = () => {
        return this.state.ques.map(currentquestion => {
            return <tr>
                <th className="main-t-col1">{currentquestion.subjectName}</th>
                <th className="main-t-col2">{currentquestion.question}</th>
            </tr>
        })
    }

    showAns = () => {
        return this.state.ans.map(currentanswer => {
            return <tr>
                <th className="main-t-col1">{currentanswer.subjectName}</th>
                <th className="main-t-col2">{currentanswer.question}</th>
            </tr>
        })
    }



    render() {
        if (sessionStorage.token)
            return (
                <div className="container parent-div alert alert-secondary ">
                    <div className="parent-div-1 d-flex justify-content-between">
                        <div className="child-div-1 p-2">
                            <h2><FontAwesomeIcon icon={faLaptopCode} /> Questions asked by you ??</h2><hr className="hr_class"></hr>
                            <table className="main-table">
                                <tbody>
                                    {this.showQues()}
                                </tbody>
                            </table>
                        </div>

                        <div className="child-div-2 p-2">
                            <h2><FontAwesomeIcon icon={faLaptopCode} /> Questions answered by you !!</h2><hr className="hr_class"></hr>
                            <table className="main-table">
                                <tbody>
                                    {this.showAns()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="parent-div-2 d-flex justify-content-between">
                        <div className="ask-ques">
                            <a href="/exercise/Question" align="left"><h4 className="a-text"><FontAwesomeIcon icon={faBook} /> Ask a new Question</h4></a>
                        </div>
                        <div className="ans-ques">
                            <a href="/exercise/Answer" align="right"><h4 className="a-text"><FontAwesomeIcon icon={faBookOpen} /> Go To All Questions</h4></a>
                        </div>
                    </div>
                    <hr className="hr_class"></hr>
                </div >
            );
        else
            return <Redirect to='/user/login' />
    }
}