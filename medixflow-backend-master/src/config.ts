module.exports = {
        base_url: process.env.BASE_URL || "http://localhost:8081",
        db: {
            uri: process.env.MONGODB_URI || "mongodb+srv://medixflow-app:MQeHt8k85eTve.s@medixflow-db-mgvqg.mongodb.net/test?retryWrites=true",
        },
        env: process.env.NODE_ENV || "development",
        name: "API",
        port: process.env.PORT || 8080,
        https: {
            pathToKeyFile: process.env.TLS_KEY || 'self-signed-dev-keys/tls.key',
            pathToCertFile: process.env.TLS_CERT ||  'self-signed-dev-keys/tls.crt',
        },
};
