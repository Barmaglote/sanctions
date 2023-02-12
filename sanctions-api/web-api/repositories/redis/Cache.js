import { Entity, Schema } from 'redis-om';
import client from "./client.js";

class LoginRequestsCache extends Entity {}

export const loginRequestsCacheSchema = new Schema( LoginRequestsCache, {
  key: { type: 'string' },
  category: { type: 'string' },
  value: { type: 'string' }
});

export const LoginRequestsCacheRepository = client.fetchRepository(loginRequestsCacheSchema);

try {
  await LoginRequestsCacheRepository.createIndex();
} catch (error) {
  console.log(error);
}
