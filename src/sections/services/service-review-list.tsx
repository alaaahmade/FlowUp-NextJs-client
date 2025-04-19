// @mui
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
// import { IServiceReview } from 'src/types/product';
//
import { IServicesReview } from 'src/types/services';
import ProductReviewItem from './service-review-item';

// ----------------------------------------------------------------------

type Props = {
  reviews: IServicesReview[];
};

export default function ProductReviewList({ reviews }: Props) {
  return (
    <>
      {reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={10}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
