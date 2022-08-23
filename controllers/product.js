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
};

// const getCategoryById = async (categoryId) => {
//   const category = await Category.findById(categoryId);
//   return category;
// };

exports.getProduct = async (req, res, next) => {
  const arr = [];
  Product.find().then((response) => {
    const newArr = response.map(async (product) => {
      const ajay = Category.findById(product.category).then((category) => {
        const obj = {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          id: product._id,
          category: {
            name: category.name,
            id: category._id,
          },
          _version: product.__v,
        };
        return obj;
        console.log({ obj });
      });
      console.log({ ajay });
    });
    console.log({ newArr });
    res.json(newArr);
  });
};

// exports.getProduct = (req, res, next) => {
//   Product.find().then((resposne) => {
//     const arr = resposne.map((product) => {
//       console.log({ product });
//       let obj = {};

//       return Category.findById(product.category).then((category) => {
//         obj = {
//           name: category.name,
//           id: category._id,
//         };

//         return {
//           name: product.name,
//           price: product.price,
//           quantity: product.quantity,
//           id: product._id,
//           category: obj,
//           _version: product.__v,
//         };
//       });
//     });
//     console.log({ arr });
//     res.json(arr);
//   });
// };

// exports.getProduct = (req, res, next) => {
//   Product.find().then((resposne) => {
//     const arr = resposne.map((product) => {
//       console.log({ product });
//       let obj = {};

//       return Category.findById(product.category).then((category) => {
//         obj = {
//           name: category.name,
//           id: category._id,
//         };

//         return {
//           name: product.name,
//           price: product.price,
//           quantity: product.quantity,
//           id: product._id,
//           category: obj,
//           _version: product.__v,
//         };
//       });
//     });
//     console.log({ arr });
//     res.json(arr);
//   });
// };

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then((result) => {
    console.log({ result });
    res.status(200).json({
      message: "Products Delete Successfully!",
    });
  });
};
