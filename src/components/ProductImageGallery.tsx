const ProductImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  if (!imageUrls.length) return null;

  return (
    <ul>
      {imageUrls.map((url) => (
        <li key={url}>
          <img src={url} />
        </li>
      ))}
    </ul>
  );
};

export default ProductImageGallery;
