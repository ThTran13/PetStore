import { useState } from 'react';
import { login } from '../routes/auth_route';
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateEmail = (event) => {
        setEmail(event.target.value);
    }
    
    const updatePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      navigate('/menu');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-secondary">
            <div className="p-3 bg-white w-25">
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email: </label>
                        <input type="text" id="email" name="email" placeholder="Enter your email" className='form-control'
                            onChange={updateEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" className='form-control'
                            onChange={updatePassword} />
                    </div>
                    <Button type="submit" variant="contained">Login</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
