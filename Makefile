SHELL := /bin/bash

export BASE := $(shell /bin/pwd)
export PATH := var:$(PATH):$(BASE)/node_modules/.bin


.DEFAULT_GOAL := install

NVM_DIR := $(if $(NVM_DIR),$(NVM_DIR),$(shell echo $$HOME)/.nvm)
UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Linux)
    SED_I := sed -E -i
endif
ifeq ($(UNAME_S),Darwin)
    SED_I := sed -E -i ""
endif

# local
# -----

.PHONY: install
install: var node_modules/.bin/yarn
	source "$(NVM_DIR)/nvm.sh"; nvm use --lts; \
		nvm exec --lts node_modules/.bin/yarn install


.PHONY: dev.run
dev.run: install
	source "$(NVM_DIR)/nvm.sh"; \
		nvm exec --lts node_modules/.bin/yarn run serve

.PHONY: test.unit
test.unit:
	source "$(NVM_DIR)/nvm.sh"; \
		nvm exec --lts node_modules/.bin/yarn unit

.PHONY: test.e2e
test.e2e:
	source "$(NVM_DIR)/nvm.sh"; \
		nvm exec --lts node_modules/.bin/yarn e2e

.PHONY: test
test: install test.unit test.e2e


dist:
	mkdir -p dist


# Clean
# -----

node_modules/.bin/yarn:
	@which yarn || ([ -e "$(BASE)/node_modules/.bin/yarn" ] ||\
		source "$(NVM_DIR)/nvm.sh"; \
			npm install --no-package-lock --no-save yarn@1.21.1 \
	)

node_modules/.bin/get-project-version: node_modules/.bin/yarn
	@which get-project-version || ([ -e "node_modules/.bin/get-project-version" ] ||\
		source "$(NVM_DIR)/nvm.sh"; \
			npm install --no-package-lock --no-save get-project-version \
	)

logs:
	mkdir -p "$(BASE)/logs"

var: logs
	mkdir -p "$(BASE)/var"

.PHONY: clean
clean:
	rm -rf yarn-error.log yarn.lock "$(BASE)/var/node_modules" "$(BASE)/dist" "$(BASE)/node_modules"

