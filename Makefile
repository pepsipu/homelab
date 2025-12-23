# Makefile
# Usage:
#   make up
#   make down
#
#   make up DIR=minecraft
#   make down DIR=minecraft

.PHONY: up down

# Provide a DIR variable if you want to target a single matching directory
DIR ?=

define run_compose
	@ROOT_DIR=$$(find . -type d -iname "*$(DIR)*" -print -quit); \
	for f in $$(find "$$ROOT_DIR" -type f -name "compose.yml"); do \
		dir=$$(dirname "$$f"); \
		echo "==> compose.yml in: $$dir"; \
		( cd "$$dir" && docker compose $(1) ); \
	done
endef

up:
	$(call run_compose,up -d)

down:
	$(call run_compose,down)
