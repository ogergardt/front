#!/bin/bash
ng serve --proxy-config proxySSL.conf.json --ssl 1 --ssl-key \"ssl/ssl.key\" --ssl-cert \"ssl/ssl.crt\" --host 0.0.0.0 --public-host https://ogergardt.me --port 8443 --prod --aot
