const verifyAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(404).send({
      success: false,
      message: 'you are not authorized to perform this action',
    });
  }
  next();
};

module.exports = verifyAdmin;  
