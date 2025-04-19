// @mui
import {  useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// theme
// components
import Logo from 'src/components/logo';

// ----------------------------------------------------------------------


type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 1.5, md: 2},
      }}
    />
  );
  const helpSupport = (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        zIndex: 9,
        m: { xs: 1.5, md: 2},
        p: 0.5,
        fontWeight: '600',
      }}
    >Need help ? </Box>)

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        // py: { xs: 15, md: 30 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Stack>
  );



  return (
    <Stack
      direction="row"
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: 'url("/assets/background/sign_up (1).png")',
        backgroundSize: "cover", 
        backgroundPosition: "top center", 
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000", 

        "@media (max-width: 768px)": {
          backgroundSize: "cover", 
          backgroundPosition: "top", 
        },


      }}
    >
      {renderLogo}
      {helpSupport}


      {renderContent}
    </Stack>
  );
}
