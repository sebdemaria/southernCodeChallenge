import PropTypes from "prop-types";

import { NextImage as Image } from "components/UI";

import styles from "styles/componentStyles/RoverPhotos.module.scss";

export const RoverPhotosGrid = ({ data }) => {
    return (
        <div className={styles.rover_photos}>
            {data?.photos?.map(({ img_src }, index) => (
                <Image
                    alt="rover photo"
                    className={styles.photo}
                    key={index}
                    img_src={img_src}
                    height={200}
                    priority
                    width={200}
                />
            ))}
        </div>
    );
};

RoverPhotosGrid.propTypes = {
    data: PropTypes.array.isRequired,
};
