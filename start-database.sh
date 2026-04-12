#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop or Podman Deskop
# - Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# - Podman Desktop - https://podman.io/getting-started/installation
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

# import env variables from .env.local or .env
set -a
if [ -f .env.local ]; then
  source .env.local
elif [ -f .env ]; then
  source .env
fi

DB_PASSWORD=$(echo "$POSTGRES_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$POSTGRES_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')
DB_NAME=$(echo "$POSTGRES_URL" | awk -F'/' '{print $4}')
DB_CONTAINER_NAME="$DB_NAME-postgres"

# Function to wait for PostgreSQL to be ready
wait_for_postgres() {
  local container_name=$1
  local max_attempts=30 # 30 seconds max wait
  local attempt=1
  local spinner=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')
  local spinner_idx=0

  echo -n "Waiting for PostgreSQL to be ready... "

  while [ $attempt -le $max_attempts ]; do
    if $DOCKER_CMD exec "$container_name" pg_isready -U postgres -d "$DB_NAME" >/dev/null 2>&1; then
      echo -e "\r✓ PostgreSQL is ready! (took ${attempt}s)                    "
      return 0
    fi

    # Show spinner
    echo -ne "\rWaiting for PostgreSQL to be ready... ${spinner[$spinner_idx]} (${attempt}s)"
    spinner_idx=$(((spinner_idx + 1) % ${#spinner[@]}))

    sleep 1
    attempt=$((attempt + 1))
  done

  echo -e "\n✗ ERROR: PostgreSQL failed to become ready after ${max_attempts} seconds"
  echo "Container logs:"
  $DOCKER_CMD logs "$container_name" --tail 50
  return 1
}

if ! [ -x "$(command -v docker)" ] && ! [ -x "$(command -v podman)" ]; then
  echo -e "Docker or Podman is not installed. Please install docker or podman and try again.\nDocker install guide: https://docs.docker.com/engine/install/\nPodman install guide: https://podman.io/getting-started/installation"
  exit 1
fi

# determine which docker command to use
if [ -x "$(command -v docker)" ]; then
  DOCKER_CMD="docker"
elif [ -x "$(command -v podman)" ]; then
  DOCKER_CMD="podman"
fi

if ! $DOCKER_CMD info >/dev/null 2>&1; then
  echo "$DOCKER_CMD daemon is not running. Please start $DOCKER_CMD and try again."
  exit 1
fi

# Check if container is already running
if [ "$($DOCKER_CMD ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  wait_for_postgres "$DB_CONTAINER_NAME" || exit 1
  exit 0
fi

# Check if container exists but is stopped
if [ "$($DOCKER_CMD ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  $DOCKER_CMD start "$DB_CONTAINER_NAME"
  wait_for_postgres "$DB_CONTAINER_NAME" || exit 1
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  exit 0
fi

# Only check port availability when creating a new container
if command -v nc >/dev/null 2>&1; then
  if nc -z localhost "$DB_PORT" 2>/dev/null; then
    echo "Port $DB_PORT is already in use."
    exit 1
  fi
else
  echo "Warning: Unable to check if port $DB_PORT is already in use (netcat not installed)"
  read -p "Do you want to continue anyway? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborting."
    exit 1
  fi
fi

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env.local file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i '' "s#:password@#:$DB_PASSWORD@#" .env.local
fi

$DOCKER_CMD run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="postgres" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p "$DB_PORT":5432 \
  docker.io/postgres

wait_for_postgres "$DB_CONTAINER_NAME" || exit 1
echo "Database container '$DB_CONTAINER_NAME' was successfully created"
