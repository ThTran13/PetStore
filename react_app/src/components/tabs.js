import { Tab as MuiTab } from '@mui/material';

export default function Tab({ children, ...props }) {
    return (
        <MuiTab
            {...props}
            sx={{
                py: 2,
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
                '&.Mui-selected': {
                    backgroundColor: '#f7eeed',
                    color: 'black'
                }
            }}
        >
            {children}
        </MuiTab>
    );
}