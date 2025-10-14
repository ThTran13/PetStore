import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Box } from '@mui/material';
import API_URLS from '../constants/url';
import { UseHooks } from '../hooks/useHooks';
import { useState } from 'react';
import { Button } from '../components';

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
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
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

            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={(params) => setSelectedRows([params.id])}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    );
}

export default Customers;
