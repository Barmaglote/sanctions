const winston = require('winston');
const { SeqTransport } = require('@datalust/winston-seq');

const logger = winston.createLogger({
    level: 'info',  
    format: winston.format.combine( 
        winston.format.errors({ stack: true }),
        winston.format.json(),    
    ),
    defaultMeta: { application: 'webapi' },
    transports: [
      new winston.transports.Console({
          format: winston.format.simple(),        
      }),
      new SeqTransport({
        serverUrl: process.env.SEQ_LOG_ADDR,
        apiKey: process.env.SEQ_LOG_KEY,
        onError: (e => { console.error(e) }),
        handleExceptions: true,
        handleRejections: true,
      })
    ]
    });

module.exports = logger;