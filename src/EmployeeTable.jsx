import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles

export default function EmployeeTable({
  employees,
  setEmployees,
  setShowForm,
  setSelectedEmployee,
  onViewEmployee,
}) {
  const [deletingId, setDeletingId] = useState(null); // Track deleting state

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setDeletingId(id);
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);

        // Remove employee from state after successful deletion
        setEmployees((prevEmployees) => prevEmployees.filter((e) => e._id !== id));

        toast.success("✅ Employee deleted successfully.");
      } catch (error) {
        console.error("🔥 Error deleting employee:", error);
        toast.error("❌ Failed to delete employee.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="table-wrapper">
      {employees.length === 0 ? (
        <p className="no-employees-message">No employees found. Add some employees to display.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Cellphone1</th>
              <th>Cellphone2</th>
              <th>City</th>
              <th>State</th>
              <th>Email ID</th>
              <th>Address</th>
              <th>Job Title</th>
              <th>Language</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.cellphone1 || "N/A"}</td>
                <td>{employee.cellphone2 || "N/A"}</td>
                <td>{employee.city || "N/A"}</td>
                <td>{employee.state || "N/A"}</td>
                <td>{employee.emailid}</td>
                <td>{employee.address || "N/A"}</td>
                <td>{employee.jobTitle || "N/A"}</td>
                <td>{employee.language || "N/A"}</td>
                <td>{employee.paymentMethod || "N/A"}</td>
                
                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowForm(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee._id)}
                    disabled={deletingId === employee._id} // Disable if deleting
                  >
                    {deletingId === employee._id ? "Deleting..." : <FaTrash />}
                  </button>
                  <button className="view-btn" onClick={() => onViewEmployee(employee)}>
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// import React from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// export default function EmployeeTable({
//   employees,
//   setEmployees,
//   setShowForm,
//   setSelectedEmployee,
//   onViewEmployee,
// }) {
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/employees/${id}`);

//         // Remove from state after successful deletion
//         setEmployees((prevEmployees) => prevEmployees.filter((e) => e._id !== id));

//         alert("Employee deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting employee:", error);
//         alert("Failed to delete employee.");
//       }
//     }
//   };

//   return (
//     <div className="table-wrapper">
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Cellphone1</th>
//             <th>Cellphone2</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Email ID</th>
//             <th>Address</th>
//             <th>Job Title</th>
//             <th>Language</th>
//             <th>Payment Method</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee._id}>
//               <td>{employee.name}</td>
//               <td>{employee.cellphone1}</td>
//               <td>{employee.cellphone2}</td>
//               <td>{employee.city}</td>
//               <td>{employee.state}</td>
//               <td>{employee.emailid}</td>
//               <td>{employee.address}</td>
//               <td>{employee.jobTitle}</td>
//               <td>{employee.language}</td>
//               <td>{employee.paymentMethod}</td>
//               <td className="action-buttons">
//                 <button
//                   className="edit-btn"
//                   onClick={() => {
//                     setSelectedEmployee(employee);
//                     setShowForm(true);
//                   }}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(employee._id)}>
//                   <FaTrash />
//                 </button>
//                 <button className="view-btn" onClick={() => onViewEmployee(employee)}>
//                   <FaEye />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import React from "react";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
 

// export default function EmployeeTable({
//   employees,
//   setEmployees,
//   setShowForm,
//   setSelectedEmployee,
//   onViewEmployee,
// }) {
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       const updatedEmployees = employees.filter((e) => e.id !== id);
//       setEmployees(updatedEmployees);

//       if (updatedEmployees.length > 0) {
//         localStorage.setItem("employees", JSON.stringify(updatedEmployees));
//       } else {
//         localStorage.removeItem("employees");
//       }
//     }
//   };

//   return (
//     <div className="table-wrapper">
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Cellphone1</th>
//             <th>cellphone2</th>
//             <th>City</th>
//             <th>State</th>
//             <th>Email ID</th>
//             <th>Address</th>
//             <th>Job Title</th>
//             <th>Language</th>
//             <th>Payment Method</th>
           
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.name}</td>
//               <td>{employee.cellphone1}</td>
//               <td>{employee.cellphone2}</td>
//               <td>{employee.city}</td>
//               <td>{employee.state}</td>
//               <td>{employee.emailid}</td>
//               <td>{employee.address}</td>
//               <td>{employee.jobTitle}</td>
//               <td>{employee.language}</td>
//               <td>{employee.paymentMethod}</td>
             
              
              
              
//               <td className="action-buttons">
//                 <button
//                   className="edit-btn"
//                   onClick={() => {
//                     setSelectedEmployee(employee);
//                     setShowForm(true);
//                   }}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(employee.id)}
//                 >
//                   <FaTrash />
//                 </button>
//                 <button
//                   className="view-btn"
//                   onClick={() => onViewEmployee(employee)}
//                 >
//                   <FaEye />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
