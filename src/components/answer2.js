import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './css_files/answer2_css.css';
import axios from 'axios';

class Answer2 extends Component {
    constructor(props) {
        super(props);

        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            answer: ''
        }
    }

    onChangeAnswer(e) {
        this.setState({
            answer: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            answer: this.state.answer
        }

        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);

        axios.post('http://localhost:5000/exercise/answer2/' + id, exercise, {
            headers: {
                'authorization': sessionStorage.token
            }
        })
            .then(res => {
                alert('Answered .. !!')
                this.props.history.push('/exercise/Answer')
            })
            .catch(err => {
                console.log(err)
            })
    }



    render() {
        if (sessionStorage.token)
            return (
                <div className=" container parent">
                    <div><h3>Type your answer here:</h3></div>
                    <textarea value={this.state.answer} onChange={this.onChangeAnswer} className="answer-inp" placeholder="Write answer here !!!!!" type="text"></textarea>
                    <button onClick={this.onSubmit} className="btn btn-info btn-lg but-ask">ANSWER</button>
                </div>
            );
        else
            return <Redirect to='/user/login' />
    }
}

export default Answer2;