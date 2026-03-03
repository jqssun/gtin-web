import GTINPageClient from '@/components/GTINPageClient';
import { getProductByGTIN } from '@/lib/api';
import { GTINResponse } from '@/lib/types';

interface PageProps {
  params: Promise<{ gtin: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { gtin } = await params;
  return { title: `${gtin} - Search GTIN` };
}

export default async function GTINPage({ params }: PageProps) {
  const { gtin } = await params;

  let products: GTINResponse = {};
  let error: string | null = null;

  try {
    products = await getProductByGTIN(gtin);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch information';
  }

  return <GTINPageClient gtin={gtin} products={products} error={error} />;
}
