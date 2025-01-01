// import React, { useEffect, useState } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';
// import { delet, get } from '../../services/Endpoint';
// import toast from 'react-hot-toast';

// export default function User() {
//   const [Users,setUsers]=useState([])
//   const [loadedata,setLoadedata]=useState(false)
//   // const users = [
//   //   { id: 1, name: 'John Doe', email: 'john@example.com' },
//   //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
//   //   { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
//   //   // Add more users as needed
//   // ];

//   const handleDelete = async (userId) => {
//     // Display a confirmation dialog
//     const confirmed = window.confirm('Are you sure you want to delete this user?');
  
//     if (confirmed) {
//       try {
//         const response = await delet(`/dashboard/delete/${userId}`);
//         const data = response.data;
  
//         if (data.success) {
//           toast.success(data.message);
//           setLoadedata(!loadedata); // Trigger reloading the data
//         } else {
//           toast.error('Failed to delete the user.');
//         }
//       } catch (error) {
//         console.error('Error deleting user:', error);
   
//         if (error.response && error.response.data && error.response.data.message) {
//             // setError(error.response.data.message); // Set error message from server response
//             toast.error(error.response.data.message)
//         } else {
//             toast.error("An unexpected error occurred. Please try again.");
//         }
//       }
//     }
//   };
  
//  useEffect(()=>{
//   const getuser=async()=>{
//     try {
//         const resposne= await get("/dashboard/users")
//         const data= resposne.data
//         setUsers(data.Users)
//         console.log(data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   getuser()
//  },[loadedata])
//   return (
//     <div className="container ">
//       <h1 className=" text-white mb-4">Users</h1>
//       <div className="table-responsive">
//         <table className="table table-striped table-dark">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Users && Users.map((user, index) => (
//               <tr key={user.id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.FullName}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => handleDelete(user._id)}
//                   >
//                     <FaTrashAlt /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







// responsive code






import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { delet, get } from '../../services/Endpoint';
import toast from 'react-hot-toast';

export default function User() {
  const [Users, setUsers] = useState([]);
  const [loadedata, setLoadedata] = useState(false);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        const response = await delet(`/dashboard/delete/${userId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata);
        } else {
          toast.error('Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      }
    }
  };

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await get('/dashboard/users');
        const data = response.data;
        setUsers(data.Users);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [loadedata]);

  return (
    <div className="user-container">
      <h1 className="text-white text-center mb-4">Users</h1>
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.FullName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Users.length === 0 && (
        <div className="no-users">
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
}
