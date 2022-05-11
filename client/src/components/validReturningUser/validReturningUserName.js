import React from 'react';
import styles from './validReturningUserName.module.css'


class ValidReturningUserName extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidReturningUserName}>Incorrect email/password!</div>

        );
    }

}

export default ValidReturningUserName;