import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Customers from './Customers';
import Pets from './Pets';
import Products from './Product';

function Menu() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const renderTabContent = () => {
    switch (value) {
      case 'Customers':
        return <Customers />;
      case 'Pets':
        return <Pets />;
      case 'Accessories':
        return <Products />;
      default:
        return null;
    }
  };


  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh',
      backgroundColor: '#c8a2c9',
      padding: 3
    }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{ 
          backgroundColor: 'white',
          borderRadius: 3,
          boxShadow: 1,
          mb: 2
        }}
      >
        <Tab value="Pets" label="Pets" />
        <Tab value="Accessories" label="Accessories" />
        <Tab value="Customers" label="Customers" />
        <Tab value="Transactions" label="Transactions" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {renderTabContent()} {}
      </Box>
    </Box>
  );
}

export default Menu;