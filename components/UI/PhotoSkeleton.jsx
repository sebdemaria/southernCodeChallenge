import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";

import styles from "styles/UIStyles/PhotosSkeleton.module.scss";

const skeletons_amount = 25;

export const PhotoSkeleton = (props) => (
    <div className={styles.skeletonContainer}>
        {Array(skeletons_amount).fill(
            <ContentLoader
                key={Math.random()}
                backgroundColor="#fff"
                foregroundColor="#b2b1b9"
                height={200}
                opacity={0.3}
                style={{ borderRadius: "10px" }}
                viewBox="0 0 500 500"
                width={200}
                {...props}
            >
                <rect width="500" height="500" />
            </ContentLoader>
        )}
    </div>
);

PhotoSkeleton.propTypes = {
    props: PropTypes.string,
};
