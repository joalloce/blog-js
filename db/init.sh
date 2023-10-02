#!/usr/bin/env bash

# creates testing db
mysql --user=root --password="password" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS testing;
    GRANT ALL PRIVILEGES ON \`testing%\`.* TO 'root'@'%';
EOSQL
