const express = require("express");
const multer = require("multer");
const Employee = require("../models/Employee");

const router = express.Router();

// Multer Config for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Create Employee
router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const { name, emailid } = req.body;

    if (!name || !emailid) {
      return res.status(400).json({ message: "Name and Email are required." });
    }

    const employeeData = req.body;
    if (req.file) {
      employeeData.avatar = `/uploads/${req.file.filename}`;
    }

    const newEmployee = new Employee(employeeData);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("🔥 Employee Save Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Update Employee
router.put("/:id", upload.single("avatar"), async (req, res) => {
  try {
    const employeeData = req.body;
    if (req.file) employeeData.avatar = `/uploads/${req.file.filename}`;

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, employeeData, { new: true });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Delete Employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const Employee = require("../models/Employee");

// const router = express.Router();

// // ✅ Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// // ✅ Create Employee
// router.post("/", upload.single("avatar"), async (req, res) => {
//   try {
//     const employeeData = req.body;
//     if (req.file) {
//       employeeData.avatar = `/uploads/${req.file.filename}`;
//     }

//     const newEmployee = new Employee(employeeData);
//     await newEmployee.save();
//     res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
//   } catch (error) {
//     console.error("🔥 Employee Save Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Get All Employees
// router.get("/", async (req, res) => { // 🔥 Fixed duplicate route conflict
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     console.error("🔥 Fetch Employees Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Get Employee by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
    
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     console.log("📤 Sending Employee Data:", employee); // 🔥 Fixed typo
//     res.status(200).json(employee);
//   } catch (error) {
//     console.error("🔥 Fetch Employee Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Update Employee
// router.put("/:id", upload.single("avatar"), async (req, res) => {
//   try {
//     const employeeData = req.body;
//     if (req.file) {
//       employeeData.avatar = `/uploads/${req.file.filename}`;
//     }

//     const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, employeeData, { new: true });
//     if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "✅ Employee updated successfully", employee: updatedEmployee });
//   } catch (error) {
//     console.error("🔥 Update Employee Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Delete Employee
// router.delete("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "✅ Employee deleted successfully" });
//   } catch (error) {
//     console.error("🔥 Delete Employee Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const Employee = require("../models/Employee");

// const router = express.Router();

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// // ✅ Create Employee
// router.post("/", upload.single("avatar"), async (req, res) => {
//   try {
//     const employeeData = req.body;
//     if (req.file) {
//       employeeData.avatar = `/uploads/${req.file.filename}`;
//     }

//     const newEmployee = new Employee(employeeData);
//     await newEmployee.save();
//     res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
//   } catch (error) {
//     console.error("🔥 Employee Save Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Get All Employees
// router.get("/:id", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     console.error("🔥 Fetch Employees Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Get Employee by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     console.log("Sending Employes Data",employee);
    
//     if (!employee) return res.status(404).json({ message: "Employee not found" });
//     res.status(200).json(employee);
//   } catch (error) {
//   console.error("Fetch Employees Error:",error.message);
  
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Update Employee
// router.put("/:id", upload.single("avatar"), async (req, res) => {
//   try {
//     const employeeData = req.body;
//     if (req.file) {
//       employeeData.avatar = `/uploads/${req.file.filename}`;
//     }

//     const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, employeeData, { new: true });
//     if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Delete Employee
// router.delete("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const Employee = require("../models/Employee");

// const router = express.Router(); // ✅ Define the router

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // ✅ Create Employee with Avatar Upload
// router.post("/", upload.single("avatar"), async (req, res) => {
//   try {
//     console.log("📥 Incoming Request Data:", req.body);
//     console.log("📸 Uploaded File:", req.file);

//     const employeeData = req.body;
//     if (req.file) {
//       employeeData.avatar = `/uploads/${req.file.filename}`;
//     }

//     const newEmployee = new Employee(employeeData);
//     await newEmployee.save();
//     console.log("✅ Employee Saved Successfully:", newEmployee);

//     res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
//   } catch (error) {
//     console.error("🔥 Employee Save Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });
// router.get("/", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     console.error("🔥 Fetch Employees Error:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ✅ Export Router
// module.exports = router;


// const express = require("express");
// const { check, validationResult } = require("express-validator");
// const Employee = require("../models/Employee");

// const router = express.Router();

// // Validation Rules
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

// // Create a new employee
// router.post("/", employeeValidationRules, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const newEmployee = new Employee(req.body);
//     await newEmployee.save();
//     res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get all employees
// router.get("/", async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get employee by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) return res.status(404).json({ message: "Employee not found" });
//     res.status(200).json(employee);
//   } catch (error) {
//     if (error.name === "CastError") return res.status(400).json({ message: "Invalid Employee ID" });
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Update employee by ID
// router.put("/:id", employeeValidationRules, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
//   } catch (error) {
//     if (error.name === "CastError") return res.status(400).json({ message: "Invalid Employee ID" });
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Delete employee by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) return res.status(404).json({ message: "Employee not found" });

//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     if (error.name === "CastError") return res.status(400).json({ message: "Invalid Employee ID" });
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;
