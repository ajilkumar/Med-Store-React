import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/userContext';

function Login() {
    const { setIsLoggedIn } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();

        const loginuser = {
            email: email,
            password: password
        };

        axios.post('https://medicalstore.mashupstack.com/api/login', loginuser)
            .then(response => {
                const token = response.data.token;
                console.log(token);
                setIsLoggedIn(token); 
                navigate(`/home`);
            })
            
            .catch(error => {
                console.error('Error logging in:', error);
                setErrorMessage('Failed to login. Please try again.');
            });
    };

    
    return (
      <div>
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1 className="text-center">Login</h1>
      <div className="w-25 rounded bg-white border shadow p-4 mt-3">
      {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group mt-3">
                        <input type="text"
                        className="form-control"
                        value={email}
                        placeholder="Email"
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input type="password"
                        className="form-control"
                        value={password}
                        placeholder="Password"
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group text-center mt-3">
                        <button className="btn btn-primary w-50" onClick={submitLogin}>Login</button>
                    </div>
                    <p className="text-center mt-2">
            Do not have an account? <Link to={"/register"}>Click Here!</Link>
          </p>
      </div>
    </div>
      </div>
    )
}

export default Login;


