import { Image } from '@/CatViewer';
import { useEffect, useState } from 'react';

interface ImageLayerType {
  isModalOpen?: boolean;
  isClosing?: boolean;
  openImage?: Image;
  closeModal?: () => void;
}

const ImageLayer = ({ isModalOpen = false, isClosing = false, openImage, closeModal }: ImageLayerType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isModalOpen || isClosing) {
      setIsAnimating(true);
    }

    if (!isModalOpen && isClosing) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen, isClosing]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setIsOpen(true), 100);
    } else {
      setIsOpen(false);
    }
  }, [isModalOpen]);

  if (!isAnimating && !isModalOpen) {
    return null;
  }

  return (
    <>
      {openImage && (
        <div className={`img-layer ${isOpen ? 'opening' : ''} ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
          <div className="img-wrap">{openImage && <img src={openImage.url} alt={`${openImage.id}` || ''} />}</div>
        </div>
      )}
    </>
  );
};

export default ImageLayer;
