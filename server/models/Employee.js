const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  jobTitle: String,
  cellphone1: String,
  cellphone2: String,
  emailid: String,
  address: String,
  city: String,
  state: String,
  paymentMethod: String,
  language: String,
  paidVacationDays: { type: Number, default: 0 },
  paidSickDays: { type: Number, default: 0 },
  dateofbirth: Date,
  dateofjoining: Date,
  avatar: String,
});
 
module.exports = mongoose.model('Employee', employeeSchema);
