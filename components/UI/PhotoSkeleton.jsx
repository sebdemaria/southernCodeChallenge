import React from "react";
import ContentLoader from "react-content-loader";

import styles from "styles/UIStyles/PhotosSkeleton.module.scss";

const skeletons_amount = 25;

export const PhotoSkeleton = (props) => (
    <div className={styles.skeletonContainer}>
        {Array(skeletons_amount).fill(
            <ContentLoader
                width={200}
                height={200}
                viewBox="0 0 500 500"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect width="500" height="500" />
            </ContentLoader>
        )}
    </div>
);