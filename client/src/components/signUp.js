import styles from './signUp.module.css';
import React from 'react';
import ValidNewUserName from './validNewUser/validNewUserName';
import ValidNewUserEmail from './validNewUser/validNewUserEmail';
import ValidNewUserPassword from './validNewUser/validNewUserPassword';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            u: "",
            e: "",
            p: "",
            pr: "",
            invalidPw: false,
            invalidE: false,
            invalidU: false,
            invalidPwNS: false
        }
        
    }
    handleUserChange = (e) => {
        this.setState({u: e.target.value})
    }
    handleEmailChange = (e) => {
        this.setState({e: e.target.value})
    }
    handlePwChange = (e) => {
        this.setState({p: e.target.value})
    }
    handlePwRChange = (e) => {
        this.setState({pr: e.target.value})
    }

    registerNewUser = (e) => {
        e.preventDefault();

        var userDb = this.props.dataU;
        let isValid = true; 
        if(userDb.some(e => e.username === this.state.u) || this.state.u.length === 0) {
            this.setState({invalidE: true});
            isValid = false;
        }
        else {
            this.setState({invalidE: false});
        }
        if(userDb.some(e => e.email === this.state.e) || this.state.e.length === 0) {
            this.setState({invalidU: true});
            isValid = false;
        }
        else {
            this.setState({invalidU: false});

        }
        if(this.state.p.length !== 0 && ((this.state.p.includes(this.state.u)) || this.state.p.includes(this.state.e))) {
            this.setState({invalidPwNS: true});
            isValid = false;
        }
        else if(this.state.p !== this.state.pr) {
            this.setState({invalidPw: true});
            isValid = false;
        }
        else {
            this.setState({invalidPw: false});
        }
        if(isValid) {
            let U = {
                username: this.state.u,
                email: this.state.e,
                password: this.state.p
            }
            this.props.handlerForRegister(U);
        }
    }
    
    handlerForLoggingIn =(e) => {
        e.preventDefault();
        this.props.handlerForLoggingIn();
    }
    render() {
        const{ invalidU, invalidE, invalidPw, invalidPwNS} = this.state

        

        return (
            


            <div id = {styles["bg"]}> <span id = {styles["title"]}>Register</span>
                
                {(invalidPw || invalidPwNS) && <ValidNewUserPassword invalidPw = {this.state.invalidPw}
                                                                    invalidPwNS = {this.state.invalidPwNS}/>}
                {invalidE && <ValidNewUserEmail />}
                {invalidU && <ValidNewUserName />}

                <div className={styles.logIn}>
                    <span onClick ={this.handlerForLoggingIn}>&#x2190;</span>
                    <form id = {styles["wholeForm"]} onSubmit={this.registerNewUser} >
                        <label for = "signName">
                            <b>User Name</b>    
                        </label>    
                            <input type="text" id= {styles["signName"]} onChange = {this.handleUserChange} name="signName" placeholder="Username" />    
                        <br/>
                        
                        <label>
                            <b>Email</b>    
                        </label>   
                        <input type="email" name="Email" id={styles["signEmail"]} onChange = {this.handleEmailChange} placeholder="Email" />   
                        <br/>

                        <label>
                            <b>Password</b>    
                        </label> 
                        <input type="text" name="Pass" id={styles["signPass"]} onChange = {this.handlePwChange} placeholder="Password" />   
                        <br/>

                        <label>
                            <b>Retype your password</b>    
                        </label> 
                        <input type="text" name="PassAuth" id={styles["signPassAuth"]} onChange = {this.handlePwRChange} placeholder="Retype your password" />   
                        <br/>

                        <input type="submit" name="log" id={styles["register"]} value="Register"  />   
                        <br/>

                    </form>
                </div>
            </div>
        );
    }   
}

export default SignUp;