#!/usr/bin/env bash

MYSQL_USER="${MYSQL_USER:-root}"  
MYSQL_PASSWORD="${MYSQL_ROOT_PASSWORD:-password}"  

mysql --user="${MYSQL_USER}" --password="${MYSQL_PASSWORD}" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS testing;
    GRANT ALL PRIVILEGES ON \`testing%\`.* TO '${MYSQL_USER}'@'%';
EOSQL