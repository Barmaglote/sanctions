import { fileURLToPath } from 'url';
import { dirname } from 'path';
import grpc from 'grpc';
import protoLoader from '@grpc/proto-loader';

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


/*
// Create a simple in-memory cache for storing results
const cache = new Map();

// Create the interceptor function
const cacheInterceptor = (options, nextCall) => {
    const method = options.method_definition.path;
    const key = JSON.stringify(options.params);

    if (!key) return nextCall(options);

    console.log("-2-");

    // Check if the result for this method and argument is in the cache
    if (cache.has(method) && cache.get(method).has(key)) {
        // If it is, return the cached result
        console.log("-3-");
        return cache.get(method).get(key);
    }

    console.log("-4-");

    return new Promise((resolve, reject) => {
        nextCall(options, (err, response) => {
            console.log("-5-");

          if (err) {
            reject(err);
          } else {
            // Store the result in the cache for future reuse
            if (!cache.has(method)) {
              cache.set(method, new Map());
            }

            console.log(response)

            cache.get(method).set(key, response.value);
            resolve(response);
          }
        });  
    });
};
*/

let loginProto = grpc.loadPackageDefinition(packageDefinition).login;
//const loginClient = new loginProto.LoginService('0.0.0.0:50051', grpc.credentials.createInsecure(), { interceptors: [cacheInterceptor] });
const loginClient = new loginProto.LoginService('0.0.0.0:50051', grpc.credentials.createInsecure());
 
export default loginClient;
