import Classes from './welcome.module.css';
import React from 'react';



class Welcome extends React.Component {
    constructor(props) {
        super(props);
        
    }

    logIn = () => {
        this.props.handlerForLogInPage();
    }

    signUp = () => {
        this.props.handlerForSignUpPage();
    }

    guestMode = () => {
        this.props.handlerForGuestMode();
    }

    render() {

    return (
        <section className={Classes.welcome}>
            <header>Welcome!</header>
            <h1>FAKE STACK OVERFLOW</h1>
            <h2 id = {Classes["returningUser"]}>Returning User? <span onClick = {this.logIn} id = {Classes["logIn"]}>Log In</span></h2>
            <h2 id = {Classes["newUser"]}>New User? <span onClick = {this.signUp} id = {Classes["signUp"]}>Sign Up</span></h2>
            <h2 id = {Classes["or"]}> OR </h2>
            <h2 id = {Classes["guest"]} onClick = {this.guestMode}>Continue As Guest</h2>
        </section>
    );
    }   
}

export default Welcome;