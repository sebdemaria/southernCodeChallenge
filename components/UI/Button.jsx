import PropTypes from "prop-types";

import styles from "styles/UIStyles/Button.module.scss";

export const Button = ({
    handleClick,
    children,
    disabled = false,
    type = "button",
    ...props
}) => {
    return (
        <button
            className={styles.button}
            disabled={disabled}
            onClick={handleClick}
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
