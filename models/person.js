const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
console.log(`Connecting to ${process.env.MONGODB_URI}`)
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: [true, "name is missing"],
    },
    number: {
      type: String,
      required: [true, "number is missing"],
      minLength: 8,
      validate: {
        validator: (num) => {
          const regex = /^(\d{3}|\d{2})-(\d{5,13}|\d{6,13})$/
          const found = num.match(regex)
          return regex.test(num) && (found[1].length + found[2].length >= 8)
        },
        message : 'Number must be at least 8 digits.\nXXX-XXXXXXX or XX-XXXXXXX'
      }
    },
  },
  { strict: "throw" }
);
mongoose.set("toJSON", {
  transform: (document, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);
