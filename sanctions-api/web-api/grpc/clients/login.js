import { fileURLToPath } from 'url';
import { dirname } from 'path';
import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROTO_PATH = __dirname + '/LoginService.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const credentials = grpc.credentials.createSsl(
    fs.readFileSync(__dirname + '/certs/login/ca.crt')
);

let loginProto = grpc.loadPackageDefinition(packageDefinition).login;
const loginClient = new loginProto.LoginService('0.0.0.0:50051', credentials /*grpc.credentials.createInsecure()*/);
 
export default loginClient;
