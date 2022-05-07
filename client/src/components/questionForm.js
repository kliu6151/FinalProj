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
        this.state =  {
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
    handlerValidTitle= () => {
        this.setState({
            inValidTitle: false
        })
    }
    handlerValidText = () => {
        this.setState({
            inValidText: false
        })
    }
    handlerValidTag = () =>{
        this.setState({
            inValidTag: false
        })
    }
    
    isValidQ = async() =>  {
        
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
                if(currU.reputation < 100) {
                    this.handlerInvalidTag();
                    this.state.inValidTag = true;
                    break;
                }
                else {
                    let T = {
                        name: newKeyWords[i],
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

    if(this.state.inValidName === false && this.state.inValidText === false && this.state.inValidTitle === false && this.state.inValidTag === false) {
        this.submitQuestion()
    }
    else {
        return false
    }   
  }

    submitQuestion = async () => {

        let newKeyWords = document.getElementById(styles["QTag"]).value.split(" ");
        let tidArr = [];
        let modelTags = this.props.modelTags;
        for (let i = 0; i < newKeyWords.length; i++) {
            if (modelTags.some((x) => x.name === newKeyWords[i])) {
                tidArr.push(
                modelTags.find((x) => x.name === newKeyWords[i])
                );
            } else {

                    let T = {
                        name: newKeyWords[i],
                    };
                    await axios.post('http://localhost:8000/addTag', T);
                    tidArr.push(T);
                
            }
        }
        let questionData = {
            title: document.getElementById(styles["QTitle"]).value,
            text: document.getElementById(styles["QText"]).value,
            tags: tidArr,
            asked_by: this.props.currUser.username,
            answers: []
        }

        this.props.handlerModelUpdate(questionData)
        }

    // }

    render() {
            const{ inValidTitle, inValidText, inValidTag, inValidName} = this.state

    return (
        <form id = {styles["QuestionForm"]}>

        
        {inValidTitle && <ValidTitle invalidSTitle = {this.state.invalidSpecTitle}  />}
        {inValidText && <ValidText  />}
        {inValidTag && <ValidTag currU = {this.state.currU}/>}
            <label id = {styles["QT1"]}>Question Title</label> <br />
            <div><i>This should not be more than 100 characrers</i></div>
            <input type = "text" id = {styles["QTitle"]} name = "QTitle" /><br />

            <label id = {styles["QT2"]}>Question Text</label>
            <div><i>Add details.</i></div>
            <input type = "text" id = {styles["QText"]} name = "QText" /> <br />

            <label id = {styles["QT3"]}>Tags</label>
            <div><i>Add keywords separated by whitespace.</i></div>
            <input type = "text" id = {styles["QTag"]} name = "QTag" /> <br />

            <input type ="button" id= {styles["QPost"]} value = "Post Questions" onClick={this.isValidQ} />


 
        </form>
    )
    }
}

export default QuestionForm;