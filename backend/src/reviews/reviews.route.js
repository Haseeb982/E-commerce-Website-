const express = require('express');
const Reviews = require('./reviews.model');
const Products = require('../products/product.model');
const router = express.Router();

router.post('/post-review', async (req, res) => {
  try {
    const { comment, rating, productId, userId } = req.body;
    console.log('backend', comment, rating, productId, userId);
    if ((!comment, !rating, !productId, !userId)) {
      return res.status(400).send({ message: 'All field are rquired' });
    }
    const existingReview = await Reviews.findOne({ productId, userId });
    console.log('data', existingReview);
    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating.rating;
      await existingReview.save();
    } else {
      const newReview = new Reviews({
        comment,
        rating,
        productId,
        userId,
      });
      await newReview.save();
    }

    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({ validateBeforeSave: false });
      } else {
        return res.status(404).send({ message: 'product not found' });
      }
    }

    res.status(200).send({ message: 'Review Processed Successfully' });
  } catch (error) {
    console.log('error posting review', error);
    res.status(500).send({ message: 'failed to post reviews' });
  }
});

router.get('/total-reviews', async (req, res) => {
  try {
    const totalReviews = await Reviews.countDocuments({});
    res.status(200).send({ totalReviews });
  } catch (error) {
    console.log('error in total reviews', error);
    res.status(500).send({ message: 'failed to total reviews' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).send({ message: 'userId is requred' });
  }
  try {
    const reviews = await Reviews.find({ userId: userId }).sort({
      createdAt: -1,
    });
    if (reviews.length === 0) {
      return res.status(404).send({ message: 'no reviews found' });
    }
    res.status(200).send(reviews);
  } catch (error) {
    console.log('error fetching reviews', error);
    res.status(500).send({ message: 'failed to fetch reviews' });
  }
});

module.exports = router;
