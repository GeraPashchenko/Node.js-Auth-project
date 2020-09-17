# Project for product announcements

## Time to start
 - you need to download and install the last instances of node.js and docker before we start
 
***
 ### Step by step:
 - yarn install || npm install
 - yarn docker:start || npm run docker:start
 - yarn migrate:start || npm run migrate:start
 - yarn start || npm run start
 
### To close project
 - ctrl+ C
 - yarn migrate:down || npm run migrate:down
 - yarn docker:stop || npm run docker:stop
 
 
### To see the db 
- go to http://localhost:8183
- enter below params:
    * Server: `mysql_server`
    * User: `root`
    * Password: `pass`
- choose the `announcements` table

### All project routs
 - http://localhost:3080/api-docs/