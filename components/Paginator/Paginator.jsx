import PropTypes from "prop-types";
import { useAppContext } from "hooks";

import { Button } from "components/UI";

import styles from "styles/componentStyles/Paginator.module.scss";

export const Paginator = ({ data, disabled = false }) => {
    const { pageIndex, setPageIndex } = useAppContext();

    return (
        <div className={styles.buttonContainer}>
            <Button
                customClass={"paginatorBtn"}
                disabled={pageIndex === 1 || disabled ? true : false}
                onClick={() => setPageIndex(pageIndex - 1)}
            >
                {"<"}
            </Button>

            <p>{pageIndex}</p>

            <Button
                customClass={"paginatorBtn"}
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
    data: PropTypes.object,
    disabled: PropTypes.bool,
};
