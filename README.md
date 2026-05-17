# gh-action-data-scraping

[![Stars](https://img.shields.io/github/stars/swyxio/gh-action-data-scraping?style=flat-square)](https://github.com/swyxio/gh-action-data-scraping/stargazers)
[![Last Commit](https://img.shields.io/github/last-commit/swyxio/gh-action-data-scraping?style=flat-square)](https://github.com/swyxio/gh-action-data-scraping/commits/master)
[![License](https://img.shields.io/github/license/swyxio/gh-action-data-scraping?style=flat-square)](./LICENSE)

A minimal example of scheduled data scraping with GitHub Actions, where scraped data is stored directly in the repository.

## Table of Contents
- [Overview](#overview)
- [How it works](#how-it-works)
- [Repository structure](#repository-structure)
- [Quick start](#quick-start)
- [Workflow example](#workflow-example)
- [Common use cases](#common-use-cases)
- [Limits](#limits)
- [Further reading](#further-reading)
- [License](#license)

## Overview
This project demonstrates a simple pattern for running a scraper on a schedule with GitHub Actions:
1. check out the repository,
2. install dependencies,
3. run a script that fetches data,
4. commit the generated files back to GitHub.

It is a good starting point for developers who want a lightweight, low-cost scraping workflow without provisioning extra infrastructure.

## How it works
- the GitHub Actions workflow in `.github/workflows/scrape.yml` runs on a cron schedule
- `npm run action` executes `action.js`
- `action.js` fetches sample data using `random-user`
- generated JSON files are written into the `data/` directory and committed back to the repo

## Repository structure
```text
.github/workflows/scrape.yml  Scheduled GitHub Actions workflow
action.js                     Scraping script entrypoint
data/                         Scraped output files
package.json                  Project metadata and scripts
```

## Quick start
### Prerequisites
- Node.js
- npm
- a GitHub repository with Actions enabled

### Installation
```bash
npm install
```

### Run locally
```bash
npm run action
```

The generated output will be written into the `data/` folder using a date-based filename.

### Enable the scheduled workflow
1. copy the workflow pattern from `.github/workflows/scrape.yml`
2. adjust the cron expression for your refresh interval
3. replace the scraping logic in `action.js` with your own data source
4. add any required secrets in your repository settings if your scraper uses authenticated APIs

## Workflow example
```yaml
on:
  schedule:
    - cron: '0 * * * *'
name: Scrape Data
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - run: npm install
      - run: npm run action
      - uses: mikeal/publish-to-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Common use cases
- scheduled API snapshots
- public dataset mirroring
- low-volume website scraping
- generating changelogs or feed archives on a timer

## Limits
- GitHub Actions cron runs at a minimum interval of every 5 minutes
- public repositories get free Actions minutes, but private repositories may incur costs
- repository storage can become a constraint for large datasets

## Further reading
- Blog writeup: https://www.swyx.io/github-scraping/
- GitHub Flat Data: https://octo.github.com/projects/flat-data
- Cron examples: https://crontab.guru/examples.html

## License
Released under the [MIT License](./LICENSE).
