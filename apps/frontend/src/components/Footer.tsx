import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={1}
      py={'0.5rem'}
    >
      <Typography
        variant="body2"
        variantMapping={{ body2: 'p' }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Challenge for Gamecomm
      </Typography>
    </Box>
  );
};

export default Footer;
