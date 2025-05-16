import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function ProductPagination({ count, page, onChange, variant, shape }) {
  return (
    <Stack spacing={2}>

      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        variant={variant}
        shape={shape}
      />
    </Stack>
  );
}
export default ProductPagination
