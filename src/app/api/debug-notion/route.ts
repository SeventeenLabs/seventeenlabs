import { NextResponse } from 'next/server';

const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

export async function GET() {
  try {
    // Use direct fetch to avoid TypeScript issues
    const databaseResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    });
    
    const databaseInfo = await databaseResponse.json();
    console.log('🗂️ Database properties:', JSON.stringify(databaseInfo.properties, null, 2));

    // Get sample pages
    const pagesResponse = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        page_size: 2,
        filter: {
          property: 'Status',
          select: {
            equals: 'Published'
          }
        }
      })
    });

    const pagesData = await pagesResponse.json();
    console.log('📄 Sample pages:', JSON.stringify(pagesData.results, null, 2));

    // Return both schema and sample data
    return NextResponse.json({
      database_properties: databaseInfo.properties,
      sample_pages: pagesData.results,
      property_names: Object.keys(databaseInfo.properties || {})
    });
    
  } catch (error: any) {
    console.error('Debug error:', error);
    return NextResponse.json({ error: error?.message || 'Unknown error' }, { status: 500 });
  }
}