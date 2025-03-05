const { check } = require("express-validator");

const employeeValidationRules = [
  check("name").notEmpty().withMessage("Name is required"),

  check("emailid")
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(), // Ensures lowercase and trims whitespace

  check("jobTitle").notEmpty().withMessage("Job Title is required"),

  check("cellphone1")
    .optional()
    .isMobilePhone("any") // "any" ensures global compatibility
    .withMessage("Valid cellphone is required"),

  check("cellphone2")
    .optional()
    .isMobilePhone("any")
    .withMessage("Valid cellphone is required"),

  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),

  check("paymentMethod").notEmpty().withMessage("Payment method is required"),
  check("language").notEmpty().withMessage("Language is required"),

  check("paidVacationDays")
    .optional()
    .isInt({ min: 0 }).withMessage("Vacation days must be a non-negative integer"),

  check("paidSickDays")
    .optional()
    .isInt({ min: 0 }).withMessage("Sick days must be a non-negative integer"),

  check("dateofbirth")
    .optional()
    .isISO8601().withMessage("Valid Date of Birth is required"),

  check("dateofjoining")
    .optional()
    .isISO8601().withMessage("Valid Date of Joining is required"),
];

module.exports = employeeValidationRules;

// const { check } = require("express-validator");

// const employeeValidationRules = [
//   check("name").notEmpty().withMessage("Name is required"),
//   check("emailid").isEmail().withMessage("Valid email is required"),
//   check("jobTitle").notEmpty().withMessage("Job Title is required"),
//   check("cellphone1").optional().isMobilePhone().withMessage("Valid cellphone is required"),
//   check("cellphone2").optional().isMobilePhone().withMessage("Valid cellphone is required"),
//   check("homePhone").optional().isMobilePhone().withMessage("Valid home phone is required"),
//   check("address").notEmpty().withMessage("Address is required"),
//   check("city").notEmpty().withMessage("City is required"),
//   check("state").notEmpty().withMessage("State is required"),
//   check("paymentMethod").notEmpty().withMessage("Payment method is required"),
//   check("language").notEmpty().withMessage("Language is required"),
//   check("paidVacationDays").isInt({ min: 0 }).withMessage("Vacation days must be a non-negative integer"),
//   check("paidSickDays").isInt({ min: 0 }).withMessage("Sick days must be a non-negative integer"),
//   check("dateofbirth").optional().isISO8601().withMessage("Valid Date of Birth is required"),
//   check("dateofjoining").optional().isISO8601().withMessage("Valid Date of Joining is required"),
// ];

// module.exports = employeeValidationRules;