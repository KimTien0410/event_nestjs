FROM postgres
COPY 001_create-multiple-postgresql-databases.sh /docker-entrypoint-initdb.d/
RUN sed -i 's/\r$//' /docker-entrypoint-initdb.d/001_create-multiple-postgresql-databases.sh \
  && chmod +x /docker-entrypoint-initdb.d/001_create-multiple-postgresql-databases.sh