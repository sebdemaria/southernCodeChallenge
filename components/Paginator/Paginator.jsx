import { Button } from "components/UI";

import styles from "styles/componentStyles/Paginator.module.scss";

export const Paginator = ({
    data,
    pageIndex,
    setPageIndex,
    disabled = false,
}) => {
    return data?.photos?.length && pageIndex > 0 ? (
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
    ) : null;
};
