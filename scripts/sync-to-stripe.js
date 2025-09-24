// Quick sync script to create Stripe products for all workflows
// Run this script: node scripts/sync-to-stripe.js

const https = require('https');

const syncWorkflows = async () => {
  const data = JSON.stringify({
    action: 'sync-all'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/sync-workflows',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
};

const main = async () => {
  try {
    console.log('🚀 Starting workflow sync to Stripe...');
    const result = await syncWorkflows();
    
    console.log('✅ Sync completed!');
    console.log(`📊 Results: ${result.successful}/${result.total} workflows synced successfully`);
    
    if (result.failed > 0) {
      console.log('❌ Failed workflows:');
      result.results
        .filter(r => !r.success)
        .forEach(r => console.log(`   - ${r.title}: ${r.error}`));
    }
    
    console.log('💳 Payments should now work for synced workflows!');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    console.log('💡 Make sure your dev server is running on localhost:3000');
    console.log('💡 Also check that your Stripe keys are set in .env.local');
  }
};

main();