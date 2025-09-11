module.exports = {
  apps: [
    {
      name: 'scrapemaster-pro',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 8000,
      shutdown_with_message: true,
      node_args: '--max_old_space_size=2048'
    }
  ],
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-server.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-username/scrapemaster-pro.git',
      path: '/var/www/scrapemaster-pro',
      'pre-deploy-local': '',
      'post-deploy': 'pnpm install && pnpm run build --no-lint && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt-get install git'
    }
  }
}