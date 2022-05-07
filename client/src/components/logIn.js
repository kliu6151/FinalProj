import styles from './logIn.module.css';
import React from 'react';
import axios from 'axios';
import ValidNewUserEmail from './validNewUser/validNewUserEmail';
import ValidNewUserPassword from './validNewUser/validNewUserPassword';



class LogIn extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            e: null,
            p: null,
            User: null,
            invalidPw: false,
            invalidE: false
        }
    }

    handleEmailChange = (e) => {
        this.setState({e: e.target.value})
    }
    handlePwChange = (e) => {
        this.setState({p: e.target.value})
    }
    

    //Go into the database to see if the user exists
    //Now i gotta figure out how to call my password Checker function
    isValidLogIn = async (e) => {
        e.preventDefault();

        var userDb = this.props.dataU;
        let isValid = true; 
        let U = null;
        // console.log("in here");
        // console.log(this.state.e);
        let x = userDb.find(c => c.email);
        if(x.email === this.state.e) {
            let U = {
                username: x.username,
                email: this.state.e,
                password: this.state.p,
                reputation: x.reputation,
                votedOn: x.votedOn
            }
            // console.log(x);
            let isBadPw = true;
            axios.post('http://localhost:8000/login', U).then ((resp) =>  {
                isBadPw = false;
                if(resp.statusText === "OK") {
                    this.props.handlerForReturningUser(U);
                }
            });
            if(isBadPw) {
                this.setState({invalidPw : true})

            }
            // console.log(fetch('http://localhost:8000/login'))
        }
        else {
            this.setState({invalidPw : false})
            this.setState({ invalidE : true})
        }
        // else {
            // this.setState({invalidU: true});
            // isValid = false;
            
        // }    

    }

    signUp = (e) => {
        this.props.handlerForSignUpPage();
    }

    render() {
        const{ invalidE, invalidPw} = this.state

    return (
        <div id = {styles["bg"]}> <span id = {styles["title"]}>Log In Page</span>

                {invalidPw && <ValidNewUserPassword />}
                {invalidE && <ValidNewUserEmail />}

            <div className={styles.logIn}>
                <form id = {styles["wholeForm"]} onSubmit = {this.isValidLogIn}>
                    
                    <label>
                        <b>Email</b>    
                    </label>   
                    <input type="text" name="Email" id={styles["logEmail"]} onChange = {this.handleEmailChange} placeholder="Email" />   
                    <br/>

                    <label>
                        <b>Password</b>    
                    </label> 
                    <input type="text" name="Pass" id={styles["logPass"]} onChange = {this.handlePwChange} placeholder="Password" />   
                    <br/>

                    <input type="submit" name="log" id={styles["log"]} value="Log In Here"/>   
                    <br/>

                    <div id = {styles["newUser"]}>New User? <span onClick = {this.signUp} id = {styles["signUp"]}>Sign Up</span></div>
                    <div id = {styles["guest"]} onClick = {this.guestMode}>Continue As Guest</div>

                </form>
            </div>
        </div>
    );
    }   
}

export default LogIn;