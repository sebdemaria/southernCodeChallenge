import PropTypes from "prop-types";

export const Select = ({ handleSelected, children }) => {
    return (
        <select onChange={(e) => handleSelected(e.target.value)}>
            {children}
        </select>
    );
};

Select.propTypes = {
    handleSelected: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
