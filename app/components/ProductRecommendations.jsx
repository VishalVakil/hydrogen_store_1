import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import { useEffect, useState } from 'react';

/**
 * Example AI-based product recommendations component
 * @param {{
 *   productId: string;
 *   recommendations: Array<{
 *     id: string;
 *     title: string;
 *     handle: string;
 *     imageUrl: string;
 *     price: string;
 *   }>
 * }} props
 */
export function ProductRecommendations({ productId, recommendations }) {
    // If you want to fetch from a live AI endpoint in the client, you could do:
    // const [recommended, setRecommended] = useState([]);
    // useEffect(() => {
    //   fetch(`/api/ai-recommendations?productId=${productId}`).then(...);
    // }, [productId]);

    if (!recommendations?.length) {
        return null;
    }

    return (
        <section className="product-recommendations">
            <h2>Recommended for you</h2>
            <div className="recommendations-grid">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="recommendation-card">
                        <Link to={`/products/${rec.handle}`}>
                            <img
                                src={rec.imageUrl}
                                alt={rec.title}
                                loading="lazy"
                                style={{ maxWidth: '150px' }}
                            />
                            <div className="recommendation-info">
                                <p>{rec.title}</p>
                                <p>${rec.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
