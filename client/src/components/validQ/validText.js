import React from 'react';
import styles from './validQ.module.css'


class ValidText extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidQ}>Text cannot be empty</div>

        );
    }

}

export default ValidText;