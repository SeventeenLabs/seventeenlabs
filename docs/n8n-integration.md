# n8n Integration Documentation (SeventeenLabs Folder)

This project supports **two methods** for syncing workflows from the **SeventeenLabs folder** in your n8n instance: **Direct API Integration** and **Webhook-based Sync**.

## 🎯 **Folder-based Filtering**

The integration is configured to **only sync workflows from the "SeventeenLabs" folder** in your n8n instance. This ensures:
- ✅ **Clean separation**: Only marketplace-ready workflows are synced
- ✅ **Organization**: Keep personal/test workflows separate
- ✅ **Control**: Decide which workflows to publish
- ✅ **Security**: Prevent accidental sync of sensitive workflows

## Organizing Workflows in n8n

### Method 1: Using Tags (Recommended)
1. In n8n, edit your workflow
2. Go to workflow settings
3. Add a tag named **"SeventeenLabs"**
4. Save the workflow

### Method 2: Workflow Naming Convention
Include "SeventeenLabs" in your workflow name:
- ✅ `SeventeenLabs - Email to Slack`
- ✅ `Customer Data Sync (SeventeenLabs)`
- ❌ `Personal Email Automation` (will be ignored)

## 🎯 **Recommendation: Direct API Integration**

For most use cases, **Direct API Integration** is recommended because it's:
- ✅ **Simpler to set up**: Just environment variables, no webhook configuration
- ✅ **More reliable**: Direct connection, no webhook delivery issues  
- ✅ **On-demand**: Sync anytime via admin interface
- ✅ **Complete data**: Gets all workflow data directly from n8n

## Method 1: Direct API Integration (Recommended)

### Setup Instructions

1. **Environment Configuration**:
```env
N8N_API_BASE_URL=http://your-n8n-instance:5678
N8N_API_KEY=your-n8n-api-key
N8N_WEBHOOK_API_KEY=your-secret-api-key  # For admin authentication
```

2. **Get n8n API Key**:
   - In n8n, go to Settings → API Keys
   - Generate a new API key
   - Use this key in `N8N_API_KEY`

3. **Sync Workflows**:
   - Visit `/admin/workflows`
   - Click "Direct API Sync" button
   - All workflows will be synced immediately

### Features
- **Real-time sync**: Get latest workflow data instantly
- **Preserve marketplace data**: Keeps pricing, categories, descriptions
- **Automatic integration detection**: Extracts services from workflow nodes
- **Admin-friendly**: One-click sync from admin interface

### API Endpoints

#### POST /api/workflows/enhanced-sync?method=api
Direct sync from n8n API.

**Headers**: `x-api-key: your-secret-api-key`

**Response**:
```json
{
  "success": true,
  "method": "api",
  "results": {
    "processed": 5,
    "created": 2,
    "updated": 3,
    "errors": []
  }
}
```

#### GET /api/workflows/enhanced-sync
Health check and connection status.

**Response**:
```json
{
  "endpoint": "enhanced-sync",
  "n8nConnection": "connected",
  "workflowsAvailable": 15,
  "methods": ["api", "webhook"],
  "environment": {
    "n8nApiConfigured": true,
    "webhookKeyConfigured": true
  }
}
```

## Method 2: Webhook-based Sync (Advanced)

Use this method if you want n8n to automatically push updates to your marketplace.

### Setup Instructions

1. **Environment Configuration**:
```env
N8N_WEBHOOK_API_KEY=your-secret-api-key
```

2. **Create n8n Workflow**:
Create a workflow in n8n that monitors workflow changes and sends updates to your marketplace.

3. **HTTP Request Node Configuration**:
   - **URL**: `https://your-domain.com/api/workflows/n8n-sync`
   - **Method**: POST
   - **Headers**: `x-api-key: your-secret-api-key`
   - **Body**: Workflow data (see format below)

### Webhook Payload Format

```json
{
  "workflows": [
    {
      "id": "workflow-id",
      "name": "Workflow Name", 
      "active": true,
      "nodes": [...],
      "connections": {...},
      "marketplaceData": {
        "category": "Communication",
        "description": "Workflow description",
        "price": 10,
        "difficulty": "Intermediate",
        "integrations": ["Gmail", "Slack"]
      }
    }
  ],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Features

### Automatic Mapping
- **Integration Detection**: Automatically extracts integrations from n8n node types
- **Mermaid Generation**: Creates flow charts from n8n workflow structure
- **Price Logic**: Sets `isFree` based on price (0 = free)
- **Sync Tracking**: Records last sync timestamp for each workflow

### Admin Interface
- **Sync Status**: View n8n workflows count and last sync time
- **Visual Indicators**: n8n workflows are marked with a blue "n8n" badge
- **Webhook URL**: Easy access to webhook URL and authentication info
- **Sync Details**: Shows n8n ID and last sync time for each workflow

### Authentication
Supports two authentication methods:
- Header: `x-api-key: your-secret-api-key`
- Bearer Token: `Authorization: Bearer your-secret-api-key`

## API Endpoints

### POST /api/workflows/n8n-sync
Webhook endpoint for syncing workflows from n8n.

**Authentication**: Required (API key)
**Content-Type**: application/json

**Response**:
```json
{
  "success": true,
  "message": "Processed X workflows",
  "results": {
    "processed": 1,
    "created": 1,
    "updated": 0,
    "errors": []
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### GET /api/workflows/n8n-sync
Health check endpoint.

**Response**:
```json
{
  "endpoint": "n8n-sync",
  "status": "ready",
  "timestamp": "2024-01-01T12:00:00Z",
  "description": "Webhook endpoint for syncing workflows from n8n"
}
```

## Database Schema

New fields added to workflow database:

```typescript
interface WorkflowData {
  // ... existing fields
  n8nId?: string;           // n8n workflow ID
  n8nVersionId?: string;    // n8n version ID
  lastSyncAt?: string;      // Last sync timestamp
  n8nData?: {               // Raw n8n data
    nodes: any[];
    connections: any;
    settings?: any;
    staticData?: any;
    pinData?: any;
  };
}
```

## Testing

The integration has been thoroughly tested:

1. ✅ **Authentication**: Blocks unauthorized requests
2. ✅ **Create**: Successfully creates new workflows from n8n data
3. ✅ **Update**: Updates existing workflows when n8n ID matches
4. ✅ **Integration Mapping**: Automatically detects integrations from nodes
5. ✅ **Admin Interface**: Shows sync status and n8n workflow indicators

## Security

- API key authentication required
- Environment variable for secret management
- Input validation on all webhook data
- Error handling for malformed requests

## Workflow States

- **Manual Workflows**: Created through admin interface (no n8nId)
- **n8n Workflows**: Synced from n8n (has n8nId and lastSyncAt)
- **Hybrid**: Manual workflows can be converted to n8n workflows when first synced

The system maintains full backward compatibility with existing manual workflows while enabling seamless n8n integration.