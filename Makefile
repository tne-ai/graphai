.PHONY: help install dev run clean

help: ## Show this help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies.
	yarn install

dev: ## Run a sample in dev mode.
	cd packages/samples/ && yarn run sample ./src/tools/home.ts

run: ## Run a sample.
	cd packages/samples/ && yarn run sample ./src/tools/home.ts

clean: ## Remove installed dependencies and temporary files.
	rm -rf node_modules
	rm -f agent_samples.txt
	rm -f test_prompt.yml
	rm -f get_agent_samples.sh