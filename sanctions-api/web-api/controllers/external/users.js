import loginClient from '../../grpc/clients/login.js';

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

const getUserByLogin = async (login) => {
    var user = new Promise((resolve, reject) => loginClient.GetUser({login}, {params: login, deadline: getRPCDeadline(1)}, (err, response) => {
        if(err) {
          return reject(err)
        }
        resolve(response)        
      }))

    return await user;
}

export default getUserByLogin;