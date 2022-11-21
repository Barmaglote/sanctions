import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

process.env

const logger = winston.createLogger({
    level: 'info',  
    format: winston.format.combine( 
        winston.format.errors({ stack: true }),
        winston.format.json(),    
    ),
    defaultMeta: { application: 'loginapi' },
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

export default logger;