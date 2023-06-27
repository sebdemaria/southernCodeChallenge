import PropTypes from "prop-types";

import styles from "styles/UIStyles/Button.module.scss";

export const Button = ({
    handleClick,
    children,
    disabled = false,
    type = "button",
    customClass,
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${styles[customClass]}`}
            disabled={disabled}
            onClick={handleClick}
            role="button"
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    props: PropTypes.string,
};
