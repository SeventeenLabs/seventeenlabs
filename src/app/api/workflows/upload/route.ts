import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const WORKFLOW_FILES_BUCKET = 'workflow-files';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const filename = formData.get('filename') as string;

    if (!file) {
      return NextResponse.json({ 
        success: false, 
        error: 'No file provided' 
      }, { status: 400 });
    }

    if (!filename) {
      return NextResponse.json({ 
        success: false, 
        error: 'No filename provided' 
      }, { status: 400 });
    }

    // Validate file type
    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      return NextResponse.json({ 
        success: false, 
        error: 'File must be a JSON file' 
      }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ 
        success: false, 
        error: 'File size must be less than 5MB' 
      }, { status: 400 });
    }

    // Read file content
    const fileContent = await file.text();
    
    // Validate JSON format
    try {
      JSON.parse(fileContent);
    } catch {
      return NextResponse.json({ 
        success: false, 
        error: 'File must contain valid JSON' 
      }, { status: 400 });
    }

    // Upload to Supabase Storage
    const { error } = await supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .upload(filename, fileContent, {
        contentType: 'application/json',
        upsert: false
      });

    if (error) {
      console.error('Error uploading workflow JSON to Supabase:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to upload file to storage' 
      }, { status: 500 });
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(WORKFLOW_FILES_BUCKET)
      .getPublicUrl(filename);
    
    if (!publicUrl) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to generate public URL for uploaded file' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      fileUrl: publicUrl,
      filename: filename 
    });
  } catch (error) {
    console.error('Error uploading workflow file:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to upload file' 
    }, { status: 500 });
  }
}