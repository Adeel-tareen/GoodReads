#!user/bin/env sh

set -en

npm run build

cd dist

rit init
git add -A
git commit -m 'new deployment'
git push -f https://github.com/Adeel-tareen/GoodReads.git master:gh-pages

cd -
