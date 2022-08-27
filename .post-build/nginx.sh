#!/bin/bash

cd .nginx &&
    pwd &&
    ls -al &&
    sudo cp nginx.conf /etc/nginx/sites-available/default &&
    sudo cp proxy_params /etc/nginx/proxy_params &&
    sudo nginx -t &&
    sudo /etc/init.d/nginx restart &&
    sudo /etc/init.d/nginx status &&
    sudo corepack enable
