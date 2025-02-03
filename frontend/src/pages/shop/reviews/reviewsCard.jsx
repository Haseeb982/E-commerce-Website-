import React from 'react';
import commenterIcon from '../../../assets/avatar.png';
import RatingStar from '../../../components/ratingStar';
import PostAReview from './postAReview';
import { useState } from 'react';
import { formatData } from '../../../utilis/formatData';

const ReviewsCard = ({ productReviews }) => {
  const [isModelOpen, setisModelOpen] = useState(false);
  const reviews = productReviews || [];
  console.log('reviews', reviews);

  const handleOpenReviewModel = () => {
    setisModelOpen(true);
  };

  const handleCloseReviewModel = () => {
    setisModelOpen(false);
  };

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <div>
              <h3 className="text-lg font-medium">All Comment...</h3>

              {reviews.map((review, index) => (
                <div>
                  <div key={index} className="comment-place">
                    <div className="flex gap-4 items-center">
                      <img src={commenterIcon} alt="" className="image" />
                      <div className="space-y-1">
                        <p className="text-lg font-medium underline capitalize underlin-offset-4 text-blue-400">
                          {review?.userId?.username}
                        </p>
                        <p className="text-[12px] italic">
                          {formatData(review?.updatedAt)}
                        </p>
                        <RatingStar rating={review?.rating} />
                      </div>
                    </div>
                    <div className="text-gray-600 mt-5 border border-black/30 comment-border">
                      <p className="md:w-4/5">{review?.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-review">No Reviews Yet</p>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={handleOpenReviewModel}
          className="review-btn-comment bg-red-500 text-white rounded-md"
        >
          Add a Review
        </button>
      </div>

      <PostAReview
        isModelOpen={isModelOpen}
        handleClose={handleCloseReviewModel}
      />
    </div>
  );
};

export default ReviewsCard;
