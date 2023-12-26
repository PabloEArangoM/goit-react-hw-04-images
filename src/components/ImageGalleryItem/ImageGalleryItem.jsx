// ImageGalleryItem.js

import React, { useState } from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      className="ImageGalleryItem"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(image)}
    >
      <img
        src={image.webformatURL}
        alt={image.id}
        className={`ImageGalleryItem-image ${isHovered ? 'hovered' : ''}`}
      />
    </li>
  );
};

export default ImageGalleryItem;
