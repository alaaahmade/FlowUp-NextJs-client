import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    // OR using local (public folder)
    // -------------------------------------------------------

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        {...other}
      >

        
{/* <div style={{ transform: 'scale(3)', transformOrigin: 'top left' }}> */}
  <Box
      component="img"
      src="/logo/logo.svg"
      sx={{ width: 40, height: 40, cursor: 'pointer',transform: 'scale(3)', transformOrigin: 'center centre', ...sx ,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
       }}
      />
{/* </div> */}
        
     


      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
