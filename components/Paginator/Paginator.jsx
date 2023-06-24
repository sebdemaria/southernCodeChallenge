import { Button } from "components/UI";

import styles from "styles/componentStyles/Paginator.module.scss";

export const Paginator = ({ pageIndex, setPageIndex }) => {
    return (
        <div className={styles.buttonContainer}>
            <Button onClick={() => setPageIndex(pageIndex - 1)}>
                Previous
            </Button>
            <Button onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
        </div>
    );
};
