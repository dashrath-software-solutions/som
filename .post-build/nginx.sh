#!/bin/bash

cd ..
sudo cp .nginx/site /etc/nginx/sites-available/default
sudo cp .nginx/proxy_params /etc/nginx/proxy_params
sudo /etc/init.d/nginx restart
