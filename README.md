# gh-action-data-scraping

this repo shows how to use github actions to do automated data scraping, with storage in git itself! **free git storage and scheduled updates!!!**

## Basic Idea

- You set a cron triggered github action ([cron examples](https://crontab.guru/examples.html) - max frequency every 5 mins)
- it checks out your repo with https://github.com/actions/checkout
- `npm install` and run your scrape script, write files to somewhere in your repo. This repo uses Node, but you can use whatever language you want
- check it back in with https://github.com/mikeal/publish-to-github-action

The script looks like:

```yaml
# /.github/workflows/daily.yml
on:
  schedule:
    - cron:  '0 8 * * *' # every day at 8am
name: Pull Data and Build
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: Build
      run: npm install
    - name: Scrape
      run: npm run action 
      # env:
      #   WHATEVER_TOKEN: ${{ secrets.YOU_WANT }}
    - uses: mikeal/publish-to-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # GitHub sets this for you
```

## This is heavily based on

- https://github.com/mikeal/daily/blob/master/.github/workflows/daily.yml
