import React from 'react';
import styles from './validNewUserName.module.css'


class ValidNewUserName extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidNewUserName}>Username already in use!</div>

        );
    }

}

export default ValidNewUserName;