import { Avatar, Box, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

interface ListingCardProps {
  title: string;
  images: string[];
  hours?: number;  // Optional, in case `hours` is not always available
  vendor?: {
    fullName: string;
    picture: string;  
    email: string
  },
  credits: number
  id: string
}

export default function ListingCard({ title, images, hours, vendor, credits, id }: ListingCardProps) {
  const router = useRouter();
  return (
    <Box
      sx={{
        height: '25em',
        flexWrap: 'wrap',
        width: {
          xs: '100%',
          sm: '45%',
          md: '28%',
        },
        p: 0.5,
        m: 0,
        mb: 0.5,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        cursor: 'pointer'
      }}
      onClick={() => router.push(`/dashboard/services/${id}`) }
    >
      <Box 
        sx={{
          width: '100%',
          minHeight: '70%',
          height: '70% !important',
          borderRadius: 2,
          m: 0,
          backgroundSize: 'cover',
          backgroundImage: `url(${images[0]})`
        }} 
      />
      {/* {hours && <Typography sx={{ m: '1em' }}>{hours} - </Typography>} */}
      <Typography sx={{ m: '1em' }}>{hours && `${hours} - Hours `}{title}</Typography>
        <Box
        sx={{ display: 'flex', alignItems: 'center' ,
          justifyContent: 'space-between'
        }}>
        <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '12px'
        }}
      >
                <Avatar alt={vendor?.fullName} src={vendor?.picture} sx={{ mr: 2 }} />
      
                <ListItemText
                  primary={vendor?.fullName}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                  }}
                />

      </Typography>
      <Typography variant='h6' sx={{ m: '1em' }}>{credits} Credits</Typography>
        </Box>
        

    </Box>
  );
}
