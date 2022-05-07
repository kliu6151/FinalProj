import styles from './answerForm.module.css';
import React from 'react';
import ValidText from './validA/validText'
import ValidUser from './validA/validUser'




class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            inValidText: false,

        }
    }
    
    handlerInvalidText () {
        this.setState({
            inValidText: true
        })
    }
  
    handlerValidText () {
        this.setState({
            inValidText: false
        })
    }



    isValidA = () =>  {

        
    let QText = document.getElementById(styles["AText"]);
    let QName = document.getElementById(styles["AUser"]);
    if (QText.value.length-1 === 0) {
        this.handlerInvalidText()
    }
    else {
        this.handlerValidText()
    }
    //IF ALL IS TRUE RUN SUBMIT QUESTION()
    this.submitAnswer()
  }




    submitAnswer = () =>{
      
    
    let A = {
      text: document.getElementById(styles["AText"]).value,
      ans_by: this.props.currUser.username,
    };
        try{
        this.props.handlerModelAUpdate(A)
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
            const{inValidText, inValidName} = this.state

    return (
        <div id = "AnswerForm">

        {inValidText && <ValidText />}
        {inValidName && <ValidUser invalidSUser = {this.state.invalidSpecUser} />}

            <label for = "AText" id = {styles["AT1"]}>Answer Text</label>
            <textarea id = {styles["AText"]} name = "AText"> </textarea> 

            <input type = "submit" id = {styles["APost"]} value = "Answer Question" onClick = {this.isValidA} />
        </div>


    )
    }
}

export default AnswerForm;