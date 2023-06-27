import PropTypes from "prop-types";

import { ErrorMessage, useField } from "formik";

import styles from "styles/UIStyles/FormComponents.module.scss";

export const Input = ({
    helperText,
    onChange,
    disabled,
    id,
    name,
    max,
    type,
    label,
    value,
    ...props
}) => {
    const [field, meta] = useField(name);

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                className={styles.input}
                disabled={disabled}
                id={id}
                max={max}
                name={name}
                onChange={onChange ? onChange : field.onChange}
                type={type}
                value={value || field.value}
                {...props}
            />
            {meta.error ? (
                <ErrorMessage
                    className={styles.errorMsg}
                    component={"p"}
                    name={name}
                />
            ) : (
                <p className={styles.helperText}>{helperText || " "}</p>
            )}
        </div>
    );
};

Input.propTypes = {
    defaultValue: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    id: PropTypes.string || PropTypes.number,
    name: PropTypes.string,
    helperText: PropTypes.string,
    max: PropTypes.number,
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    props: PropTypes.string,
};
