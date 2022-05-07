import React from 'react';
import styles from './validNewUserName.module.css'


class ValidNewUserPassword extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidNewUserName}>Passwords don't match!</div>

        );
    }

}

export default ValidNewUserPassword;