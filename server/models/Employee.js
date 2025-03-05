const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    jobTitle: { type: String, trim: true },

    cellphone1: { 
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\d{10,15}$/.test(v); // ✅ Allows empty or valid number
        },
        message: "Invalid phone number (must be 10-15 digits)",
      },
    },

    cellphone2: { 
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^\d{10,15}$/.test(v); // ✅ Allows empty or valid number
        },
        message: "Invalid phone number (must be 10-15 digits)",
      },
      default: "",
    },

    emailid: { 
      type: String, 
      unique: true, 
      required: true, 
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"], // ✅ Strict email validation
    },

    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },

    paymentMethod: { type: String, trim: true }, // ✅ No enum, any value allowed
    language: { type: String, trim: true }, // ✅ No enum, any value allowed

    paidVacationDays: { type: Number, default: 0, min: 0 },
    paidSickDays: { type: Number, default: 0, min: 0 },

    dateofbirth: { type: Date },
    dateofjoining: { type: Date, default: Date.now },

    avatar: { type: String, default: "" }, // ✅ Ensures empty avatar is valid
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);



// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     jobTitle: { type: String, trim: true },
//     cellphone1: { type: String, match: [/^\d{10,15}$/, "Invalid phone number"] },
//     cellphone2: { type: String, match: [/^\d{10,15}$/, "Invalid phone number"], default: "" },
//     emailid: { 
//       type: String, 
//       unique: true, 
//       trim: true, 
//       lowercase: true, 
//       required: true, 
//       match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
//     },
//     address: { type: String, trim: true },
//     city: { type: String, trim: true },
//     state: { type: String, trim: true },
//     paymentMethod: { 
//       type: String, 
//       trim: true, 
//       enum: ["Cash", "Bank Transfer", "Cheque", "Other"], 
//       default: "Other" 
//     },
//     language: { 
//       type: String, 
//       trim: true, 
//       enum: ["English", "Spanish", "French", "German", "Other"], 
//       default: "English" 
//     },
//     paidVacationDays: { type: Number, default: 0, min: 0 },
//     paidSickDays: { type: Number, default: 0, min: 0 },
//     dateofbirth: { type: Date },
//     dateofjoining: { type: Date, default: Date.now },
//     avatar: { type: String, default: "" }, // Stores image URL
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Employee", employeeSchema);

// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     jobTitle: { type: String, trim: true },
//     cellphone1: { type: String, match: [/^\d{10,15}$/, "Invalid phone number"] },
//     cellphone2: { type: String, match: [/^\d{10,15}$/, "Invalid phone number"], default: "" },
//     emailid: { type: String, unique: true, trim: true, lowercase: true },
//     address: { type: String, trim: true },
//     city: { type: String, trim: true },
//     state: { type: String, trim: true },
//     paymentMethod: { type: String, trim: true },
//     language: { type: String, trim: true },
//     paidVacationDays: { type: Number, default: 0, min: 0 },
//     paidSickDays: { type: Number, default: 0, min: 0 },
//     dateofbirth: { type: Date },
//     dateofjoining: { type: Date },
//     avatar: { type: String, default: "" }, // Stores image URL
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Employee", employeeSchema);

// const mongoose = require('mongoose');

// const employeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   jobTitle: String,
//   cellphone1: String,
//   cellphone2: String,
//   emailid: String,
//   address: String,
//   city: String,
//   state: String,
//   paymentMethod: String,
//   language: String,
//   paidVacationDays: { type: Number, default: 0 },
//   paidSickDays: { type: Number, default: 0 },
//   dateofbirth: Date,
//   dateofjoining: Date,
//   avatar: String,
// });
 
// module.exports = mongoose.model('Employee', employeeSchema);
