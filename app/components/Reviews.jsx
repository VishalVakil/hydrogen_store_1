import { useEffect, useState } from 'react';

/**
 * A simple client component for reviews
 * @param {{
 *   productId: string;
 *   reviews: Array<{
 *     id: number;
 *     author: string;
 *     rating: number;
 *     content: string;
 *   }>;
 * }} props
 */
export function Reviews({ productId, reviews: initialReviews = [] }) {
    // If you need to fetch on the client side, you could do:
    // const [reviews, setReviews] = useState(initialReviews);
    // useEffect(() => {
    //   fetch(`/api/reviews?productId=${productId}`).then(...);
    // }, [productId]);

    // For this example, we just use the reviews passed via loader (deferred).
    if (!initialReviews.length) {
        return <div>No reviews yet.</div>;
    }

    return (
        <section className="reviews-section">
            <h2>Customer Reviews</h2>
            {initialReviews.map((review) => (
                <div key={review.id} className="review-item">
                    <p>
                        <strong>{review.author}</strong> - {review.rating} / 5
                    </p>
                    <p>{review.content}</p>
                </div>
            ))}
        </section>
    );
}
