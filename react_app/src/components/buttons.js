import { Button as MuiButton } from '@mui/material';

export default function Button({ children, ...props }) {
  return (
    <MuiButton
      {...props}
      sx={{
        backgroundColor: '#6a0dad', 
        color: '#fff',             
        '&:hover': {
          backgroundColor: '#580c99', 
        },
      }}
    >
      {children}
    </MuiButton>
  );
}