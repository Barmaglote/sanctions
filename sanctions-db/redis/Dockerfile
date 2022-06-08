FROM redislabs/rejson AS rejson
FROM redislabs/redisearch AS redisearch
FROM redis:7.0.0
COPY --from=rejson /usr/lib/redis/modules/rejson.so /usr/local/redis/module/
COPY --from=redisearch /usr/lib/redis/modules/redisearch.so /usr/local/redis/module/
COPY redis.conf /usr/local/etc/redis/redis.conf
EXPOSE 6379
CMD ["redis-server", "/usr/local/etc/redis/redis.conf", "--loadmodule", "/usr/local/redis/module/rejson.so", "--loadmodule", "/usr/local/redis/module/redisearch.so" ]

