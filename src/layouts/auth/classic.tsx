// @mui
import {  useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// theme
// components
import Logo from 'src/components/logo';
import { Grid, Typography } from '@mui/material';

// ----------------------------------------------------------------------


type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 1.5, md: 4},

      }}
    />
  );
  const helpSupport = (
    <Box
      sx={{
        position: 'absolute',
        left: '3em',
        bottom: '1em',
        zIndex: 9,
        // m: { xs: 1.5, md: 3},
        p: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}
    >
      Having an issue? 
      <span 
        style={{
          color: theme.palette.primary.main,
          cursor: 'pointer',
          fontWeight: '600',

        }}
      >Contact support </span></Box>)

  const renderContent = (
    <Stack
      sx={{
        width: '100%',
        // maxWidth: 480,
        // px: { xs: 2, md: 8 },
        // py: { xs: 15, md: 30 },
        p: 0,
        m: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
    </Stack>
  );



  return (
    <Stack
      direction="column"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        p: 0,
        m: 0,
        boxSizing: "border-box",
      }}
    >

      <Grid 
        container 
        spacing={0} 
        sx={{ flexGrow: 1, height: "100vh", 
          p: 0,
          m: 0,
          boxSizing: "border-box",
         }}
      >

        <Grid item xs={12} md={4}
          sx={{
            position: "relative",
          }}
        >
         {renderLogo}
      {renderContent}
      {helpSupport}
        </Grid>
        <Grid item xs={12} md={8} spacing={0} sx={{}}>
          <Box
            sx={{
              // backgroundColor: "lightcoral",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: 'url("/assets/background/sign_up (1).png")',
              backgroundSize: "contain",
              backgroundPosition: "top center", 
              backgroundRepeat: "no-repeat",
              backgroundColor: "#fff",
      
              "@media (max-width: 768px)": {
                backgroundSize: "cover", 
                backgroundPosition: "top", 
              },
            }}
           />
        </Grid>

      </Grid>


    </Stack>
  );
}
