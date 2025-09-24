# n8n Integration - SeventeenLabs_Workflow Tag

This document explains how to integrate n8n workflows with your SeventeenLabs marketplace using the "SeventeenLabs_Workflow" tag.

## Overview

The SeventeenLabs marketplace can automatically sync workflows from your n8n instance that are tagged with "SeventeenLabs_Workflow". This approach provides better organization and control over which workflows are synchronized.

## Prerequisites

1. **Running n8n Instance**: You need a running n8n instance (local or cloud)
2. **API Access**: n8n API must be enabled
3. **API Key**: Generate an API key in n8n
4. **Tagged Workflows**: Workflows must be tagged with "SeventeenLabs_Workflow"

## Setup Instructions

### Step 1: Configure Environment Variables

Add these environment variables to your `.env.local` file:

```env
# n8n API Configuration
N8N_API_BASE_URL=http://your-n8n-instance:5678
N8N_API_KEY=your-n8n-api-key

# Admin Authentication (for sync operations)
N8N_WEBHOOK_API_KEY=your-secret-admin-key
```

### Step 2: Generate n8n API Key

1. Open your n8n instance
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Copy the generated key and use it as `N8N_API_KEY`

### Step 3: Tag Your Workflows

For each workflow you want to sync to the marketplace:

1. Open the workflow in n8n editor
2. Click on the workflow name (top area)
3. In the workflow settings panel:
   - Find the **Tags** section
   - Add tag: `SeventeenLabs_Workflow`
   - Save the workflow

### Step 4: Test the Integration

Use the test script to verify the connection:

```bash
# Set environment variables first
export N8N_API_BASE_URL="http://your-n8n-instance:5678"
export N8N_API_KEY="your-n8n-api-key"

# Run test script
node scripts/test-n8n-fetch.js
```

## API Endpoints

### GET /api/workflows/fetch-n8n

Fetches and displays all workflows tagged with "SeventeenLabs_Workflow" from n8n.

**Response Example:**
```json
{
  "success": true,
  "connection": {
    "status": "connected",
    "totalWorkflowsInN8n": 25,
    "seventeenLabsWorkflowsFound": 3
  },
  "workflows": [
    {
      "id": "workflow-id-123",
      "name": "Lead Processing Automation",
      "active": true,
      "nodeCount": 8,
      "integrations": ["Gmail", "Slack", "Airtable"],
      "tags": ["SeventeenLabs_Workflow"],
      "existsInDatabase": false
    }
  ],
  "summary": {
    "total": 3,
    "alreadyInDatabase": 1,
    "needsSync": 2,
    "activeWorkflows": 3,
    "inactiveWorkflows": 0
  }
}
```

### POST /api/workflows/fetch-n8n

Syncs tagged workflows from n8n to the marketplace database.

**Headers:**
- `x-api-key: your-secret-admin-key`

**Response Example:**
```json
{
  "success": true,
  "message": "Processed 3 SeventeenLabs workflows",
  "results": {
    "processed": 3,
    "created": 2,
    "updated": 1,
    "skipped": 0,
    "errors": []
  }
}
```

## Admin Interface

Access the admin panel at `/admin/workflows` to:

1. **Preview Tagged Workflows**: See which workflows will be synced
2. **Fetch Tagged Workflows**: Sync workflows to the database
3. **Test Connection**: Verify n8n API connectivity

### Admin Panel Features

- **Connection Status**: Shows if n8n is accessible
- **Workflow Count**: Displays total tagged workflows found
- **Sync Statistics**: Shows last sync time and results
- **One-Click Sync**: Button to sync all tagged workflows

## Workflow Processing

When a workflow is synced from n8n:

1. **Automatic Integration Detection**: Extracts services from workflow nodes
2. **Metadata Preservation**: Keeps any existing marketplace data
3. **Default Values**: Sets sensible defaults for missing fields
4. **Conflict Resolution**: Updates existing workflows or creates new ones

### Default Workflow Properties

```javascript
{
  category: 'Automation',
  difficulty: 'Intermediate',
  time: '30 min',
  price: 0,
  isFree: true,
  users: 0,
  rating: 0,
  author: 'SeventeenLabs',
  version: '1.0'
}
```

## Troubleshooting

### Common Issues

1. **Connection Failed (401 Unauthorized)**
   - Verify `N8N_API_KEY` is correct
   - Check API key hasn't expired
   - Ensure API access is enabled in n8n

2. **No Workflows Found**
   - Verify workflows are tagged with "SeventeenLabs_Workflow" (case-sensitive)
   - Check workflows are saved after tagging
   - Confirm n8n instance is accessible

3. **Network Issues**
   - Verify `N8N_API_BASE_URL` is correct
   - Check firewall/network connectivity
   - Test URL in browser: `http://your-n8n-instance:5678`

### Debug Commands

```bash
# Test n8n connectivity
curl -H "X-N8N-API-KEY: your-api-key" \
     http://your-n8n-instance:5678/api/v1/workflows

# Preview tagged workflows (browser)
http://localhost:3000/api/workflows/fetch-n8n

# Test marketplace API
curl -H "x-api-key: your-secret-key" \
     -X POST \
     http://localhost:3000/api/workflows/fetch-n8n
```

## Tag Management Best Practices

1. **Consistent Tagging**: Always use exactly "SeventeenLabs_Workflow"
2. **Version Control**: Consider adding version tags (v1.0, v1.1)
3. **Category Tags**: Add category tags for better organization
4. **Status Tags**: Use tags like "draft", "ready", "published"

### Example Tagging Strategy

```
Workflow: "CRM Lead Processing"
Tags: 
- SeventeenLabs_Workflow  (required for sync)
- Sales                   (category)
- v1.0                   (version)
- ready                  (status)
```

## Security Considerations

1. **API Keys**: Store API keys securely in environment variables
2. **Network Access**: Restrict n8n API access to trusted sources
3. **Admin Authentication**: Use strong admin API keys
4. **HTTPS**: Use HTTPS in production for all API calls

## Monitoring and Maintenance

1. **Regular Sync**: Sync workflows regularly to keep marketplace updated
2. **Health Checks**: Monitor n8n connectivity
3. **Error Tracking**: Check sync logs for failed operations
4. **Tag Audit**: Periodically review tagged workflows

The system provides comprehensive logging and error reporting to help maintain a smooth integration between n8n and your marketplace.