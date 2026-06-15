# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- Create an issue: `gh issue create --title "..." --body "..."`
- Read an issue: `gh issue view <number> --comments`
- List issues: `gh issue list --state open --json number,title,body,labels,comments`
- Comment on an issue: `gh issue comment <number> --body "..."`
- Apply or remove labels: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- Close: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v`; `gh` does this automatically inside the clone.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## PRDs before implementation issues

For broad product areas, create a PRD issue first. The PRD issue is a planning artifact for workflows, permissions, edge cases, MVP boundaries, test expectations, and open questions. Split implementation issues from the PRD only after the PRD has been reviewed and stabilized.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
