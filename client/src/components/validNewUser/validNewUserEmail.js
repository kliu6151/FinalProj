import React from 'react';
import styles from './validNewUserName.module.css'


class ValidNewUserEmail extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidNewUserName}>invalid Email!</div>

        );
    }

}

export default ValidNewUserEmail;