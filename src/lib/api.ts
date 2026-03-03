import { z } from 'zod';
import { GTINRequest, GTINResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const PromotionSchema = z.looseObject({
  id: z.string().optional(),
  name: z.string().optional(),
  base: z.string().optional(),
  loyalty: z.string().optional(),
  url: z.string().optional(),
  start: z.number().optional(),
  end: z.number().optional(),
  old_price: z.number().optional(),
  new_price: z.number().optional(),
});

const ProductDataSchema = z.looseObject({
  store: z.string().optional().default(''),
  gtin: z.string().optional().default(''),
  time: z.number().optional().default(0),
  raw: z.unknown().optional(),
  id: z.string().optional().default(''),
  name: z.string().optional().default(''),
  brand: z.string().optional().default(''),
  categories: z.array(z.string()).optional().default([]),
  quantity: z.number().optional().default(0),
  currency: z.string().optional().default(''),
  price: z.number().optional().default(0),
  unit_price: z.number().optional().default(0),
  unit_of_measure: z.string().optional().default(''),
  discounts: z.array(z.union([z.string(), z.number()])).optional().default([]),
  promotions: z.array(z.union([z.string(), PromotionSchema])).optional().default([]),
  images: z.array(z.string()).optional().default([]),
  rating: z.number().optional().default(0),
  rating_count: z.number().optional().default(0),
  url: z.string().optional().default(''),
});

const GTINResponseSchema = z.record(z.string(), ProductDataSchema);

export async function getProductByGTIN(gtin: string): Promise<GTINResponse> {
  const request: GTINRequest = { gtin, raw: false };

  const response = await fetch(`${API_URL}/gtin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return GTINResponseSchema.parse(data) as GTINResponse;
}
