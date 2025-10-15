import { Paper, TextField, Box, Typography } from '@mui/material';
import API_URLS from '../constants/url';
import { UseHooks } from '../hooks/useHooks';
import { useState } from 'react';
import { Button, DataGrid } from '../components';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'cost', headerName: 'Cost', width: 150 },
    { field: 'madeIn', headerName: 'Made In', width: 150 },
    { field: 'belongTo', headerName: 'Belong To', width: 150 },
];

const paginationModel = { page: 0, pageSize: 5 };

function Products() {
    const [selectedRows, setSelectedRows] = useState([]);

    const {
        items: products,
        newItem: newProduct,
        handleChange,
        handleCreate,
        handleDelete,
    } = UseHooks(API_URLS.PRODUCTS, { name: '', cost: '', madeIn: '', belongTo: '' });

    const handleCreateProduct = () =>
        handleCreate((data) => ({
            ...data,
            cost: parseFloat(data.cost),
        }));

    const handleDeleteSelected = async () => {
        if (selectedRows.length === 0) {
            alert('Please select products to delete');
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
                    Product Management
                </Typography>
            </Box>

            <Paper
                sx={{
                    p: 3,
                    mb: 3,
                    background: 'white'
                }}

            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                        gap: 2,
                        mb: 2
                    }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Cost"
                        name="cost"
                        type="number"
                        value={newProduct.cost}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Made In"
                        name="madeIn"
                        type="text"
                        value={newProduct.madeIn}
                        onChange={handleChange}
                    />

                    <TextField
                        label="Belong To"
                        name="belongTo"
                        type="text"
                        value={newProduct.belongTo}
                        onChange={handleChange}
                    />

                    <Button variant="contained" onClick={handleCreateProduct}>
                        Add Product
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
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                    gap: 2,
                    mb: 2
                }}>

                </Box>
            </Paper>


            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={products}
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

export default Products;