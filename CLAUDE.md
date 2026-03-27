[jcodemunch-mcp]

## MANDATORY: jCodeMunch MCP — Token-Efficient Code Retrieval

jCodeMunch is installed and MUST be used before any coding work begins. It uses tree-sitter parsing to enable precise symbol-level lookups (functions, classes, methods, constants) instead of reading entire files, cutting code-reading token usage by up to 95%.

### REQUIRED — Before Any Coding Task:
1. Use `jcodemunch` tools to index and look up relevant symbols/files before opening any file
2. Prefer `search_symbols`, `get_symbol`, or `search_files` over reading full files with the Read tool
3. Only fall back to Read/Grep when jcodemunch cannot locate what you need

### REQUIRED — After Each Session:
Report the estimated tokens saved using jCodeMunch by outputting:
```
=== jCodeMunch Token Savings Report ===
Files looked up via symbol search (not full reads): <count>
Estimated tokens saved: <estimate based on ~95% reduction per file avoided>
=======================================
```

### How to Use jCodeMunch Tools:
- Index the project first: use `mcp__jcodemunch__index_codebase` or equivalent
- Search for symbols: functions, classes, methods by name
- Retrieve only the relevant symbol, not the whole file
- This is MANDATORY — not optional

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
