import { NextResponse } from 'next/server';
import datasets from '@/../public/data/datasets.json' assert { type: 'json' };

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(datasets, {
    headers: {
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
