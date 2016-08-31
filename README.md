# Itinerant Foodie V2
[![Build Status](https://travis-ci.org/nolim1t/itinerantfoodie.static.svg?branch=master)](https://travis-ci.org/nolim1t/itinerantfoodie.static)

## About
This is a modified fork of my tech blog.

## Creating a post
Refer to [this guide](http://jekyllrb.com/docs/posts/)

### language of posts
Markdown motherfucker.. do you not speak it?

## Creating pages
Just dump them in the main directory as per [guide](http://jekyllrb.com/docs/pages/)

# Test Often!
## Locally
Simple run the following command

```bash
bundle exec jekyll serve
```

## Deploying (reprecated)
Right now deployments are done simply by doing a git push to github (It's that easy).

### Step 1
```bash
rm -fr _site
bundle exec jekyll build
```

### Step 1.1 (Optional)

Remove past files
```bash
aws --profile=perceptionz s3 rm --recursive s3://v2.itinerantfoodie.com/
```

### Step 2
```bash
aws --profile=perceptionz s3 sync ./_site s3://itinerantfoodie.com --region ap-northeast-2 --exclude '.DS_Store' --exclude 'node_modules/*' --exclude '.git/*' --exclude '.gitignore' --exclude 'Gemfile.*' --exclude '*.md' --acl public-read
```

## Updating SSL certificate
SSL domains (this should all get added to the certificate)

* static.itinerantfoodie.com
* itinerantfoodie.com
* www.itinerantfoodie.com
* v2.itinerantfoodie.com


### Command to run
```bash
./certbot-auto certonly -a manual
```

### Updating Challenge
```bash
aws --profile=perceptionz s3 sync ./ssl-challenge s3://static.itinerantfoodie.com/.well-known/acme-challenge --region us-east-1 --acl public-read

# Run for each redirected hostname (because it seems to follow redirects to itinerantfoodie.com)
aws --profile=perceptionz s3 sync ./ssl-challenge s3://static.itinerantfoodie.com/.well-known/acme-challenge --region ap-northeast-2 --acl public-read
```

### Copying Server certificates and Updating AWS IAM
```bash
sudo cat /etc/letsencrypt/live/itinerantfoodie.com/cert.pem > /home/ubuntu/itinerantfoodie.com/cert.pem ; sudo cat /etc/letsencrypt/live/itinerantfoodie.com/privkey.pem > /home/ubuntu/itinerantfoodie.com/privkey.pem ;  sudo cat /etc/letsencrypt/live/itinerantfoodie.com/chain.pem > /home/ubuntu/itinerantfoodie.com/chain.pem ; sudo chown -R ubuntu /home/ubuntu/itinerantfoodie.com

aws iam upload-server-certificate --server-certificate-name itinerantfoodie`python -c "import datetime; import time; import math; print(math.floor(time.mktime(datetime.datetime.today().timetuple())))"` --certificate-body file:///home/ubuntu/itinerantfoodie.com/cert.pem --private-key file:///home/ubuntu/itinerantfoodie.com/privkey.pem --certificate-chain file:///home/ubuntu/itinerantfoodie.com/chain.pem --path /cloudfront/

```

Then note the server certificate
