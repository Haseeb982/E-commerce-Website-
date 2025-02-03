import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { usePostReviewMutation } from '../../../redux/features/reviews/reviewsApi';

const PostAReview = ({ isModelOpen = false, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState('');

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setrating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment,
      rating,
      userId: user._id,
      productId: id,
    };
    console.log('problem', newComment);
    try {
      const response = await postReview(newComment).unwrap();
      console.log('response', response);
      setcomment('');
      setrating(0);
      refetch();
      handleClose();
    } catch (error) {
      console.log('error in postAReview', error);
    }
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModelOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white review-open rounded-md shadow-lg z-50">
        <div className="review-open-div">
          <h2 className="text-lg font-medium mb-4">Post A Review</h2>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className="cursor-pointer text-yellow-500 text-lg"
              >
                {rating >= star ? (
                  <i className="ri-star-fill"></i>
                ) : (
                  <i className="ri-star-line"></i>
                )}
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full border text-area rounded-md"
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              placeholder="Write your review..."
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white btn-submit rounded-md cursor-pointer"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white btn-cancel rounded-md mt-2 ml-2 cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
