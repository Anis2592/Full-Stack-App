import React from "react";
import "./EmployeeDetails.css"; // ✅ Make sure to include the CSS file

const EmployeeDetails = ({ employee, onClick }) => {
  if (!employee) {
    return <p>No Employee Selected</p>; // ✅ Prevents crashes if no employee is selected
  }
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };
  return (
    <div className="employee-details-overlay" onClick={onClick}>
      <div className="employee-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="employee-details-content">
          <h2>{employee.name}</h2>

          {/* Employee Fields in Label-Value Format */}
          <div className="employee-field">
            <strong>Email:</strong> <span>{employee.emailid}</span>
          </div>
          <div className="employee-field">
            <strong>Job Title:</strong> <span>{employee.jobTitle || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>Phone 1:</strong> <span>{employee.cellphone1 || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>Phone 2:</strong> <span>{employee.cellphone2 || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>City:</strong> <span>{employee.city || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>State:</strong> <span>{employee.state || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>Payment Method:</strong> <span>{employee.paymentMethod || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>Language:</strong> <span>{employee.language || "N/A"}</span>
          </div>
          <div className="employee-field">
            <strong>Paid Vaction Days:</strong> <span>{employee.paidVacationDays || 0}</span>
            </div>
            <div className="employee-field">
              <strong> Paid Sick Days:</strong> <span>{employee.paidSickDays || 0}</span>
            </div>
            <div className="employee-field">
              <strong> Date of Birth:</strong> <span>{employee.dateofbirth}</span>
              </div>
          {/* Show Profile Image if Available */}
          <div className="avatar-container">
            {employee.avatar ? (
              <img 
                src={`http://localhost:5000${employee.avatar}`} 
                alt="Employee Avatar" 
                className="employee-avatar"
              />
            ) : (
              <img 
                src="/placeholder-avatar.png" 
                alt="Default Avatar" 
                className="employee-avatar"
              />
            )}
          </div>

          <button onClick={onClick} className="close-btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeDetails = ({ employeeId, onBack }) => {
//   const [employee, setEmployee] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!employeeId) {
//       setError("Invalid Employee ID");
//       setLoading(false);
//       return;
//     }

//     const fetchEmployee = async () => {
//       try {
//         console.log("🟢 Fetching Employee ID:", employeeId);
//         const { data } = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
//         setEmployee(data);
//       } catch (err) {
//         console.error("🔥 Error fetching employee:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to fetch employee details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployee();

//     // Cleanup function: Avoids state updates on unmounted component
//     return () => setEmployee(null);
//   }, [employeeId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-2">{employee.name}</h2>
//       {employee.avatar ? (
//         <img src={`http://localhost:5000${employee.avatar}`} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
//       ) : (
//         <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
//           <span className="text-gray-600">No Image</span>
//         </div>
//       )}
//       <p className="mt-2"><strong>Email:</strong> {employee.emailid || "N/A"}</p>
//       <p><strong>Job Title:</strong> {employee.jobTitle || "N/A"}</p>
//       <p><strong>Phone 1:</strong> {employee.cellphone1 || "N/A"}</p>
//       <p><strong>Phone 2:</strong> {employee.cellphone2 || "N/A"}</p>
//       <p><strong>Address:</strong> {employee.address}, {employee.city}, {employee.state}</p>
//       <p><strong>Payment Method:</strong> {employee.paymentMethod || "N/A"}</p>
//       <p><strong>Language:</strong> {employee.language || "N/A"}</p>
//       <p><strong>Paid Vacation Days:</strong> {employee.paidVacationDays || 0}</p>
//       <p><strong>Paid Sick Days:</strong> {employee.paidSickDays || 0}</p>
//       <p><strong>Date of Birth:</strong> {employee.dateofbirth ? new Date(employee.dateofbirth).toLocaleDateString() : "N/A"}</p>
//       <p><strong>Date of Joining:</strong> {employee.dateofjoining ? new Date(employee.dateofjoining).toLocaleDateString() : "N/A"}</p>

//       <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">Back</button>
//     </div>
//   );
// };

// export default EmployeeDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EmployeeDetails = ({ employeeId, onBack }) => {
//   const [employee, setEmployee] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!employeeId) {
//       setError("Invalid Employee ID");
//       return;
//     }

//     console.log("🟢 Fetching Employee ID:", employeeId);

//     axios
//       .get(`http://localhost:5000/api/employees/${employeeId}`)
//       .then((res) => setEmployee(res.data))
//       .catch((err) => {
//         console.error("🔥 Error fetching employee:", err.response?.data);
//         setError("Failed to fetch employee details.");
//       });
//   }, [employeeId]);

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!employee) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
//       <h2 className="text-xl font-bold">{employee.name}</h2>
//       <p>Email: {employee.emailid || "N/A"}</p>
//       <p>Job Title: {employee.jobTitle || "N/A"}</p>
//       <button onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
//     </div>
//   );
// };

// export default EmployeeDetails;


// import { useEffect, useState } from "react";

// const EmployeeDetails = ({ employeeId }) => {
//   const [employee, setEmployee] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/employees/${employeeId}`)
//       .then((res) => res.json())
//       .then((data) => setEmployee(data))
//       .catch((err) => console.error("Error fetching employee:", err));
//   }, [employeeId]);

//   if (!employee) return <p>Loading...</p>;

//   const employeeFields = [
//     ["Job Title", employee.jobTitle || "N/A"],
//     ["Cellphone", employee.cellphone1 || employee.cellphone2 || "N/A"],
//     ["Email", employee.emailid || "N/A"],
//     ["Address", employee.address || "N/A"],
//     ["City", employee.city || "N/A"],
//     ["State", employee.state || "N/A"],
//     ["Payment Method", employee.paymentMethod || "N/A"],
//     ["Language", employee.language || "N/A"],
//     ["Vacation Days", employee.paidVacationDays || "0"],
//     ["Sick Days", employee.paidSickDays || "0"],
//     ["Date of Birth", employee.dateofbirth || "N/A"],
//     ["Date of Joining", employee.dateofjoining || "N/A"]
//   ];

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
//       {/* Employee Header */}
//       <div className="flex items-center space-x-4">
//         <img
//           src="https://via.placeholder.com/50"
//           alt="Profile"
//           className="rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-bold">{employee.name}</h2>
//           <p className="text-gray-600">{employee.emailid}</p>
//           <p className="text-gray-500">{employee.jobTitle}</p>
//         </div>
//       </div>

//       {/* Employee Details */}
//       <div className="mt-4 border-t pt-4">
//         {employeeFields.map(([label, value]) => (
//           <div key={label} className="flex justify-between py-2 border-b">
//             <span className="font-semibold text-gray-700">{label}:</span>
//             <span className="text-gray-600">{value}</span>
//           </div>
//         ))}
//       </div>

//       {/* Buttons */}
//       <div className="mt-6 flex justify-between">
//         <button className="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Punch Clock
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;


// import React, { useEffect } from "react";
// import { format } from "date-fns";

// export default function EmployeeDetails({ employee, onClick }) {
//   useEffect(() => {
//     // Always apply the body overflow change when the component mounts
//     document.body.classList.add("overflow-hidden");
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, []); // This will run only once, after the initial render

//   if (!employee) return null;

//   const formatDate = (date) =>
//     date && !isNaN(Date.parse(date)) ? format(new Date(date), "MM/dd/yyyy") : "N/A";

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClick}
//       ></div>
//       <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//         <div
//           className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto p-6 relative"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Employee Profile */}
//           <div className="flex flex-col items-center text-center mb-6">
//             <img
//               src={employee.avatar?.trim() ? employee.avatar : "/default-avatar.png"}
//               alt={employee.name || "Employee"}
//               className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-gray-200"
//             />
//             <h3 className="text-xl font-semibold mt-3">{employee.name || "N/A"}</h3>
//             <p className="text-gray-500 text-sm">{employee.jobTitle || "N/A"}</p>
//           </div>

//           <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
//             <p className="font-semibold text-right">Cellphone:</p>
//             <p>{employee.cellphone1 || employee.cellphone2 || "N/A"}</p>

//             <p className="font-semibold text-right">Email:</p>
//             <p>{employee.emailid || "N/A"}</p>

//             <p className="font-semibold text-right">Address:</p>
//             <p>{employee.address || "N/A"}</p>

//             <p className="font-semibold text-right">City:</p>
//             <p>{employee.city || "N/A"}</p>

//             <p className="font-semibold text-right">State:</p>
//             <p>{employee.state || "N/A"}</p>

//             <p className="font-semibold text-right">Payment Method:</p>
//             <p>{employee.paymentMethod || "N/A"}</p>

//             <p className="font-semibold text-right">Language:</p>
//             <p>{employee.language || "N/A"}</p>

//             <p className="font-semibold text-right">Vacation Days:</p>
//             <p>{employee.paidVacationDays || "0"}</p>

//             <p className="font-semibold text-right">Sick Days:</p>
//             <p>{employee.paidSickDays || "0"}</p>

//             <p className="font-semibold text-right">Date of Birth:</p>
//             <p>{formatDate(employee.dateofbirth)}</p>

//             <p className="font-semibold text-right">Date of Joining:</p>
//             <p>{formatDate(employee.dateofjoining)}</p>
//           </div>

//           <div className="flex justify-center mt-6">
//             <button
//               onClick={onClick}
//               className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
