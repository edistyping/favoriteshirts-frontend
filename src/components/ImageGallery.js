import React, { useState } from 'react';
import default_shirt from '../assets/images/default_shirt.png';

const ImageGallery = ({ imageUrls }) => {
  const [imageSrcs, setImageSrcs] = useState(imageUrls);

  const handleError = (index) => {
    setImageSrcs((prevImageSrcs) => {
      const newImageSrcs = [...prevImageSrcs];
      newImageSrcs[index] = default_shirt;
      return newImageSrcs;
    });
  };

  return (
    <div>
      {imageSrcs.map((src, index) => (
        <img
          key={index}
          loading="lazy"
          src={src}
          alt={`image-${index}`}
          onError={() => handleError(index)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
