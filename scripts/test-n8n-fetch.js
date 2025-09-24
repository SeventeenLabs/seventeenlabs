/**
 * Test script to fetch workflows from n8n API with SeventeenLabs_Workflow tag
 * 
 * Usage:
 * 1. Set your environment variables:
 *    - N8N_API_BASE_URL=http://your-n8n-instance:5678
 *    - N8N_API_KEY=your-n8n-api-key
 * 2. Run: node scripts/test-n8n-fetch.js
 */

const https = require('https');
const http = require('http');

// Configuration from environment variables
const N8N_API_BASE_URL = process.env.N8N_API_BASE_URL || 'http://localhost:5678';
const N8N_API_KEY = process.env.N8N_API_KEY || 'your-n8n-api-key';

function makeRequest(url, options = {}) {
  const urlObj = new URL(url);
  const isHttps = urlObj.protocol === 'https:';
  const client = isHttps ? https : http;
  
  const requestOptions = {
    hostname: urlObj.hostname,
    port: urlObj.port || (isHttps ? 443 : 80),
    path: urlObj.pathname + urlObj.search,
    method: options.method || 'GET',
    headers: {
      'X-N8N-API-KEY': N8N_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }
  };

  return new Promise((resolve, reject) => {
    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${result.message || data}`));
          }
        } catch (error) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data); // Return raw data if JSON parse fails but status is OK
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testN8nConnection() {
  console.log('🔗 Testing n8n API connection...');
  console.log(`   Base URL: ${N8N_API_BASE_URL}`);
  console.log(`   API Key: ${N8N_API_KEY.substring(0, 4)}...${N8N_API_KEY.substring(N8N_API_KEY.length - 4)}`);
  console.log('');

  try {
    // Test basic connection
    console.log('📡 Testing basic API connection...');
    const testUrl = `${N8N_API_BASE_URL}/api/v1/workflows`;
    const workflows = await makeRequest(testUrl);
    
    const workflowList = workflows.data || workflows;
    console.log(`✅ Connected successfully! Found ${workflowList.length} total workflows.`);
    console.log('');

    // Filter workflows by SeventeenLabs_Workflow tag
    console.log('🏷️  Filtering workflows by tag "SeventeenLabs_Workflow"...');
    const seventeenLabsWorkflows = workflowList.filter(workflow => {
      const tags = workflow.tags || [];
      return tags.some(tag => tag.name === 'SeventeenLabs_Workflow');
    });

    console.log(`📋 Found ${seventeenLabsWorkflows.length} workflows with "SeventeenLabs_Workflow" tag:`);
    console.log('');

    if (seventeenLabsWorkflows.length === 0) {
      console.log('⚠️  No workflows found with the "SeventeenLabs_Workflow" tag.');
      console.log('');
      console.log('💡 To tag workflows in n8n:');
      console.log('   1. Open the workflow in n8n');
      console.log('   2. Click on the workflow name/settings');
      console.log('   3. Add tag "SeventeenLabs_Workflow"');
      console.log('   4. Save the workflow');
      console.log('');
      console.log('📋 Available workflows:');
      workflowList.forEach((workflow, index) => {
        const tags = workflow.tags || [];
        const tagNames = tags.map(tag => tag.name).join(', ') || 'No tags';
        console.log(`   ${index + 1}. ${workflow.name} (ID: ${workflow.id}) - Tags: ${tagNames}`);
      });
    } else {
      seventeenLabsWorkflows.forEach((workflow, index) => {
        console.log(`   ${index + 1}. ${workflow.name}`);
        console.log(`      - ID: ${workflow.id}`);
        console.log(`      - Active: ${workflow.active ? '✅' : '❌'}`);
        console.log(`      - Nodes: ${workflow.nodes ? workflow.nodes.length : 0}`);
        
        const tags = workflow.tags || [];
        const tagNames = tags.map(tag => tag.name).join(', ');
        console.log(`      - Tags: ${tagNames}`);
        
        // Extract integrations from nodes
        const integrations = new Set();
        if (workflow.nodes) {
          workflow.nodes.forEach(node => {
            if (node.type && !node.type.includes('start') && !node.type.includes('noOp')) {
              const serviceName = node.type.split('.').pop();
              if (serviceName) {
                integrations.add(serviceName.charAt(0).toUpperCase() + serviceName.slice(1));
              }
            }
          });
        }
        console.log(`      - Integrations: ${Array.from(integrations).join(', ') || 'None detected'}`);
        console.log(`      - Created: ${workflow.createdAt ? new Date(workflow.createdAt).toLocaleDateString() : 'Unknown'}`);
        console.log(`      - Updated: ${workflow.updatedAt ? new Date(workflow.updatedAt).toLocaleDateString() : 'Unknown'}`);
        console.log('');
      });

      console.log('🎉 Success! These workflows can be synced to your marketplace.');
      console.log('');
      console.log('🔄 To sync these workflows:');
      console.log('   1. Visit your admin panel at /admin/workflows');
      console.log('   2. Click "Direct API Sync" button');
      console.log('   3. Or use the API: POST /api/workflows/enhanced-sync?method=api');
    }

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Verify N8N_API_BASE_URL is correct (e.g., http://localhost:5678)');
    console.log('   2. Verify N8N_API_KEY is valid (check n8n Settings → API Keys)');
    console.log('   3. Ensure n8n instance is running and accessible');
    console.log('   4. Check network connectivity');
  }
}

// Run the test
console.log('🚀 SeventeenLabs n8n Workflow Fetcher');
console.log('=====================================');
console.log('');

testN8nConnection().catch(error => {
  console.error('💥 Script failed:', error.message);
  process.exit(1);
});