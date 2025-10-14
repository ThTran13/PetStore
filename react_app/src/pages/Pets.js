import { DataGrid } from '@mui/x-data-grid';
import { Paper, TextField, Box } from '@mui/material';
import API_URLS from '../constants/url';
import { UseHooks } from '../hooks/useHooks';
import { useState } from 'react';
import { Button } from '../components';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'cost', headerName: 'Cost ($)', width: 120, type: 'number' },
    { field: 'age', headerName: 'Age', width: 100, type: 'number' },
    { field: 'breed', headerName: 'Breed', width: 150 },
];

const paginationModel = { page: 0, pageSize: 5 };

function Pets() {
    const [selectedRows, setSelectedRows] = useState([]);

    const {
        items: pets,
        newItem: newPet,
        handleChange,
        handleCreate,
        handleDelete,
    } = UseHooks(API_URLS.PETS, { name: '', cost: '', age: '', breed: '' });

    const handleCreatePet = () =>
        handleCreate((data) => ({
            ...data,
            cost: parseFloat(data.cost),
            age: parseInt(data.age),
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
                <TextField
                    label="Name"
                    name="name"
                    value={newPet.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Cost"
                    name="cost"
                    type="number"
                    value={newPet.cost}
                    onChange={handleChange}
                />
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={newPet.age}
                    onChange={handleChange}
                />
                <TextField
                    label="Breed"
                    name="breed"
                    value={newPet.breed}
                    onChange={handleChange}
                />
                <Button variant="contained" onClick={handleCreatePet}>
                    Add Pet
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
                    rows={pets}
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

export default Pets;