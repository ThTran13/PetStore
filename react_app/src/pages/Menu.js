import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Customers from './Customers';
import Pets from './Pets';
import Products from './Product';
import Transactions from './Transaction';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Tab } from '../components';

function Menu() {
  const [value, setValue] = useState('Pets');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  };

  const user = getCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (value) {
      case 'Customers':
        return <Customers />;
      case 'Pets':
        return <Pets />;
      case 'Accessories':
        return <Products />;
      case 'Transactions':
        return <Transactions />;
      default:
        return null;
    }
  };


  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: 3
    }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
        <Toolbar>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              PetStore Admin {`- ${user.email}`}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 2 }}>
        <Paper
          elevation={2}
          sx={{ borderRadius: 2 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="#f7eeed"
            aria-label="navigation tabs"
            variant="fullWidth"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Tab value="Pets" label="Pets" />
            <Tab value="Accessories" label="Accessories" />
            <Tab value="Customers" label="Customers" />
            <Tab value="Transactions" label="Transactions" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {renderTabContent()} { }
          </Box>
        </Paper>
      </Box>


    </Box>
  );
}

export default Menu;