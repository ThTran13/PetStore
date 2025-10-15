import { useState } from 'react';
import { login } from '../routes/auth_route';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Paper,
    Box,
    Typography,
    Container,
    CssBaseline,
} from '@mui/material';


function Login() {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!value.email || !value.password) {
            setError('Please fill in all fields');
            return;
        }
        setError('');

        try {
            const response = await login(value.email, value.password);

            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            navigate('/menu');

        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 2,
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Sign In
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={value.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            autoComplete="current-password"
                            value={value.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        > Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}

export default Login;
