import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

export default function DataGrid({ children, ...props }) {
    return (
        <MuiDataGrid
            {...props}
            sx={{
                border: 0,
                '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f7eeed',
                    color: 'black',
                    fontSize: '1rem'
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'action.hover'
                }
            }}
        >
            {children}
        </MuiDataGrid>
    );
}
