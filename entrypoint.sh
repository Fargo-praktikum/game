#!/bin/bash

set -e

host="psql-container"
port="5432"
cmd="$@"

>&2 echo "!!!!!!!! Check psql-container for available !!!!!!!!"

until curl http://"$host":"$port"; do
  >&2 echo "psql-container is unavailable - sleeping"
  sleep 1
done

>&2 echo "psql-container is up - executing command"

exec $cmd
