import styles from './signUp.module.css';
import React from 'react';
import ValidNewUserName from './validNewUser/validNewUserName';
import ValidNewUserEmail from './validNewUser/validNewUserEmail';
import ValidNewUserPassword from './validNewUser/validNewUserPassword';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            u: null,
            e: null,
            p: null,
            pr: null,
            invalidPw: false,
            invalidE: false,
            invalidU: false
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
    //Go into the database to see if the user exists
    // isValidSignUp = () => {
    //     var userDb = this.props.dataU;
    //     console.log(userDb);
    //     let isValid = true; 
    //     if(userDb.some(e => e.username === this.state.u)) {
    //         // console.log("HEH")
    //         this.setState({invalidE: true});
    //         isValid = false;
    //     }
    //     if(userDb.some(e => e.email === this.state.e)) {
    //         this.setState({invalidU: true});
    //         isValid = false;
    //     }
    //     if(this.state.p !== this.state.pr) {
    //         this.setState({invalidPw: true});
    //         isValid = false;
    //     }

    //     if(isValid) {
    //         this.registerNewUser();
    //     }
        
    // }

    registerNewUser = (e) => {
        e.preventDefault();

        var userDb = this.props.dataU;
        console.log(userDb);
        let isValid = true; 
        if(userDb.some(e => e.username === this.state.u)) {
            // console.log("HEH")
            this.setState({invalidE: true});
            isValid = false;
        }
        else {
            this.setState({invalidE: false});
        }
        if(userDb.some(e => e.email === this.state.e)) {
            this.setState({invalidU: true});
            isValid = false;
        }
        else {
            this.setState({invalidU: false});

        }
        if(this.state.p !== this.state.pr) {
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
    //So i would have to add onChange to all of them?
    // Please let me explain The method you were using is not professional sorry to tell you that 
    // Yes, you have to add one function on each input and then with just one line you are gettting values adn names of each input
    // whereever you will add that function on whatever input for submit you need to create another fucntion to grab latest and final
    // text added by user and so you can process or send data to backend etc 
    // Do you have any question and one more thing i guess i can teach you more things and believe me it will save tons of your time 
    // you will tahnks me later but for that we need a proper meerting were i can show you those tricks and how to save your time 
    // no one use class components these days seriously functional components in react are next leve because of hooks like useState and ?useEffec
    // You can speak now ....please 
    //Yea this is for my final project and I was just reusing code from prev homeworks where he didn't allow me to use react hooks and routers
    //But I feel like it'll take too much time to switch up this project to using hooks and router
    // Also, my friend may need help w this project, I could send you the project information and you can let me know the pricing on it too.
    //That would be gerate and thank you very much .... i would love to work on this or your friends new project 
    // I'm free htese days and can't evne do project even can expalin/teach things 
    //  How much should i charge you for this task ??? so i can send you request ????
    // .....
    // Well it was really simple. How much do oyu think it's 
    //  smallest order we can do is $5 on fiverr but i can help you more if you have any issue something like this in future free
    //  So i guess $5 and a fiver star feedback that's all i need from you ..... can you do that ????
    // So are you saying to pay you in the future? Cause I will most likely be in contact with you
    // Hm how about this, I can send you the $5 now but u can help me more in the future if I need help, I feel like i'm going to run into an issue with
    // mongodb and using bcrypt for user passwords and stuff. After you help me with that, I can also write a 5 star review for u
    // I will do resolve small isue like this one for free in future BUT hey for complex or extra work you have to pay extra 
    // How about this ??? complete 5 order with 5 star review like i resolve your issue within 5 minutes and i owe you to resolve one small issue liekt his free  
    //  what sdo you think ???
    // Okay sounds fine for me. I'm going to send u the documents for the project in a bit so you can look at that and decide on the pricing too.
    //It's essentially creating a fake stackoverflow website using react,express, mongodb or mysql, and bcrypt
    //So do you request me the money on fiverr? idk how it works 

    // I send the offer accept it and then i will deliver some dummy data and you have to accept and then i will get paid and you can leave 5 star feedback
    //Okay sounds good
    // I got what's the issue give me one minute  my code fron project 
    render() {
        const{ invalidU, invalidE, invalidPw} = this.state

        

        return (
            


            <div id = {styles["bg"]}> <span id = {styles["title"]}>Register</span>
                
                {invalidPw && <ValidNewUserPassword />}
                {invalidE && <ValidNewUserEmail />}
                {invalidU && <ValidNewUserName />}

                <div className={styles.logIn}>
                    <form id = {styles["wholeForm"]} onSubmit={this.registerNewUser} >
                        <label for = "signName">
                            <b>User Name</b>    
                        </label>    
                            <input type="text" id= {styles["signName"]} onChange = {this.handleUserChange} name="signName" placeholder="Username" />    
                        <br/>
                        
                        <label>
                            <b>Email</b>    
                        </label>   
                        <input type="text" name="Email" id={styles["signEmail"]} onChange = {this.handleEmailChange} placeholder="Email" />   
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