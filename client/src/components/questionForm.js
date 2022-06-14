import styles from './questionForm.module.css';
import React from 'react';
import ValidTitle from './validQ/validTitle'
import ValidText from './validQ/validText'
import ValidTag from './validQ/validTag'
import ValidUser from './validQ/validUser'
import axios from 'axios';




class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inValidTitle: false,
            inValidText: false,
            inValidTag: false,
            inValidName: false,
            invalidSpecTitle: "invalid title",
            inValid: null,
            currU: this.props.currUser
        }
    }

    handlerInvalidTitle = (textE) => {
        this.setState({
            invalidSpecTitle: textE,
            inValidTitle: true
        })
    }
    handlerInvalidText = () => {
        this.setState({
            inValidText: true
        })
    }
    handlerInvalidTag = () => {
        this.setState({
            inValidTag: true
        })
    }
    handlerValidTitle = () => {
        this.setState({
            inValidTitle: false
        })
    }
    handlerValidText = () => {
        this.setState({
            inValidText: false
        })
    }
    handlerValidTag = () => {
        this.setState({
            inValidTag: false
        })
    }

    isValidQ = async (e) => {
        e.preventDefault();
        let currU = this.props.currUser;


        let QTitle = document.getElementById(styles["QTitle"]);
        let QText = document.getElementById(styles["QText"]);
        let QTag = document.getElementById(styles["QTag"]);
        if (QTitle.value.length > 100) {
            let temp = "Title cannot be greater than 100 characters"
            this.handlerInvalidTitle(temp);
            this.state.inValidTitle = true
            this.state.invalidSpecTitle = temp
        }
        else if (QTitle.value.length === 0) {
            let temp = "Title cannot be empty";
            this.handlerInvalidTitle(temp);
            this.state.inValidTitle = true
            this.state.invalidSpecTitle = temp
        }
        else {
            this.state.inValidTitle = false
            this.handlerValidTitle();
        }
        if (QText.value.length === 0) {
            this.handlerInvalidText()
            this.state.inValidText = true
        }
        else {
            this.state.inValidText = false
            this.handlerValidText()
        }
        let newKeyWords = document.getElementById(styles["QTag"]).value.split(" ");
        let tidArr = [];
        let modelTags = this.props.modelTags;
        for (let i = 0; i < newKeyWords.length; i++) {
            if (modelTags.some((x) => x.name === newKeyWords[i])) {
                tidArr.push(
                    modelTags.find((x) => x.name === newKeyWords[i])
                );
            } else {
                if (currU.reputation < 100) {
                    this.handlerInvalidTag();
                    this.state.inValidTag = true;
                    break;
                }
                else {
                    let T = {
                        name: newKeyWords[i],
                        createdBy: this.props.currUser.username
                    };
                    await axios.post('http://localhost:8000/addTag', T);
                    tidArr.push(T);
                }

            }
        }
        // if (QTag.value.length === 0) {
        //   this.handlerInvalidTag()
        //   this.state.inValidTag = true
        // }
        // else {
        //     this.state.inValidTag = false;
        //     this.handlerValidTag()
        // }

        if (this.state.inValidName === false && this.state.inValidText === false && this.state.inValidTitle === false && this.state.inValidTag === false) {
            this.submitQuestion(tidArr)
        }
        else {
            return false
        }
    }

    submitQuestion = async (tidArr) => {

        let questionData = {
            title: document.getElementById(styles["QTitle"]).value,
            text: document.getElementById(styles["QText"]).value,
            tags: tidArr,
            asked_by: this.props.currUser.username,
            answers: [],
            comments: []
        }

        this.props.handlerModelUpdate(questionData)
    }

    // }

    render() {
        const { inValidTitle, inValidText, inValidTag, inValidName } = this.state

        return (
            <div id={styles["wholePage"]}>
                <div id={styles["qFormTitle"]}>
                    Ask a public question
                </div>
                <form id={styles["QuestionForm"]}>

                    <div id={styles["questionContainer"]}>
                        {inValidTitle && <ValidTitle invalidSTitle={this.state.invalidSpecTitle} />}
                        {inValidText && <ValidText />}
                        {inValidTag && <ValidTag currU={this.state.currU} />}
                        <label id={styles["QT1"]}>Title</label> <br />
                        <div className={styles.desc}>Be specific and imagine you're asking a question to another person</div>
                        <input type="text" id={styles["QTitle"]} name="QTitle" /><br />

                        <label id={styles["QT2"]}>Question Text</label>
                        <div className={styles.desc}>Include all the information someone would need to answer your question</div>
                        <textarea type="text" id={styles["QText"]} rows="8" name="QText" /> <br />

                        <label id={styles["QT3"]}>Tags</label>
                        <div className={styles.desc}>Add keywords separated by whitespace.</div>
                        <input type="text" id={styles["QTag"]} name="QTag" /> <br />
                    </div>

                    <div id={styles["buttonContaienr"]}>
                        <input type="button" id={styles["QPost"]} value="Post Questions" onClick={this.isValidQ} />
                    </div>

                </form>
            </div>
        )
    }
}

export default QuestionForm;