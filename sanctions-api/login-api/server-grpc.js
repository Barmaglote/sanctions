import { fileURLToPath } from 'url';
import { dirname } from 'path';
import logger from './helpers/logger.js'
import User from './models/users/model.js'
import { connectDB } from './models/db.js'
import dotenv from 'dotenv'

dotenv.config('')

logger.info('Starting LoginAPI gRPC-Server')
connectDB(process.env.MONGO_URI)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var PROTO_PATH = __dirname + '/grpc/LoginService.proto';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
	
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition).login;
var loginService = protoDescriptor.LoginService;

const getUser = async (call, callback) => {

  const login = call.request.login

  console.log(login)
  const user = await User.findOne({ login }).exec()

  callback(null, user);
}

const getGrpcServer = () => {
  const grpcServer = new grpc.Server();

  grpcServer.addService(loginService.service, {
    GetUser: getUser
  })

  return grpcServer
}

const main = () => {
  var server = getGrpcServer()

  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    logger.info('Starting LoginAPI gRPC-Server')
    if (err != null) {
      return logger.error(err);
    }
    server.start()
    logger.info(`gRPC listening on ${ port }`);
    logger.info('LoginAPI gRPC-Server has started')
  }); 
}

main();