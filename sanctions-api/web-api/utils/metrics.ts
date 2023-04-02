import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import client from 'prom-client'

const metricsApp = express()

export const restResponseTimeHistogram = new client.Histogram({
    name: 'rest_response_time_duration_seconds',
    help: 'REST API response time in seconds',
    labelNames: ['method', 'route', 'status_code']
})
  
export const databaseResponseTimeHistogram = new client.Histogram({
    name: 'db_response_time_duration_seconds',
    help: 'Database response time in seconds',
    labelNames: ['operation', 'success']
})

export const restRequestsCounter = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'
  });
  
export const requestDurationHistogram = new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1, 2, 5, 6, 10]
  });

export function startMetricsServer() {
    const collectDefaultMetrics = client.collectDefaultMetrics;
    collectDefaultMetrics();

    metricsApp.get('/metrics', async(req, res) => {
        res.set('Content-Type', client.register.contentType)

        return res.send(await client.register.metrics());
    });

    metricsApp.listen(process.env.PROM_CLIENT_PORT, () => {
        console.log(`Metrics server started at localhost:${process.env.PROM_CLIENT_PORT}`)        
    });
}