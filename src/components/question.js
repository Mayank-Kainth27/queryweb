import React, { Component } from 'react';
import './css_files/question_css.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


class Question extends Component {
    constructor(props) {
        super(props);

        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            subjectName: '',
            question: '',
            answer: []
        }
    }

    onChangeSubject(e) {
        this.setState({
            subjectName: e.target.value
        });
    }

    onChangeQuestion(e) {
        this.setState({
            question: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            subjectName: this.state.subjectName,
            question: this.state.question
        }

        if (exercise.subjectName !== '' && exercise.question !== '') {
            axios.post('http://localhost:5000/exercise/addques', exercise, {
                headers: {
                    'authorization': sessionStorage.token
                }
            })
                .then(res => {
                    alert("Question Asked")
                    this.props.history.push('/exercise/main')
                })

        }
        else {
            alert('Please fill both the fields !')
        }
    }





    render() {
        if (sessionStorage.token)
            return (
                <div className="container parent-ques">
                    <h1 className="hmain">Ask Your Question .....</h1><hr className="parent-hr"></hr>
                    <div className="child-1">
                        <input required="true" type="text" className="border border-primary border-top-0 border-left-0 border-right-0 inp-subj" placeholder="Enter Subject :   e.g. Maths" value={this.setState.subjectName} onChange={this.onChangeSubject} ></input>
                    </div>
                    <div className="child-2">
                        <textarea required="true" type="text" className="inp-ques border-primary border border-left-0 border-top-0 border-right-0" placeholder="Type your question here" value={this.setState.question} onChange={this.onChangeQuestion}></textarea>
                    </div>
                    <div className="child-3">
                        <button onClick={this.onSubmit} className="btn btn-info btn-lg but-ask">ASK</button>
                    </div>
                </div>
            );
        else
            return <Redirect to='/user/login' />
    }
}

export default Question;