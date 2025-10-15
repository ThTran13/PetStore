import { Paper, TextField, Box, Typography } from '@mui/material';
import API_URLS from '../constants/url';
import { UseHooks } from '../hooks/useHooks';
import { useState } from 'react';
import { Button, DataGrid } from '../components';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phoneNum', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
];

const paginationModel = { page: 0, pageSize: 5 };

function Customers() {
    const [selectedRows, setSelectedRows] = useState([]);

    const {
        items: customers,
        newItem: newCustomer,
        handleChange,
        handleCreate,
        handleDelete,
    } = UseHooks(API_URLS.CUSTOMERS, { name: '', phoneNum: '', address: '' });

    const handleCreateCustomer = () =>
        handleCreate((data) => ({
            ...data,
            phoneNum: parseInt(data.phoneNum),
            address: parseInt(data.address),
        }));

    const handleDeleteSelected = async () => {
        if (selectedRows.length === 0) {
            alert('Please select customers to delete');
            return;
        }

        try {
            for (const id of selectedRows) {
                await handleDelete(id);
            }
            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting customers:', error);
            alert('Error deleting customers. Please try again.');
        }
    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                    Customers Management
                </Typography>
            </Box>
            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    background: 'white'
                }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 2
                }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={newCustomer.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Phone"
                        name="phoneNum"
                        type="number"
                        value={newCustomer.phoneNum}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        type="number"
                        value={newCustomer.address}
                        onChange={handleChange}
                    />

                </Box>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 2
                }}>
                    <Button variant="contained" onClick={handleCreateCustomer}>
                        Add Customer
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteSelected}
                        disabled={selectedRows.length === 0}
                    >
                        Delete Selected
                    </Button>
                </Box>
            </Paper>


            <Paper elevation={1}
                sx={{
                    height: 600,
                    width: '100%',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={(params) => {
                        setSelectedRows([params.id]);
                    }}
                />
            </Paper>
        </Box>
    );
}

export default Customers;
