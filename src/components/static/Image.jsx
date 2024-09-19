
import PropTypes from "prop-types";
import { ImageLoader, ImageNotFound } from "../../assets/assets";
import { useEffect, useRef, useState } from "react";

export const CImage = ({image}) => {
     const [imageUrl, setImageUrl] = useState(ImageLoader);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  const imageStyle = {
    maxWidth: image.maxWidth || "100%",
    maxHeight: image.maxHeight || "100%",
    zIndex: "1",
    display: isLoading ? 'none' : 'block',
  };

  const containerStyles = {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  };

  useEffect(() => {
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      setImageUrl(image.src);
      setIsLoading(false);
      setHasError(false);
    };
    img.onerror = () => {
      setImageUrl(ImageNotFound);
      setIsLoading(false);
      setHasError(true);
    };
  }, [image.src]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
              setImageUrl(image.src);
              setIsLoading(false);
              setHasError(false);
            };
            img.onerror = () => {
              setImageUrl(ImageNotFound);
              setIsLoading(false);
              setHasError(true);
            };
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [image.src]);

  return (
    <div className="c-image" style={containerStyles}>
      {isLoading ?
        null
        // <img src={ImageLoader} alt="Loading..." style={loaderStyle} />
      :
      <img
        ref={imgRef}
        src={imageUrl}
        alt={image.alt}
        style={imageStyle}
        onClick={image.action}
        onError={() => {
          setImageUrl(ImageNotFound);
          setIsLoading(false);
          setHasError(true);
        }}
        loading="lazy"
      />
      }
    </div>
  );
}

export const AnyImage = ({image}) => {
  const [imageUrl, setImageUrl] = useState(ImageLoader);
  const imgRef = useRef();

  const imageStyle = {
    maxWidth: "auto",  
    maxHeight: "auto",
    zIndex: "1"
  };

  return (
    <>
      <img
            ref={imgRef}
            src={imageUrl}
            alt={image.alt}
            style={imageStyle}
            onClick={image.action}
            onError={() => {
              setImageUrl(ImageNotFound);
            }}
          />
      </>
  );

}


export const MyImage = ({image, width="100%", height="100%", action=() => {}}) => {
  const styles = {
    backgroundImage: `url(${image})`,
    width,
    height
  }
  return(
    <div className="my-image-container" style={styles} onClick={action} ></div>
  )
}


CImage.propTypes = {
     image: PropTypes.any
}


AnyImage.propTypes = {
     image: PropTypes.any
}

MyImage.propTypes = {
  image: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  action: PropTypes.func
}
