#!/usr/bin/env bash
# yarn workspace @storyteller/web tsx src/database/migrate.ts
dotenvx run --env-file=web/.env.local -- sqlite3 ${STORYTELLER_DATA_DIR}/storyteller.db .schema > schema.sql

yarn prettier --write schema.sql

git add schema.sql
