#!/bin/bash
find node_modules -maxdepth 2 -mindepth 1 -type d -exec test -e {} \; -exec du -sk {} \; | sort -nr | awk -F' ' '{gsub("^node_modules/","",$2); print $2","$1}' > output.csv

