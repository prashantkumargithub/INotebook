import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Login(props) {
    const [credentials, setCredentials] = useState({ email: '', passowrd: '' });
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch(`https://i-notebook-backend-plum.vercel.app/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            props.showAlert("Login Successfuly!", "success")
            localStorage.setItem('token', json.authtoken);
            setTimeout(() => {
                history("/");
            }, 800);
        }
        else {
            props.showAlert(json.error, "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-5'>
            <h2>Login - iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p className='text-muted my-3 text-decoration-none'>Not have Account? <Link className='text-decoration-none' to="/signup">Create Account</Link></p>
        </div>
    )
}

export default Login