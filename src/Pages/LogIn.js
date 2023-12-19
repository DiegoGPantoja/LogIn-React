import React, {useState, useSelector} from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../Store/UserSlice';
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css';

const Login = () => {

    //states
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');

    //redux state
    const {loading, error} = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginEvet = (e) => {
        e.preventDefault();
        let userCredentials = {
            username, password
        }
        dispatch(loginUser(userCredentials)).then((result) => {
            if(result.payload){
                setUsername('');
                setPassword('');
                navigate('/');
            }
        })
    }

    return(
        <form className="form-group custom-form" onSubmit={handleLoginEvet}>
            <label> Username </label>
            <input type="username" required className="form-control" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}/>
            <br />

            <label>Password</label>
            <input type="password" required className="form-control" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <br />

            <button type="submit" className="btn btn-success btn-md"> 
                {loading ? 'Loading...' : 'Login'}
            </button>
            {error && (
                <div>
                    {error}
                </div>
            )}
        </form>
    )
}

export default Login