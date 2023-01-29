const config = require('./config');
module.exports = {
    apps : [
        {
            name: config.pm2Name,
            script: "src/run.js",
            autorestart: false,
            max_restarts: 1,
            restart_delay: 1000,
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            error_file: config.pm2Logs,
            out_file: config.pm2Logs,
            watch: true,
            ignore_watch : [
                "logs",
                "node_modules"
            ],
            watch_options: {
                "followSymlinks": false
            }
        }
    ]
};