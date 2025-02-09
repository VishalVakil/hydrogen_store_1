import {useState} from 'react';
import {Image} from '@shopify/hydrogen';

/**
 * A simple client component to display multiple product images in a carousel or gallery.
 * @param {{ product: any }} props
 */
export function ProductGallery({product}) {
  const images = product?.images?.nodes || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return <div className="product-image">No images found</div>;
  }

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const currentImage = images[currentIndex];

  return (
    //        <div className="product-gallery">
    //    <div className="gallery-main">
    //        <Image
    //            data={currentImage}
    //            alt={currentImage.altText || product.title}
    //            width={600}
    //            height={600}
    //            loading="lazy" // lazy-load for performance
    //        />
    //        <div className="gallery-controls">
    //            <button onClick={handlePrev} aria-label="Previous image">
    //                &larr;
    //            </button>
    //            <button onClick={handleNext} aria-label="Next image">
    //                &rarr;
    //            </button>
    //        </div>
    //    </div>

    //<style jsx>{`
    //    .gallery-main {
    //        position: relative; /* Set parent container as relative to position buttons */
    //        display: inline-block; /* Ensure the width of the parent matches the image */
    //    }

    //    .gallery-controls button {
    //        position: absolute;
    //        top: 50%; /* Center buttons vertically */
    //        transform: translateY(-50%); /* Adjust for exact vertical centering */
    //        background: rgba(0, 0, 0, 0.5); /* Optional: button background */
    //        color: white; /* Optional: button text color */
    //        border: none; /* Optional: remove border */
    //        padding: 10px; /* Optional: adjust button size */
    //        cursor: pointer;
    //    }

    //    .gallery-controls button:first-of-type {
    //        left: 0; /* Align the first button to the left of the image */
    //    }

    //    .gallery-controls button:last-of-type {
    //        right: 0; /* Align the second button to the right of the image */
    //    }
    //`}</style>
    <div className="product-gallery">
      <div className="gallery-main">
        <Image
          data={currentImage}
          alt={currentImage.altText || product.title}
          width={600}
          height={600}
          loading="lazy" // lazy-load for performance
          className="zoom-image" // Add class for zoom effect
        />
        <div className="gallery-controls">
          <button onClick={handlePrev} aria-label="Previous image">
            &larr;
          </button>
          <button onClick={handleNext} aria-label="Next image">
            &rarr;
          </button>
        </div>
      </div>

      <style jsx>{`
        .gallery-main {
          position: relative; /* Set parent container as relative to position buttons */
          display: inline-block; /* Ensure the width of the parent matches the image */
          overflow: hidden; /* Hide overflowing content during zoom effect */
        }

        .zoom-image {
          width: 100%; /* Ensure image takes full width of its parent */
          height: 100%; /* Ensure image maintains its aspect ratio */
          transition: transform 0.3s ease; /* Smooth transition on zoom */
        }

        .zoom-image:hover {
          transform: scale(1.2); /* Scale the image to 120% when hovered */
        }

        .gallery-controls button {
          position: absolute;
          top: 50%; /* Center buttons vertically */
          transform: translateY(-50%); /* Adjust for exact vertical centering */
          background: rgba(0, 0, 0, 0.5); /* Optional: button background */
          color: white; /* Optional: button text color */
          border: none; /* Optional: remove border */
          padding: 10px; /* Optional: adjust button size */
          cursor: pointer;
        }

        .gallery-controls button:first-of-type {
          left: 0; /* Align the first button to the left of the image */
        }

        .gallery-controls button:last-of-type {
          right: 0; /* Align the second button to the right of the image */
        }
      `}</style>

      {/* Optional thumbnails */}
      <div className="gallery-thumbs">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setCurrentIndex(index)}
            style={{
              border:
                index === currentIndex ? '2px solid #000' : '1px solid #ccc',
            }}
            aria-label={`Thumbnail ${index}`}
          >
            <Image
              data={img}
              alt={img.altText || ''}
              width={60}
              height={60}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
