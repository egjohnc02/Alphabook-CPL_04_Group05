import React from 'react';

const ProductReviews: React.FC = () => {
  return (
    <div className="product-rev">
      <div className="bizweb-product-reviews-badge" data-id="38235943">
        <div className="bizweb-product-reviews-star" data-score={0} data-number={5} title="Not rated yet!" style={{ color: 'rgb(255, 204, 51)' }}>
          <i data-alt="1" className="star-off-png" title="Not rated yet!"></i>
          &nbsp;<i data-alt="2" className="star-off-png" title="Not rated yet!"></i>
          &nbsp;<i data-alt="3" className="star-off-png" title="Not rated yet!"></i>
          &nbsp;<i data-alt="4" className="star-off-png" title="Not rated yet!"></i>
          &nbsp;<i data-alt="5" className="star-off-png" title="Not rated yet!"></i>
          <input name="score" type="hidden" readOnly />
        </div>
        <div>
          <img src="https://productreviews.sapoapps.vn//assets/images/user.png" width="18" height="17" alt="User" />
        </div>
      </div>
      <span className="count">(0)</span>
    </div>
  );
};

export default ProductReviews;
