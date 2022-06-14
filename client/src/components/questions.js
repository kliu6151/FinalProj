import styles from './questions.module.css'
import React from 'react';


class Questions extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {

    return (
            <div id = {styles["Questions"]}>
                <div>
                    Ask a public question
                </div>
                <table id = {styles["QHeader"]}>
                    <tbody>
                        <tr id = {styles["headings"]}>
                            <th id = {styles["H2"]}>{this.props.titleQuestions}</th>
                            <th id = "H3">
                                <button id = {!this.props.guestMode ? styles["AMA"] : styles["NOAMA"]} onClick={this.props.handlerHidingForQForms}> {!this.props.guestMode ? "Ask A Question" : null}</button>
                                {/* <span>{(this.props.insideAQ && this.props.guestMode) ? "Votes: " + this.props.currVotes : null}</span> */}
                            </th>
                            {/* <th id = {styles["H4"]}>
                                {(this.props.insideAQ && !this.props.guestMode) ? "Votes: " + this.props.currVotes : null}
                            </th> */}
                        </tr>
                        <tr>
                        <th id = {styles["H1"]}> <span id = {styles["QCounter"]}>{this.props.numQuestions}</span> <span id = {styles["QorA"]}>{this.props.sectionType}</span></th>

                        </tr>
                    </tbody>
                </table>
            </div>
    );
    }   
}


export default Questions;