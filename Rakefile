task :default do
  sh "rm -fr _site"
  sh "bundle exec jekyll build"
  sh "rm -fr _site/awscli-bundle.zip"
  sh "rm -fr _site/awscli-bundle"
  # Sync the Acme challenge
  sh "aws s3 sync ./ssl-challenge s3://static.itinerantfoodie.com/.well-known/acme-challenge --region us-east-1 --acl public-read"
  sh "rm -fr _site/ssl-challenge" # Remove that folder before we sync with the other site
  sh "aws s3 sync ./_site s3://itinerantfoodie.com --region ap-northeast-2 --exclude '.DS_Store' --exclude 'node_modules/*' --exclude '.git/*' --exclude '.gitignore' --exclude 'Gemfile*' --exclude 'Rakefile' --exclude 'ssl-challenge/*' --exclude 'awscli-bundle*' --exclude '*.md' --acl public-read"
end

task :serve do
  sh "rm -fr _site"
  sh "bundle exec jekyll serve"
end
