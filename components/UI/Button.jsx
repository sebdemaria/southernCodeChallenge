import PropTypes from "prop-types";

export const Button = ({
    handleClick,
    children,
    disabled = false,
    type = "button",
    ...props
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={handleClick}
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
