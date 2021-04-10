import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ list, onClick }) => (
  <ul className={styles.ImageGallery} onClick={onClick}>
    {list.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <li className={styles.ImageGalleryItem} key={id}>
          <ImageGalleryItem
            src={webformatURL}
            tags={tags}
            largeImage={largeImageURL}
          />
        </li>
      );
    })}
  </ul>
);
ImageGallery.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
