const express = require('express');
const Products = require('./product.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/veriufyAdmin');
const router = express.Router();

router.post('/create-product', async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const saveProducts = await newProduct.save();

    // calculate reviews
    const reviews = await Reviews.find({ productId: saveProducts._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => {
        return acc + review.rating;
      });
      const averageRating = totalRating / reviews.length;
      saveProducts.rating = averageRating;
      await saveProducts.save();
    }

    res.status(201).send(saveProducts);
  } catch (error) {
    console.log('create product error', error);
    res.status(500).send({ message: 'failed to create new products' });
  }
});

router.get('/', async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (color && color !== 'all') {
      filter.color = color;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseFloat(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPage = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('author', 'email')
      .sort({ createdAt: -1 });

    res.status(200).send({ products, totalPage, totalProducts });
  } catch (error) {
    console.log('error fetching products', error);
    res.status(500).send({ message: 'error fetching products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate(
      'author',
      'email username'
    );

    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    const reviews = await Reviews.find({ productId }).populate(
      'userId',
      'username email'
    );

    res.status(200).send({ product, reviews });
  } catch (error) {
    console.log('error fetching products', error);
    res.status(500).send({ message: 'failed to fetch this products' });
  }
});

router.patch(
  '/update-product/:id',
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const productId = req.params.id;
      const updateProduct = await Products.findByIdAndUpdate(
        productId,
        { ...req.body },
        { new: true }
      );
      if (!updateProduct) {
        return res.status(404).send({ message: 'product not found' });
      }
      res.status(200).send({
        message: 'products updated successfully',
        product: updateProduct,
      });
    } catch (error) {
      console.log('error updating updated products', error);
      res.status(500).send({ message: 'failed to update products' });
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await Products.findByIdAndDelete(productId);

    if (!deleteProduct) {
      return res.status(404).send({ message: 'prodcut not found' });
    }
    await Reviews.deleteMany({ productId: productId });

    res.status(200).send({
      message: 'prodcut deleted successfully',
    });
  } catch (error) {
    console.log('error deleting the products', error);
    res.status(500).send({ message: 'failed to delete the products' });
  }
});

router.get('/related/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: 'prodcut id is required' });
    }
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: 'prodcut not found' });
    }

    const titleRange = new RegExp(
      product.name
        .split('')
        .filter((word) => word.length > 1)
        .join('|'),
      'i'
    );
    const relatedProducts = await Products.find({
      _id: { $ne: id },
      $or: [{ name: { $regex: titleRange } }, { category: product.category }],
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    console.error('error fetching the related products');
    res.status(500).send({ message: 'failed to fetch related products' });
  }
});

module.exports = router;






