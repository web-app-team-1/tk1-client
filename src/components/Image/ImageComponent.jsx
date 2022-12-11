import React from 'react';
import styles from './ImageComponent.module.css';

function ImageComponent({ imageUrl }) {
  return (
    <div className={styles['image-container']}>
      <img src={imageUrl} className="img-thumbnail" alt="user" />
    </div>
  );
}

export default ImageComponent;
