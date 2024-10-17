import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


function Singup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: '', passowrd: '' });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch(`https://i-notebook-backend-plum.vercel.app/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      props.showAlert("Singup Successfully!", "success")
      localStorage.setItem('token', json.authtoken);
      setTimeout(() => {
        history("/");
      }, 2000);
    }
    else {
      props.showAlert(json.error, "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <form className="container my-5" onSubmit={handleSubmit}>
        <h2>Singup - iNoteBook</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
        <p className='text-muted my-3 text-decoration-none'>Already have Account? <Link className='text-decoration-none' to="/login">Login</Link></p>
      </form>
    </>
  )
}

export default Singup