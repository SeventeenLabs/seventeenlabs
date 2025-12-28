export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  // Redirect the retired German RSS feed to the canonical English feed
  return Response.redirect(`${baseUrl}/rss`, 308);
}

export const revalidate = 3600; // Revalidate every hour