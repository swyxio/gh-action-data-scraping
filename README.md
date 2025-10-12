# gh-action-data-scraping

this repo shows how to use github actions to do automated data scraping, with storage in git itself! **free git storage and scheduled updates!!!**

## 2021 Update

You can read more in the [Blog Writeup](https://www.swyx.io/github-scraping/). 

As of May 2021, [Flat Data scraping](https://octo.github.com/projects/flat-data) is officially supported by GitHub, check them out.

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
## How it should look

For people new to GH actions, this is how my Actions tab of this very repo looks if you need a reference point:


![image](https://user-images.githubusercontent.com/6764957/72847135-efc62c80-3c6f-11ea-88d8-2a2545a292e7.png)



## Limits

You can do whatever you like with this, including taking screenshots of sites!

The limits I can think of are the limits of GitHub and GitHub Actions:

- The max frequency of cronjobs on GitHub actions is every 5 minutes. For more frequent scraping, you will have to turn elsewhere.
- GitHub has a [soft storage limit of 1GB](https://www.quora.com/What-is-the-max-storage-limit-per-repository-in-GitHub)
  - You can [work around this with Git LFS](https://twitter.com/mikeal/status/1219739811159801856) if you have to!
- Actions are free for public repos. For private repos each GitHub account receives a certain amount of free minutes and storage.
  - [You get 2,000 minutes/month and 500MB storage on "Free" plan](https://github.com/pricing#compare-features)


In addition to these limits, GitHub Actions should not be used for:

- Content or activity that is illegal or otherwise prohibited by their Terms of Service or Community Guidelines.
- Cryptomining
- Serverless computing
- Activity that compromises GitHub users or GitHub services.
- Any other activity unrelated to the production, testing, deployment, or publication of the software project associated with the repository where GitHub Actions are used. In other words, be cool, don’t use GitHub Actions in ways you know you shouldn’t. 

Be a good citizen, **don't abuse it and F this up for the rest of us**!


## This is heavily based on

- https://github.com/mikeal/daily/blob/master/.github/workflows/daily.yml
