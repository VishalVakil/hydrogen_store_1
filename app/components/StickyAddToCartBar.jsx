import {useEffect, useState} from 'react';
import {AddToCartButton} from './AddToCartButton';

export function StickyAddToCartBar({product, selectedVariant}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      // For example, show bar after 300px scrolled
      setVisible(y > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!selectedVariant) return null;

  return (
    <div
      className="sticky-add-to-cart-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#f8f8f8',
        padding: '1rem',
        borderTop: '1px solid #ccc',
        display: visible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999,
      }}
    >
      <span>
        <strong>{product.title}</strong> — {selectedVariant.title}
      </span>
      <AddToCartButton
        lines={[
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
          },
        ]}
      >
        Add to cart
      </AddToCartButton>
    </div>
  );
}
