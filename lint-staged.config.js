/** @type {import('lint-staged').Config} */
const config = {
  "*.{js,jsx,ts,tsx}": "yarn eslint --cache --fix",
  "*.{js,jsx,ts,tsx,json}": ["yarn prettier --write", () => "yarn check:types"],
  "!(epub/*).{md,yaml,yml,json}": "yarn prettier --write",
  "migrations/*.sql": "./scripts/dump-schema.sh",
  "epub/*": () => ["yarn workspace @smoores/epub readme", "yarn fix:format"],
}

export default config
