export const getTemporalConfig = () => {
  const environment = process.env.NODE_ENV || 'development';

  const config = {
    development: {
      address: 'localhost:7233',
      // No TLS needed for local development
    },
    production: {
      address: process.env.TEMPORAL_SERVER_URL,
      tls: process.env.TEMPORAL_TLS_ENABLED === 'true' ? {
        clientCertPair: {
          crt: process.env.TEMPORAL_CLIENT_CERT,
          key: process.env.TEMPORAL_CLIENT_KEY,
        },
      } : undefined,
      namespace: process.env.TEMPORAL_NAMESPACE,
    },
  };

  return config[environment];
};