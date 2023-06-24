import PropTypes from "prop-types";

import Image from 'next/image';

export const NextImage = ({ img_src, alt = "photo", ...props }) => {
    return (
        <Image alt={alt} src={img_src} {...props} />
    )
}

NextImage.propTypes = {
    img_src: PropTypes.string,
    alt: PropTypes.string,
    props: PropTypes.string,
};
