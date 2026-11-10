# CLAUDE.md

## Working preferences

- Always use Modern Web Guidance for all HTML, CSS and client-side JS work in this project. It is installed as the `modern-web-guidance` skill (`.agents/skills/modern-web-guidance`, symlinked into `.claude/skills/`). Search and retrieve the relevant guides before writing code.

## Environment

- Use the Node version in `.nvmrc` (v24.14.0). The shell defaults to Node 16, which can't run `npx modern-web-guidance` (it fails with `ERR_UNKNOWN_BUILTIN_MODULE`). Prefix commands with `export PATH="$HOME/.nvm/versions/node/v24.14.0/bin:$PATH"` or run `nvm use` first.
