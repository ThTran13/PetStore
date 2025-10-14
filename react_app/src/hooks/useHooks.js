import { useState, useEffect, useCallback } from 'react';
import { getAll, create, update, remove } from '../routes/abstract_routes';

export function UseHooks(url, initialItem) {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(initialItem);
    const [refresh, setRefresh] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAll(url);
            setItems(data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData, refresh]); 

    const handleChange = (e) => {
        setNewItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreate = async (transform = (x) => x) => {
        try {
            const formatted = transform(newItem);
            await create(url, formatted);
            setNewItem(initialItem);
            setRefresh((prev) => !prev); 
        } catch (err) {
            console.error('Error creating item:', err);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await update(url, id, updatedData);
            setRefresh((prev) => !prev); 
        } catch (err) {
            console.error('Error updating item:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(url, id);
            setRefresh((prev) => !prev);
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    return {
        items,
        newItem,
        handleChange,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
}

export default UseHooks;
