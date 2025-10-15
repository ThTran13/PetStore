import { Paper, TextField, Box, Typography } from '@mui/material';
import API_URLS from '../constants/url';
import { UseHooks } from '../hooks/useHooks';
import { useState } from 'react';
import { Button, DataGrid } from '../components';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customerId', headerName: 'Customer ID', width: 120 },
    { field: 'totalAmount', headerName: 'Total', width: 100 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'transactionDate', headerName: 'Date', width: 150 },
];

const paginationModel = { page: 0, pageSize: 5 };

function Transactions() {
    const [selectedRows, setSelectedRows] = useState([]);
    const [orderItems, setOrderItems] = useState([{ itemId: '', itemType: 'product', quantity: 1 }]);

    const {
        items: transactions,
        newItem: newTransaction,
        handleChange,
        handleCreate,
    } = UseHooks(API_URLS.TRANSACTIONS, {
        customerId: '',
        status: 'pending'
    });

    const handleCreateTransaction = () => {
        const validItems = orderItems.filter(item => item.itemId && item.quantity > 0);

        if (validItems.length === 0) {
            alert('Please add at least one valid order item');
            return;
        }
        const transactionData = {
            customerId: parseInt(newTransaction.customerId),
            status: newTransaction.status || 'pending',
            orderItems: validItems.map(item => ({
                itemId: parseInt(item.itemId),
                itemType: item.itemType,
                quantity: parseInt(item.quantity)
            }))
        };

        handleCreate(() => transactionData);
        setOrderItems([{ itemId: '', itemType: 'product', quantity: 1 }]);
    };

    const addOrderItem = () => {
        setOrderItems(prev => [...prev, { itemId: '', itemType: 'product', quantity: 1 }]);
    };

    const updateOrderItem = (index, field, value) => {
        setOrderItems(prev => prev.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        ));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="h6">Create New Transaction</Typography>

                <Box   sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                        gap: 2,
                        mb: 2
                    }}
                >
                    <TextField
                        label="Customer ID"
                        name="customerId"
                        type="number"
                        value={newTransaction.customerId}
                        onChange={handleChange}
                        size="small"
                        required
                    />
                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={newTransaction.status}
                        onChange={handleChange}
                        SelectProps={{ native: true }}
                        size="small"
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </TextField>
                    <Button variant="contained" onClick={handleCreateTransaction}>
                        Create Transaction
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6">Order Items</Typography>
                    {orderItems.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                            <TextField
                                label="Item ID"
                                type="number"
                                value={item.itemId}
                                onChange={(e) => updateOrderItem(index, 'itemId', e.target.value)}
                                size="small"
                                sx={{ width: 100 }}
                                required
                            />
                            <TextField
                                select
                                label="Type"
                                value={item.itemType}
                                onChange={(e) => updateOrderItem(index, 'itemType', e.target.value)}
                                SelectProps={{ native: true }}
                                size="small"
                                sx={{ width: 120 }}
                            >
                                <option value="product">Product</option>
                                <option value="pet">Pet</option>
                            </TextField>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateOrderItem(index, 'quantity', parseInt(e.target.value) || 1)}
                                inputProps={{ min: 1 }}
                                size="small"
                                sx={{ width: 100 }}
                                required
                            />
                            <Button variant="outlined" onClick={addOrderItem} size="small" sx={{ width: 150 }}>
                                Add Another Item
                            </Button>
                        </Box>
                    ))}

                </Box>
            </Box>

            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={transactions}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    );
}

export default Transactions;