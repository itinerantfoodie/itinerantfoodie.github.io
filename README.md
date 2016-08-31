# Itinerant Foodie V2
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

## Deploying
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
aws --profile=perceptionz s3 sync ./_site s3://v2.itinerantfoodie.com --region us-east-1 --exclude '.DS_Store' --exclude 'node_modules/*' --exclude '.git/*' --exclude '.gitignore' --exclude 'Gemfile.*' --exclude '*.md' --acl public-read
```
