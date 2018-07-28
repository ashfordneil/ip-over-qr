#!/bin/bash

# run with care
# try not to think about how disgusting this is

# just in case
git checkout master

# clean up previous deployments
git branch -D gh-pages
git checkout -b gh-pages
# rm -rf ./dist

# perform the build
# yarn build

# remove the things we don't want to host
tar -c CNAME -C dist . > dist.tar
find . -d 1 -not -name "dist.tar" -not -name ".git" -print0 | xargs -0 rm -r

# decompress the things we were saving
tar -xf dist.tar
rm dist.tar

# and deploy
git add .
git commit -m "deploy"
git push -u origin gh-pages --force
