const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Category", CategorySchema);

/* 

product - coke, pepsi, lays, shirt, chau chau
category- juice, juice, food, cloth, food



juice - coke, pepsi
food - lays, chau chau
cloth - shirt


one category -> multiple products


*/
