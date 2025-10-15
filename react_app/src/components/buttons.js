import { Button as MuiButton } from '@mui/material';

export default function Button({ children, ...props }) {
  return (
    <MuiButton
      {...props}
      sx={{
        backgroundColor: '#f7eeed', 
        color: 'black',             
        '&:hover': {
          backgroundColor: '#f7eeed', 
        },
      }}
    >
      {children}
    </MuiButton>
  );
}