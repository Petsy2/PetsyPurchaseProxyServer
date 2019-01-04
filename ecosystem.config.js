module.exports = {
  apps: [{
    name: 'Purchase-Server',
    script: './app/app.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-17-59-254.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/PetsyPurchaseBackEnd.pem',
      ref: 'origin/master',
      repo: 'https://github.com/austinStotts/Purchase-Server.git',
      path: '/home/ubuntu/Purchase-Server',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
// get deploy key from server ssh
// add to get hub
// run pm2 setup locally
// ext...