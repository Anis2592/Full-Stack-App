import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";
import AddEmp from "./AddEmp";
import EmployeeDetails from "./EmployeeDetails";
import "./index.css"; // Import the CSS file

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Employees from MongoDB
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:5000/api/employees");
        setEmployees(data);
      } catch (error) {
        console.error("🔥 Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // ✅ Function to add or update an employee
  const addEmployee = async (newEmployee, avatarFile) => {
    try {
      const formData = new FormData();
      for (const key in newEmployee) {
        formData.append(key, newEmployee[key]);
      }
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      let response;
      if (selectedEmployee) {
        // ✅ Update existing employee
        response = await axios.put(
          `http://localhost:5000/api/employees/${selectedEmployee._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // ✅ Create new employee
        response = await axios.post(
          "http://localhost:5000/api/employees",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // ✅ Refetch employees after adding/updating
      const { data } = await axios.get("http://localhost:5000/api/employees");
      setEmployees(data);
      handleCloseModal();
    } catch (error) {
      console.error("🔥 Error saving employee:", error);
      alert("❌ Failed to save employee.");
    }
  };

  // ✅ Function to delete an employee
  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);

        // ✅ Refetch employees after deletion
        const { data } = await axios.get("http://localhost:5000/api/employees");
        setEmployees(data);
      } catch (error) {
        console.error("🔥 Delete Error:", error);
        alert("❌ Failed to delete employee.");
      }
    }
  };

  // ✅ Open Form to Add Employee
  const handleOpenModal = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  // ✅ Close Modal
  const handleCloseModal = () => {
    setShowForm(false);
  };

  // ✅ View Employee Details
  const handleViewEmployee = (employee) => {
    console.log("Viewing Employee:",employee);
    
    setViewEmployee(employee);
  };

  // ✅ Close Employee Details
  const handleCloseDetails = () => {
    setViewEmployee(null);
  };

  return (
    <div className="container">
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Add Employee
      </button>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <EmployeeTable
          employees={employees}
          deleteEmployee={deleteEmployee} // ✅ Pass delete function
          setShowForm={setShowForm}
          setSelectedEmployee={setSelectedEmployee}
          onViewEmployee={handleViewEmployee}
        />
      )}

      {showForm && (
        <AddEmp
          setShowForm={handleCloseModal}
          addEmployee={addEmployee}
          selectedEmployee={selectedEmployee}
        />
      )}

      {viewEmployee && <EmployeeDetails employee={viewEmployee} onClick={handleCloseDetails} />}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import EmployeeTable from "./EmployeeTable";
// import AddEmp from "./AddEmp";
// import EmployeeDetails from "./EmployeeDetails";
// import './index.css'; // Import the CSS file

// export default function App() {
//   const [employees, setEmployees] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [viewEmployee, setViewEmployee] = useState(null);

//   useEffect(() => {
//     const savedData = localStorage.getItem("employees");
//     if (savedData) {
//       setEmployees(JSON.parse(savedData)); 
//     }
//   }, []);

//   useEffect(() => {
//     if (employees.length > 0) {
//       localStorage.setItem("employees", JSON.stringify(employees));
//     }
//   }, [employees]);

//   const addEmployee = (newEmployee) => {
//     if (selectedEmployee) {
//       const updatedEmployees = employees.map((emp) =>
//         emp.id === selectedEmployee.id ? { ...emp, ...newEmployee } : emp
//       );
//       setEmployees(updatedEmployees);
//     } else {
//       setEmployees([...employees, { id: Date.now(), ...newEmployee }]);
//     }
//     handleCloseModal();
//   };

//   const handleOpenModal = () => {
//     setSelectedEmployee(null);  
//     setShowForm(true);
//   };

//   const handleCloseModal = () => {
//     setShowForm(false);
//   };

//   const handleViewEmployee = (employee) => {
//     setViewEmployee(employee); 
//   };

//   const handleCloseDetails = () => {
//     setViewEmployee(null);
//   };

//   return (
//     <div className="container">
//       <button
//         className="btn btn-primary"
//         onClick={handleOpenModal}
//       >
//         Add Employee
//       </button>
//       <EmployeeTable
//         employees={employees}
//         setEmployees={setEmployees}
//         setShowForm={setShowForm}
//         setSelectedEmployee={setSelectedEmployee}
//         onViewEmployee={handleViewEmployee}
//       />
//       {showForm && (
//         <AddEmp
//           setShowForm={handleCloseModal}
//           addEmployee={addEmployee}
//           selectedEmployee={selectedEmployee}
//         />
//       )}
//       {viewEmployee && (
//         <EmployeeDetails
//           employee={viewEmployee}
//           onClick={handleCloseDetails}
//         />
//       )}
//     </div>
//   );
// }
