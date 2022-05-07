import React from 'react';
import styles from './validA.module.css'


class ValidUser extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className = {styles.invalidA}>{this.props.invalidSUser}</div>

        );
    }

}

export default ValidUser;