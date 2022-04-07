import PropTypes from "prop-types";
import styles from './Button.module.css';

function Button({text, clickHandler}) {
    return (
        <button className={styles.btn} onClick={clickHandler}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}



export default Button