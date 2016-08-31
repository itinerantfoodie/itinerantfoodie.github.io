task :default do
  sh "rm -fr _site"
  sh "bundle exec jekyll build"
  sh "aws s3 sync ./_site s3://itinerantfoodie.com --region ap-northeast-2 --exclude '.DS_Store' --exclude 'node_modules/*' --exclude '.git/*' --exclude '.gitignore' --exclude 'Gemfile' --exclude 'Rakefile' --exclude '*.md' --acl public-read"
end
