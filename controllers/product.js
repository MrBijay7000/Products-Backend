const Product = require("./../models/product");
const Category = require("./../models/category");

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.productName,
    price: req.body.productPrice,
    quantity: req.body.productQuantity,
    category: req.body.category,
  });

  product.save().then((createdProduct) => {
    console.log({ createdProduct });
    const obj = {
      name: createdProduct.name,
      price: createdProduct.price,
      quantity: createdProduct.quantity,
      id: createdProduct._id,
      categoryId: createdProduct.category,
      _version: createdProduct.__v,
    };
    res.json({
      message: "Product Created",
      createdProduct: obj,
    });
  });

  // const createdProduct = await product.save();
  // const obj = {
  //   name: createdProduct.name,
  //   price: createdProduct.price,
  //   quantity: createdProduct.quantity,
  //   id: createdProduct._id,
  //   categoryId: createdProduct.category,
  //   _version: createdProduct.__v,
  // };
  // res.json({
  //   message: "Product Created",
  //   createdProduct: obj,
  // });
};

// exports.getProduct = (req, res, next) => {
//   Product.find().then((response) => {
//     const arr = response.map((product) => {
//       console.log({ product });
//       return {
//         name: product.name,
//         price: product.price,
//         quantity: product.quantity,
//         id: product._id,
//         category: product.category,
//         _version: product.__v,
//       };
//     });
//     res.json(arr);
//   });
// };

exports.getProduct = async (req, res, next) => {
  const products = await Product.find();
  const arr = await Promise.all(
    products.map(async (product) => {
      const category = await Category.findById(product.category);
      const obj = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        id: product._id,
        categoryName: category.name,
        _version: product.__v,
      };
      return obj;
    })
  );
  res.json(arr);
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    console.log({ result });
    res.status(200).json({
      message: "Products Delete Successfully!",
    });
  });
};
