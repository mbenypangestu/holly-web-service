#!/bin/bash
rm -rf /home/mygetzu/AutoResto/auto-resto-webservice/nohup.out
git add .
git commit -m "Update"
ps aux | grep 'node /home/mygetzu/projects/holly/holly-web-service' | grep -v grep | awk '{print $2}' | xargs kill
nohup npm run start:nodemon &