#!/usr/bin/env bash
# Use this script to reset the local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop or Podman Deskop
# - Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# - Podman Desktop - https://podman.io/getting-started/installation
# 3. Open WSL - `wsl`
# 4. Run this script - `./reset-database.sh`

# On Linux and macOS you can run this script directly - `./reset-database.sh`

set -a
if [ -f .env.local ]; then
  source .env.local
elif [ -f .env ]; then
  source .env
fi

DB_NAME=$(echo "$POSTGRES_URL" | awk -F'/' '{print $4}')
DB_CONTAINER_NAME="$DB_NAME-postgres"

if ! [ -x "$(command -v docker)" ] && ! [ -x "$(command -v podman)" ]; then
  echo -e "Docker or Podman is not installed. Please install docker or podman and try again.\nDocker install guide: https://docs.docker.com/engine/install/\nPodman install guide: https://podman.io/getting-started/installation"
  exit 1
fi

if [ -x "$(command -v docker)" ]; then
  DOCKER_CMD="docker"
elif [ -x "$(command -v podman)" ]; then
  DOCKER_CMD="podman"
fi

if ! $DOCKER_CMD info >/dev/null 2>&1; then
  echo "$DOCKER_CMD daemon is not running. Please start $DOCKER_CMD and try again."
  exit 1
fi

if ! [ "$($DOCKER_CMD ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  echo "No database container found. Nothing to reset."
  exit 0
fi

if [ "$($DOCKER_CMD ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  $DOCKER_CMD stop "$DB_CONTAINER_NAME"
fi

$DOCKER_CMD rm -v "$DB_CONTAINER_NAME"
echo "Database container '$DB_CONTAINER_NAME' and its volume have been removed."
echo "Run ./start-database.sh to create a fresh database."
