import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEmp.css"; // Import the CSS file

export default function AddEmp({ setShowForm, addEmployee, selectedEmployee }) {
  const [employee, setEmployee] = useState({
    name: "",
    jobTitle: "",
    cellphone1: "",
    cellphone2: "",
    emailid: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "",
    language: "",
    paidVacationDays: 0,
    paidSickDays: 0,
    dateofbirth: "",
    dateofjoining: "",
    avatar: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(""); // Preview image
  const [loading, setLoading] = useState(false);

  // ✅ Reset form when switching between employees or opening the form
  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
      setAvatarPreview(selectedEmployee.avatar ? `http://localhost:5000${selectedEmployee.avatar}` : "");
    } else {
      setEmployee({
        name: "",
        jobTitle: "",
        cellphone1: "",
        cellphone2: "",
        emailid: "",
        address: "",
        city: "",
        state: "",
        paymentMethod: "",
        language: "",
        paidVacationDays: 0,
        paidSickDays: 0,
        dateofbirth: "",
        dateofjoining: "",
        avatar: "",
      });
      setAvatarPreview("");
      setAvatarFile(null);
    }
  }, [selectedEmployee]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key]);
    }
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      if (selectedEmployee) {
        // ✅ Update Employee
        await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Employee updated successfully!");
      } else {
        // ✅ Add New Employee
        await axios.post("http://localhost:5000/api/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Employee added successfully!");
      }

      await addEmployee(); // ✅ Ensure employee list updates after submit
      setShowForm(false);
    } catch (error) {
      console.error("🔥 Error saving employee:", error);
      alert("❌ Failed to save employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>

        <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
          <div className="form-grid">
            {[
              { label: "Employee Name", name: "name", type: "text" },
              { label: "Job Title", name: "jobTitle", type: "text" },
              { label: "Cellphone 1", name: "cellphone1", type: "text" },
              { label: "Cellphone 2", name: "cellphone2", type: "text" },
              { label: "Email ID", name: "emailid", type: "email" },
              { label: "Address", name: "address", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Payment Method", name: "paymentMethod", type: "text" },
              { label: "Language", name: "language", type: "text" },
              { label: "Vacation Days", name: "paidVacationDays", type: "number" },
              { label: "Sick Days", name: "paidSickDays", type: "number" },
              { label: "Date of Birth", name: "dateofbirth", type: "date" },
              { label: "Date of Joining", name: "dateofjoining", type: "date" },
            ].map((field) => (
              <div key={field.name} className="form-group">
                <label>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={employee[field.name] ?? ""} // ✅ Ensures empty string if undefined
                  onChange={handleChange}
                  required={field.name === "name" || field.name === "emailid"} // ✅ Ensure required fields
                />
              </div>
            ))}

            {/* Avatar Upload with Preview */}
            <div className="form-group">
              <label>Upload Profile Picture</label>
              {avatarPreview && <img src={avatarPreview} alt="Preview" className="avatar-preview" />}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : selectedEmployee ? "Update Employee" : "Add Employee"}
            </button>

            <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddEmp.css"; // Import the CSS file

// export default function AddEmp({ setShowForm, addEmployee, selectedEmployee }) {
//   const [employee, setEmployee] = useState({
//     name: "",
//     jobTitle: "",
//     cellphone1: "",
//     cellphone2: "",
//     emailid: "",
//     address: "",
//     city: "",
//     state: "",
//     paymentMethod: "",
//     language: "",
//     paidVacationDays: 0,
//     paidSickDays: 0,
//     dateofbirth: "",
//     dateofjoining: "",
//     avatar: "",
//   });

//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState(""); // Preview image
//   const [loading, setLoading] = useState(false);

//   // Populate form when editing an existing employee
//   useEffect(() => {
//     if (selectedEmployee) {
//       setEmployee((prevEmployee) => ({ ...prevEmployee, ...selectedEmployee }));
//     }
//   }, [selectedEmployee]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setAvatarFile(file);
//     if (file) {
//       setAvatarPreview(URL.createObjectURL(file));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     for (const key in employee) {
//       formData.append(key, employee[key]);
//     }
//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     try {
//       if (selectedEmployee) {
//         // Update Employee
//         await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("✅ Employee updated successfully!");
//       } else {
//         // Add New Employee
//         await axios.post("http://localhost:5000/api/employees", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("✅ Employee added successfully!");
//       }

//       addEmployee(); // Refresh employee list
//       setShowForm(false);
//     } catch (error) {
//       console.error("🔥 Error saving employee:", error);
//       alert("❌ Failed to save employee.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>

//         <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
//           <div className="form-grid">
//             {/* Dynamically render form fields */}
//             {[
//               { label: "Employee Name", name: "name", type: "text" },
//               { label: "Job Title", name: "jobTitle", type: "text" },
//               { label: "Cellphone 1", name: "cellphone1", type: "text" },
//               { label: "Cellphone 2", name: "cellphone2", type: "text" },
//               { label: "Email ID", name: "emailid", type: "email" },
//               { label: "Address", name: "address", type: "text" },
//               { label: "City", name: "city", type: "text" },
//               { label: "State", name: "state", type: "text" },
//               { label: "Payment Method", name: "paymentMethod", type: "text" },
//               { label: "Language", name: "language", type: "text" },
//               { label: "Vacation Days", name: "paidVacationDays", type: "number" },
//               { label: "Sick Days", name: "paidSickDays", type: "number" },
//               { label: "Date of Birth", name: "dateofbirth", type: "date" },
//               { label: "Date of Joining", name: "dateofjoining", type: "date" },
//             ].map((field) => (
//               <div key={field.name} className="form-group">
//                 <label>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={employee[field.name] || ""}
//                   onChange={handleChange}
//                   required={field.name === "name"}
//                 />
//               </div>
//             ))}

//             {/* Avatar Upload with Preview */}
//             <div className="form-group">
//               <label>Upload Profile Picture</label>
//               {avatarPreview && <img src={avatarPreview} alt="Preview" className="avatar-preview" />}
//               <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>
//           </div>

//           <div className="form-buttons">
//             <button type="submit" className="submit-btn" disabled={loading}>
//               {loading ? "Saving..." : selectedEmployee ? "Update Employee" : "Add Employee"}
//             </button>

//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AddEmp.css"; // Import the CSS file

// export default function AddEmp({ setShowForm, addEmployee, selectedEmployee }) {
//   const [employee, setEmployee] = useState({
//     name: "",
//     jobTitle: "",
//     cellphone1: "",
//     cellphone2: "",
//     emailid: "",
//     address: "",
//     city: "",
//     state: "",
//     paymentMethod: "",
//     language: "",
//     paidVacationDays: 0,
//     paidSickDays: 0,
//     dateofbirth: "",
//     dateofjoining: "",
//     avatar: "",
//   });

//   const [avatarFile, setAvatarFile] = useState(null);

//   useEffect(() => {
//     if (selectedEmployee) {
//       setEmployee(selectedEmployee);
//     }
//   }, [selectedEmployee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setAvatarFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     for (const key in employee) {
//       formData.append(key, employee[key]);
//     }
//     if (avatarFile) {
//       formData.append("avatar", avatarFile);
//     }

//     try {
//       if (selectedEmployee) {
//         // Update existing employee
//         await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Employee updated successfully!");
//       } else {
//         // Create new employee
//         await axios.post("http://localhost:5000/api/employees", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("Employee added successfully!");
//       }

//       addEmployee(); // Refresh employee list
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       alert("Failed to save employee.");
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>

//         <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
//           <div className="form-grid">
//             {[
//               { label: "Employee Name", name: "name", type: "text" },
//               { label: "Job Title", name: "jobTitle", type: "text" },
//               { label: "Cellphone 1", name: "cellphone1", type: "text" },
//               { label: "Cellphone 2", name: "cellphone2", type: "text" },
//               { label: "Email ID", name: "emailid", type: "email" },
//               { label: "Address", name: "address", type: "text" },
//               { label: "City", name: "city", type: "text" },
//               { label: "State", name: "state", type: "text" },
//               { label: "Payment Method", name: "paymentMethod", type: "text" },
//               { label: "Language", name: "language", type: "text" },
//               { label: "Vacation Days", name: "paidVacationDays", type: "number" },
//               { label: "Sick Days", name: "paidSickDays", type: "number" },
//               { label: "Date of Birth", name: "dateofbirth", type: "date" },
//               { label: "Date of Joining", name: "dateofjoining", type: "date" },
//             ].map((field) => (
//               <div key={field.name} className="form-group">
//                 <label>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={employee[field.name]}
//                   onChange={handleChange}
//                   required={field.name === "name"}
//                 />
//               </div>
//             ))}

//             {/* Avatar Upload */}
//             <div className="form-group">
//               <label>Upload Profile Picture</label>
//               <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>
//           </div>

//           <div className="form-buttons">
//             <button type="submit" className="submit-btn">
//               {selectedEmployee ? "Update Employee" : "Add Employee"}
//             </button>

//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "./AddEmp.css"; // Import the CSS file

// export default function AddEmp({ setShowForm, addEmployee, selectedEmployee }) {
//   const [employee, setEmployee] = useState({
//     name: "",
//     jobTitle: "",
//     cellphone1: "",
//     cellphone2: "",
//     emailid: "",
//     address: "",
//     city: "",
//     state: "",
//     paymentMethod: "",
//     language: "",
//     paidVacationDays: 0,
//     paidSickDays: 0,
//     dateofbirth: "",
//     dateofjoining: "",
//     avatar: "",
//   });

//   useEffect(() => {
//     if (selectedEmployee) {
//       setEmployee(selectedEmployee);
//     }
//   }, [selectedEmployee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addEmployee(employee);
//     setEmployee({
//       name: "",
//       jobTitle: "",
//       cellphone1: "",
//       cellphone2: "",
//       emailid: "",
//       address: "",
//       city: "",
//       state: "",
//       paymentMethod: "",
//       language: "",
//       paidVacationDays: 0,
//       paidSickDays: 0,
//       dateofbirth: "",
//       dateofjoining: "",
//       avatar: "",
//     });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</h2>

//         <form onSubmit={handleSubmit} className="employee-form">
//           <div className="form-grid">
//             {[
//               { label: "Employee Name", name: "name", type: "text" },
//               { label: "Job Title", name: "jobTitle", type: "text" },
//               { label: "Cellphone 1", name: "cellphone1", type: "text" },
//               { label: "Cellphone 2", name: "cellphone2", type: "text" },
//               { label: "Email ID", name: "emailid", type: "email" },
//               { label: "Address", name: "address", type: "text" },
//               { label: "City", name: "city", type: "text" },
//               { label: "State", name: "state", type: "text" },
//               { label: "Payment Method", name: "paymentMethod", type: "text" },
//               { label: "Language", name: "language", type: "text" },
//               { label: "Vacation Days", name: "paidVacationDays", type: "number" },
//               { label: "Sick Days", name: "paidSickDays", type: "number" },
//               { label: "Date of Birth", name: "dateofbirth", type: "date" },
//               { label: "Date of Joining", name: "dateofjoining", type: "date" },
              
//             ].map((field) => (
//               <div key={field.name} className="form-group">
//                 <label>{field.label}</label>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   value={employee[field.name]}
//                   onChange={handleChange}
//                   required={field.name === "name"}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="form-buttons">
//             <button type="submit" className="submit-btn">
//               {selectedEmployee ? "Update Employee" : "Add Employee"}
//             </button>

//             <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
