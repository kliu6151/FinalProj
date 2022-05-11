import React from 'react';
import styles from './validNewUserName.module.css'


class ValidNewUserPassword extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidNewUserName}>{this.props.invalidPwNS ? "Make a better password" : null} {this.props.invalidPw ? "Passwords don't match" : null}</div>
        );
    }

}

export default ValidNewUserPassword;