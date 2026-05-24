export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductData(params.slug);
  return {
    title: `${product.name} | Nexus Premium Marketplace`,
    description: product.description,
    openGraph: { images: [{ url: product.images[0] }] }
  };
}