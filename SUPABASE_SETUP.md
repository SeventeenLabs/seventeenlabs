# Supabase Integration Setup Guide

This guide will help you migrate your SeventeenLabs workflow database from JSON files to Supabase with cloud storage for workflow files.

## 📋 Prerequisites

- [Supabase account](https://supabase.com/)
- Node.js environment with your SeventeenLabs project

## 🚀 Step 1: Create Supabase Project

1. **Create a new project** in your Supabase dashboard
2. **Note down your project credentials**:
   - Project URL
   - Anon/Public key
   - Service role key (for server-side operations)

## 🔧 Step 2: Configure Environment Variables

Update your `.env.local` file with the Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 🗄️ Step 3: Set Up Database Schema

1. **Open the SQL Editor** in your Supabase dashboard
2. **Run the schema** from `supabase-schema.sql`:
   - Copy the contents of `supabase-schema.sql`
   - Paste and execute in the SQL Editor
   - This creates all necessary tables, indexes, and views

## 📦 Step 4: Set Up Storage Bucket

In your Supabase dashboard:

1. **Go to Storage** section
2. **Create a new bucket** named `workflow-files`
3. **Set bucket as public** (for workflow JSON file access)
4. **Configure policies**:
   - Allow public read access
   - Allow authenticated uploads/updates

Or run these SQL commands in the SQL Editor:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('workflow-files', 'workflow-files', true, 52428800, ARRAY['application/json']);

-- Policy for public read access
CREATE POLICY "Allow public read access to workflow files"
ON storage.objects FOR SELECT
USING (bucket_id = 'workflow-files');

-- Policy for authenticated upload
CREATE POLICY "Allow authenticated upload to workflow files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'workflow-files');

-- Policy for authenticated update
CREATE POLICY "Allow authenticated update to workflow files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'workflow-files');
```

## 📊 Step 5: Run Migration

### Option 1: API Migration (Recommended)

Use the migration API endpoint to migrate your data:

```bash
# Dry run (see what would be migrated)
curl -X POST http://localhost:3000/api/workflows/supabase-migrate \
  -H "Content-Type: application/json" \
  -d '{"action": "migrate", "options": {"dryRun": true}}'

# Actual migration
curl -X POST http://localhost:3000/api/workflows/supabase-migrate \
  -H "Content-Type: application/json" \
  -d '{"action": "migrate"}'

# Force migration (if workflows already exist)
curl -X POST http://localhost:3000/api/workflows/supabase-migrate \
  -H "Content-Type: application/json" \
  -d '{"action": "migrate", "options": {"force": true}}'

# Verify migration
curl -X POST http://localhost:3000/api/workflows/supabase-migrate \
  -H "Content-Type: application/json" \
  -d '{"action": "verify"}'
```

### Option 2: Programmatic Migration

```typescript
import { migrateWorkflowsToSupabase, verifyMigration } from '@/lib/supabase-migration';

// Run migration
const result = await migrateWorkflowsToSupabase({
  force: false,  // Set to true to migrate even if data exists
  dryRun: false  // Set to true for a test run
});

console.log(result);

// Verify migration
const verification = await verifyMigration();
console.log(verification);
```

## ✅ Step 6: Verification

After migration, verify everything works:

1. **Check your Supabase tables**: Browse the `workflows` table in your dashboard
2. **Test API endpoints**:
   - `GET /api/workflows` - Should return workflows from Supabase
   - `GET /api/workflows/stats` - Should show workflow statistics
3. **Check storage bucket**: Should contain workflow JSON files
4. **Test admin interface**: Should work with the new Supabase backend

## 🔄 Migration Details

### What Gets Migrated

The migration transfers:

- ✅ All workflow metadata (title, description, category, etc.)
- ✅ Workflow relationships (integrations, features, requirements, tags)
- ✅ n8n workflow data (stored as JSON files in cloud storage)
- ✅ Timestamps and status information
- ✅ Pricing and Stripe integration data

### Storage Architecture

- **Metadata**: Stored in Supabase PostgreSQL tables
- **Workflow JSON**: Stored in Supabase Storage as individual files
- **Relationships**: Normalized across multiple tables for better querying

### Performance Benefits

- ✅ **Faster queries**: Proper indexing and PostgreSQL performance
- ✅ **Scalability**: No file system limitations
- ✅ **Real-time capabilities**: Supabase real-time subscriptions
- ✅ **Better search**: Full-text search capabilities
- ✅ **Backup & Recovery**: Automatic Supabase backups

## 🔧 Configuration Files

### Key Files Created/Modified

- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/supabase-workflow-db.ts` - Database operations (replaces workflow-db.ts)
- `src/lib/storage.ts` - Cloud storage operations
- `src/lib/supabase-migration.ts` - Migration utilities
- `supabase-schema.sql` - Database schema
- `.env.local` - Environment variables

### API Routes Updated

All workflow API routes now use Supabase:
- `/api/workflows` - Main workflows endpoint
- `/api/workflows/[id]` - Individual workflow operations
- `/api/workflows/stats` - Statistics
- `/api/workflows/import` - Bulk import
- `/api/workflows/*-sync` - n8n synchronization endpoints

## 🚨 Important Notes

1. **Environment Variables**: Ensure all Supabase credentials are properly set
2. **Database Schema**: Must be applied before migration
3. **Storage Bucket**: Must exist and be properly configured
4. **Backup**: Consider backing up your existing `data/workflows.json` before migration
5. **Testing**: Test in development environment first

## 🐛 Troubleshooting

### Common Issues

**Migration fails with connection error**:
- Check environment variables
- Verify Supabase project is active
- Check network connectivity

**Storage upload fails**:
- Verify bucket exists and is public
- Check storage policies
- Ensure service role key has proper permissions

**Data not appearing**:
- Check RLS policies are disabled or properly configured
- Verify migration completed successfully
- Check Supabase logs for errors

### Support

For issues:
1. Check Supabase logs in dashboard
2. Check browser console for client-side errors
3. Check server logs for API errors
4. Use the migration verification endpoint to check data integrity

## 🎯 Next Steps

After successful migration:

1. **Monitor performance** in production
2. **Set up monitoring** with Supabase analytics
3. **Configure backups** schedule if needed
4. **Update documentation** for your team
5. **Consider implementing real-time features** using Supabase subscriptions

You're now ready to use Supabase as your workflow database with cloud storage! 🚀