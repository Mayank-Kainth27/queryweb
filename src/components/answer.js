import React, { Component } from 'react';
import './css_files/answer_css.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Answer extends Component {
    constructor(props) {
        super(props);

        this.onChangefilter = this.onChangefilter.bind(this);
        this.quesList = this.quesList;


        this.state = {
            filter: '',
            subjectName: '',
            question: '',
            exercises: []
        }
    }

    fetchData = () => {
        axios.get('http://localhost:5000/exercise/queslist', {
            headers: {
                'authorization': sessionStorage.token
            }
        })
            .then(response => {
                console.log(response.data.subjectName)
                this.setState({ exercises: response.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.fetchData();
    }

    onChangefilter(e) {
        this.setState({
            filter: e.target.value
        });
    }

    quesList() {
        return this.state.exercises.map(currentExercise => {
            if (this.state.filter === '')
                return <tr key={currentExercise._id}>
                    <td className="ques-1">{currentExercise.subjectName}</td>
                    <td className="ques-2">{currentExercise.question}</td>
                    <td className="ques-3"><Link to={"/exercise/answer2/" + currentExercise._id} className="ques-3-lnk">Answer</Link><br></br>
                        <Link to={"/exercise/allAnswers/" + currentExercise._id} className="ques-3-lnk">All Answers</Link>
                    </td>
                </tr >
            else
                if (currentExercise.subjectName == this.state.filter)
                    return <tr key={currentExercise._id}>
                        <td className="ques-1">{currentExercise.subjectName}</td>
                        <td className="ques-2">{currentExercise.question}</td>
                        <td className="ques-3"><Link to={"/exercise/answer2/" + currentExercise._id} className="ques-3-lnk">Answer</Link><br></br>
                            <Link to={"/exercise/allAnswers/" + currentExercise._id} className="ques-3-lnk">All Answers</Link>
                        </td>
                    </tr >
        })
    }

    /*filterres() {
        return this.state.exercises.map(currentExercise => {
            return <tr key={currentExercise._id}>
                <td className="ques-1">{currentExercise.subjectName}</td>
                <td className="ques-2">{currentExercise.question}</td>
                <td className="ques-3"><Link to={"/exercise/answer2/" + currentExercise._id} className="ques-3-lnk">Answer</Link><br></br>
                    <Link to={"/exercise/allAnswers/" + currentExercise._id} className="ques-3-lnk">All Answers</Link>
                </td>
            </tr >
        })
    }*/


    render() {
        if (sessionStorage.token)
            return (
                <div className="container parent-ans">
                    <h1 className="parent-h">See Answers / Add Your Answer .....</h1><hr className="parent-hr"></hr>
                    <label>Enter subject here to Search: </label><input type="text" placeholder="Enter here..." value={this.setState.filter} onChange={this.onChangefilter} />
                    <table className="ques-tab">
                        <thead>
                            <tr>
                                <td className="ques-1"><h2>Subjects</h2></td>
                                <td className="ques-2"><h2>Questions</h2></td>
                                <td className="ques-3"><h2>Answer</h2></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.quesList()}
                        </tbody>
                    </table>
                </div>
            );
        else
            return <Redirect to='/user/login' />
    }
}

export default Answer;