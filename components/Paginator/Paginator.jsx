import PropTypes from "prop-types";

import { Button } from "components/UI";

import styles from "styles/componentStyles/Paginator.module.scss";

export const Paginator = ({
    data,
    pageIndex,
    setPageIndex,
    disabled = false,
}) => {
    return (
        <div className={styles.buttonContainer}>
            <Button
                disabled={pageIndex === 1 || disabled ? true : false}
                onClick={() => setPageIndex(pageIndex - 1)}
            >
                {"<"}
            </Button>
            <p>{pageIndex}</p>
            <Button
                disabled={
                    !data?.photos?.length ||
                    data?.photos?.length < 25 ||
                    disabled
                        ? true
                        : false
                }
                onClick={() => setPageIndex(pageIndex + 1)}
            >
                {">"}
            </Button>
        </div>
    );
};

Paginator.propTypes = {
    data: PropTypes.array.isRequired,
    pageIndex: PropTypes.number.isRequired,
    setPageIndex: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
