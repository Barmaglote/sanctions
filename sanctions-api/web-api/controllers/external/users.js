import loginClient from '../../grpc/clients/login.js';
import { createLogger } from '../../helpers/logger.js';

const logger = createLogger(process.env.SEQ_LOG_ADDR, process.env.SEQ_LOG_KEY);

const getRPCDeadline = (rpcType) => {
    let timeAllowed = 5000

    switch(rpcType) {
        case 1:
            timeAllowed = 5000  // LIGHT RPC
            break
        case 2 :
            timeAllowed = 7000  // HEAVY RPC
            break
        default :
            console.log("Invalid RPC Type: Using Default Timeout")
    }
    
    return new Date(Date.now() + timeAllowed)
}


const getUserById = async (id) => {
    if (!id) {
        return null;
    }

    var user = new Promise((resolve, reject) => loginClient.GetUser({id}, {deadline: getRPCDeadline(2)}, (err, response) => {
        if(err) {
            logger.error(err);
            reject(err)
            return;
        }
        
        resolve(response)
      }))

    return await user;
}

export default getUserById;