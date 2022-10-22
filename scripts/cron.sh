#!/bin/bash

set -euxo pipefail

date

yarn
node scripts/cron.js

git config user.email "jonathansamuel2k@gmail.com"
git config user.name "Jonathan Samuel"
git add data/
git commit -m "Auto update data for the website" || echo "Nothing to commit"
git push origin main