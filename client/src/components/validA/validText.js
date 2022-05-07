import React from 'react';
import styles from './validA.module.css'


class ValidText extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidA}>Text cannot be empty</div>

        );
    }

}

export default ValidText;