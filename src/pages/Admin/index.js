import React, { useEffect, useState } from 'react';
import './Admin.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';

const Admin = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    const { signin, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            history.replace("/dashboard");
        }
    },[])

    const onInputChange = (e) => {
        const stateObj = {
            ...state,
            [e.target.name]: e.target.value
        }
        setState(stateObj);
    }

    const handleSignIn = () => {
        setError('');
        setLoading(true);
        const email = state.email;
        const password = state.password;
        signin(email, password)
            .then((ref) => {
                setLoading(false);
                console.log(ref);
                history.push('/dashboard');
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    return (
        <div className="admin-login">
            <h2 className="admin-title">Admin</h2>
            {error && <div className="alert alert-danger">
                {error}
            </div>}
            <form className="admin" method="post">
                <div className="row form-group">
                    <div className="col-md-3 offset-md-2">
                        <label htmlFor="email" className="form-control-label">Email Address</label>
                    </div>
                    <div className="col-md-6">
                        <input type="email" name="email" id="email" className="form-control" onChange={onInputChange} />
                    </div>
                </div>
                <div className="row form-group mt-2">
                    <div className="col-md-3 offset-md-2">
                        <label htmlFor="password" className="form-control-label">Password</label>
                    </div>
                    <div className="col-md-6">
                        <input type="password" name="password" id="password" className="form-control" onChange={onInputChange} />
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="col-md-3 offset-md-5">
                    <button className="btn btn-dark" onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default Admin;
