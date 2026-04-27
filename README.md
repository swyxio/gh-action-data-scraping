# gh-action-data-scraping

[![GitHub stars](https://img.shields.io/github/stars/swyxio/gh-action-data-scraping?style=flat-square)](https://github.com/swyxio/gh-action-data-scraping/stargazers)
[![License: MIT](https://img.shields.io/github/license/swyxio/gh-action-data-scraping?style=flat-square)](https://github.com/swyxio/gh-action-data-scraping/blob/master/LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/swyxio/gh-action-data-scraping?style=flat-square)](https://github.com/swyxio/gh-action-data-scraping/commits/master)

A minimal example of using GitHub Actions to run scheduled scraping jobs and commit the resulting data back into the repository.

## Table of Contents

- [Why this repo exists](#why-this-repo-exists)
- [How it works](#how-it-works)
- [Quick start](#quick-start)
- [Workflow example](#workflow-example)
- [What the example generates](#what-the-example-generates)
- [Limits and caveats](#limits-and-caveats)
- [Further reading](#further-reading)

## Why this repo exists

This project shows a simple pattern for periodic data collection with GitHub Actions:

1. run on a cron schedule
2. execute a scraper script
3. save the output into the repo
4. commit the refreshed data automatically

It is a good fit for lightweight public datasets, status snapshots, leaderboards, or other scrape-and-publish workflows.

## How it works

- GitHub Actions starts the workflow on a schedule.
- The workflow checks out the repository.
- `npm install` prepares dependencies.
- `npm run action` runs `action.js`.
- The workflow commits updated files back to GitHub.

## Quick start

### Prerequisites

- Node.js
- npm
- A GitHub repository with Actions enabled

### Install dependencies

```bash
npm install
```

### Run the example locally

```bash
npm run action
```

Generated JSON files are written into the `data/` directory.

## Workflow example

```yaml
on:
  schedule:
    - cron: '0 8 * * *'
name: Pull Data and Build
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Install dependencies
        run: npm install
      - name: Scrape
        run: npm run action
      - uses: mikeal/publish-to-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## What the example generates

This repo stores dated JSON snapshots under `data/`, giving you a simple historical trail without needing a separate database.

## Limits and caveats

GitHub Actions is powerful, but it still has practical limits:

- cron frequency bottoms out at every 5 minutes
- public repositories are the cheapest place to run this pattern
- very large datasets can hit storage limits
- Actions should stay within GitHub's terms and intended use

Be a good citizen. Don't turn Actions into infrastructure it was never meant to be.

## Further reading

- Blog writeup: <https://www.swyx.io/github-scraping/>
- GitHub Flat Data: <https://octo.github.com/projects/flat-data>
- Reference workflow inspiration: <https://github.com/mikeal/daily/blob/master/.github/workflows/daily.yml>
