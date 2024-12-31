# Makefile
# Usage:
#   make up      # Start all Docker services in each directory with compose.yml
#   make down    # Stop all Docker services in each directory with compose.yml

.PHONY: up down

up:
	@find . -type f -name "compose.yml" | while read -r FILE_PATH; do \
		DIR_PATH=$$(dirname "$$FILE_PATH"); \
		echo "==> compose.yml in: $$DIR_PATH"; \
		( \
			cd "$$DIR_PATH" && \
			docker compose up -d \
		); \
		echo "    Done."; \
		echo; \
	done

down:
	@find . -type f -name "compose.yml" | while read -r FILE_PATH; do \
		DIR_PATH=$$(dirname "$$FILE_PATH"); \
		echo "==> compose.yml in: $$DIR_PATH"; \
		( \
			cd "$$DIR_PATH" && \
			docker compose down \
		); \
		echo "    Done."; \
		echo; \
	done
