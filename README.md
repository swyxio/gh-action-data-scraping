# gh-action-data-scraping
this shows how to use github actions to do automated data scraping

## Basic Idea

- You set a cron triggered github action
- it checks out your repo with https://github.com/actions/checkout
- `npm install`
- run your scrape script, write files to somewhere in your repo
- check it back in with https://github.com/mikeal/publish-to-github-action

The script looks like:

```yaml
# /.github/workflows/daily.yml
on:
  schedule:
    - cron:  '30 3 * * *'
name: Pull Data and Build
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Build
      run: npm install
    - name: Pull
      run: npm run action 
      env:
        GITHUB_TOKEN: ${{ secrets.GHTOKEN }}
    - uses: mikeal/publish-to-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

You will have to:

- get a GitHub Token via a GH App
- set secrets (environment variables) for your GitHub Action to use

## This is heavily based on

- https://github.com/mikeal/daily/blob/master/.github/workflows/daily.yml
