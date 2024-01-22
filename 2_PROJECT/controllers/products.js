const Product = require('../models/product')
const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async Errors')
  const products = await Product.find({
    featured: false,
  })
  res.status(200).json({ products, nbHits: products.length, })
}
//select is used to find specific entries &  only those entries from data
const getAllProducts = async (req, res) => {
  const { featured, company, name ,sort} = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === true ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log(queryObject)
  let result = Product.find(queryObject)
  if(sort){
    console.log(sort);
  }

  const products = await result;
  res.status(200).json({ products, nbHits: products.length, })
}
module.exports = {
  getAllProducts,
  getAllProductsStatic,
}