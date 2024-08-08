
import PropTypes from "prop-types";
import { ImageLoader, ImageNotFound } from "../../assets/assets";
import { useEffect, useRef, useState } from "react";


// export const CImage = ({image}) => {

//      const imageStyle = {
//           maxWidth: image.maxWidth || "100%", 
//           maxHeight: image.maxHeight || "100%",
//           zIndex: "1"
//      }
//      const containerStyles= {
//           width: "100%",
//           height: "auto",
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "center"
//      }
//      return(
//           <div className="c-image" style={containerStyles}>
//                <Img
//                     src={[image.src,ImageNotFound]}
//                     alt={image.alt}
//                     style={imageStyle}
//                     onClick={image.action}
//                />
//           </div>
//      )
// }

// export const AnyImage = ({image, ...props}) => {
//      const imageStyle = {
//           maxWidth: "auto",  
//           maxHeight: "auto",
//           zIndex: "1"
//      }

//      return(
//           <Img src={[image.src,ImageNotFound]}  alt={image.alt} style={imageStyle}  onClick={image.action} {...props}/>
//      )
// }


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

  // const loaderStyle = {
  //   width: '50px',
  //   height: '50px',
  //   marginBlock: "10px"
  // };

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
const [isLoading, setIsLoading] = useState(true);
const [hasError, setHasError] = useState(false);
const imgRef = useRef();

const imageStyle = {
  maxWidth: "auto",  
  maxHeight: "auto",
  zIndex: "1"
};


const loaderStyle = {
  width: '50px',
  height: '50px',
  margin: "20px"
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
 <>
   {isLoading ?
      <img src={ImageLoader} alt="Loading..." style={loaderStyle} />
    :<img
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
    />
   }
 </>
);
}
CImage.propTypes = {
     image: PropTypes.any
}


AnyImage.propTypes = {
     image: PropTypes.any
}