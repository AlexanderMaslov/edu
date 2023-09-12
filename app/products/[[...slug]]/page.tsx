import React from "react";

interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

const ProductsPage = ({ params, searchParams }: Props) => {
  const { slug } = params;
  const { sortOrder } = searchParams;

  return (
    <div>
      ProductsPage: {slug} {sortOrder}
    </div>
  );
};

export default ProductsPage;
