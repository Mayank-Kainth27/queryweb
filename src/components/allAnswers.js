import React, { Component } from 'react';
import './css_files/allAnswers_css.css';
import axios from 'axios';


class AllAnswers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subjectName: '',
            question: '',
            answer: []
        }
    }

    fetchData = () => {
        var url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        axios.get('http://localhost:5000/exercise/allAnswer/' + id, {
            headers: {
                'authorization': sessionStorage.token
            }
        })
            .then(response => {
                console.log("Response is " + response)
                this.setState({ subjectName: response.data.subjectName, question: response.data.question, answer: response.data.answer })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    answerList() {
        return this.state.answer.map(currentAnswer => {
            return <textarea className="allp" value={currentAnswer} > </textarea>
        })
    }

    questionList() {
        return <h5>{this.state.question}</h5>
    }

    subjectList() {
        return <h5>{this.state.subjectName}</h5>
    }




    render() {
        return (
            <div className="parent container">
                <h3 className="ff-h">Subject :</h3>
                <div className="subj-div">{this.subjectList()}</div>
                <h3 className="ff-h">Question :</h3>
                <div className="ques-div">{this.questionList()}</div>
                <h3 className="ff-h">Answers :</h3>
                <div className="ans-div">
                    {this.answerList()}
                </div>
            </div>
        )
    }
}

export default AllAnswers;