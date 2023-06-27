import PropTypes from "prop-types";

import { ErrorMessage, useField } from "formik";

import styles from "styles/UIStyles/FormComponents.module.scss";

export const Select = ({
    children,
    label,
    onChange,
    customClass,
    name = "select",
    disabled = false,
    ...props
}) => {
    const [field] = useField(name);

    return (
        <div className={`${styles.inputContainer} ${styles[customClass]}`}>
            <label className={styles.label}>{label}</label>

            <select
                className={`${styles.select}`}
                disabled={disabled}
                name={name}
                {...props}
                onChange={onChange ? onChange : field.onChange}
            >
                {children}
            </select>

            <ErrorMessage
                className={styles.errorMsg}
                component={"p"}
                name={name}
            />
        </div>
    );
};

Select.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    customClass: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    props: PropTypes.string,
};
