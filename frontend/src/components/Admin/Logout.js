import React from 'react';
import Swal from 'sweetalert2';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    Swal.fire({
      text: 'Logged out successfully!',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = '/login';
    });
  };

  return (
    <div className="absolute top-0 right-0 m-2">
      <button
        onClick={handleLogout}
        className="flex rounded bg-[#228b22] gap-2 w-full p-2 text-white hover:bg-[#e24141]"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
