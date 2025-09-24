# n8n Integration Documentation

This project now supports automatic workflow synchronization from n8n via webhooks.

## Overview

The system can automatically sync workflows from your n8n instance to your marketplace database. When you create or update workflows in n8n, they will be automatically synchronized to your application.

## Setup Instructions

### 1. Environment Configuration

Set the following environment variable for security:

```env
N8N_WEBHOOK_API_KEY=your-secret-api-key-here
```

### 2. n8n Webhook Configuration

Create a workflow in n8n that:

1. **Triggers**: Use a trigger that fires when workflows are created/updated (e.g., using n8n's internal APIs)
2. **HTTP Request Node**: Configure an HTTP Request node with:
   - **URL**: `https://your-domain.com/api/workflows/n8n-sync`
   - **Method**: POST
   - **Headers**: 
     - `Content-Type`: `application/json`
     - `x-api-key`: `your-secret-api-key-here`
   - **Body**: JSON payload with workflow data (see format below)

### 3. Payload Format

Your n8n workflow should send data in this format:

```json
{
  "workflows": [
    {
      "id": "unique-n8n-workflow-id",
      "name": "Workflow Name",
      "active": true,
      "nodes": [...],
      "connections": {...},
      "marketplaceData": {
        "category": "Communication",
        "description": "Workflow description",
        "longDescription": "Detailed description...",
        "difficulty": "Beginner|Intermediate|Advanced",
        "time": "15 min",
        "price": 10,
        "integrations": ["Gmail", "Slack"],
        "features": ["Feature 1", "Feature 2"],
        "requirements": ["Requirement 1"],
        "videoUrl": "https://example.com/video",
        "mermaidChart": "flowchart TD..."
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