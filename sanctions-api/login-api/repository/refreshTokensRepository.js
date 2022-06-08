import { Entity, Schema } from 'redis-om';
import client from "./redisClient.js";

class RefreshToken extends Entity {}

const refreshTokenSchema = new Schema(RefreshToken, {
  refreshToken: { type: 'string' },
  login: { type: 'string' }
});

export const refreshTokenRepository = client.fetchRepository(refreshTokenSchema);
try {
  await refreshTokenRepository.createIndex();
} catch (error) {
  console.log(error);
}
