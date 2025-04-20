import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

export const StyledAuthWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'background.default',
  borderRadius: 2,
  width: '100%', // Default width for smaller screens
  maxWidth: '420px', // Max width for larger screens
  '@media (min-width: 1024px)': {
    width: '420px', // Set width to 420px on larger screens (computers)
  },
  minHeight: '100vh', // Center vertically
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}))

export const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))