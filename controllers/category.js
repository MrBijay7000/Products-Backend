const Category = require("./../models/category");

exports.createCategory = (req, res, next) => {
  const category = new Category({
    name: req.body.categoryName,
  });

  category.save().then((createdCategory) => {
    const obj = {
      name: createdCategory.name,
      id: createdCategory._id,
      _version: createdCategory._v,
    };

    res.json({ message: "Category Created", createdCategory: obj });
  });
};

exports.fetchCategories = (req, res, next) => {
  Category.find().then((categories) => {
    const arr = categories.map((category) => {
      return {
        name: category.name,
        id: category._id,
      };
    });

    res.json(arr);
  });
};

exports.getCategoryById = (req, res, next) => {
  Category.findById(req.params.id).then((category) => {
    const obj = {
      name: category.name,
      id: category._id,
    };

    if (category) {
      res.status(200).json(obj);
    } else {
      res.status(200).json({
        message: "Category Not Found",
      });
    }
  });
};

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Category Delete Successfully!",
    });
  });
};

exports.UpdateCategory = (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    name: req.body.name,
  });

  Category.updateOne({ _id: req.body.id }, category).then((result) => {
    console.log({ result });
    if (result.modifiedCount > 0) {
      res.status(200).json({
        message: "Category Updated Successfully!",
      });
    } else res.sendStatus(500);
  });
};
