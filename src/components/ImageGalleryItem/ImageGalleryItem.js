import React from "react";
import PropTypes from "prop-types";

import styles from "./ImageGalleryItem.module.css";
const ImageGalleryItem = ({ src, largeImage, tags }) => {
  return (
    <>
      <img
        src={src}
        alt={tags}
        data-url={largeImage}
        className={styles.ImageGalleryItem__image}
      />
    </>
  );
};
ImageGalleryItem.defaultProps = {
  alt: "Фото",
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  dataUrl: PropTypes.string,
};
export default ImageGalleryItem;
