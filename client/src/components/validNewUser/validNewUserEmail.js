import React from 'react';
import styles from './validNewUserName.module.css'


class ValidNewUserEmail extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidNewUserName}>Email already in use!</div>

        );
    }

}

export default ValidNewUserEmail;