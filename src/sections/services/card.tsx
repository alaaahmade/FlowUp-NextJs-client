import { Avatar, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

interface ListingCardProps {
  title: string;
  images: string[];
  hours?: number;  // Optional, in case `hours` is not always available
  vendor?: string,
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
      <Avatar sx={{ml: '1em', width: '1.3em', height: '1.3em' }} src='https://s3-alpha-sig.figma.com/img/d198/ec7d/fabd67194782f154fd13d96e9dcf139d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fE1YUyowk8-pIfEeeHc-ktOT1BWbyxvQdGy6zNGS1tUI~PT~CRrxuLnHKwhzOSZmFzSXzepOD~sz0uWRSxoV41ff4fNegEmtQif9pKhMEs7dM0OpcsFu8FYLWK6C-vCCQmb58vUCgMJFO63rby6WKC9sGN6dtBFYWj8qZ7Z-EQmd9r~bxZyt7HbjKRdYLUpMbm-Su7CF8oBhnAsu1A5Vd62lZZykVrxpH7dbXSkDjkuI4thq2o43eSjPDAiS-wiYXRLCTBT-6zgfyFDhEX55AL49U6MzLaKScPyZoix519feveswGvlH1oAv86CEYrai6y9gGqKtmMvmjN50umPdfQ__'/>
        {vendor}

      </Typography>
      <Typography variant='h6' sx={{ m: '1em' }}>{credits} Credits</Typography>
        </Box>
        

    </Box>
  );
}
