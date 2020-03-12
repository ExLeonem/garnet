

# Garbage Netowrk (Garnet)
For the initial setup we used [Rust-Web-Start](#https://github.com/ghotiphud/rust-web-starter). 

Additional Changes we made:
- React-Frontend without TypeScript
- Switch from Postgres to MySQL
- Setup Graphhopper for routing


## Inhaltsverzeichnis

1. [Setup](#Setup)
2. [Architecture](#Architecture)
3. [Frontend](./frontend/README.md)
4. [API](./api_server/README.md)
5. [Issues](#Issues)


## Setup


### Linux

Make sure that NPM/Node is installed. We used for the frontend setup.
Following version of Node/NPM were used.

```
NPM-version: 6.13.7
Node-version: 13.0.0
```

1. Install NPM modules of the frontend. (Reason is the current dockerfile doesen't seem to install the packages correctly)
    - cd into the frontend folder `./frontend`
    - execute `npm install`
2. Spin up the Docker containers, if everything went right:
    - MY-SQL: Port 3306
    - PhpMyAdmin is accessible by localhost:1234. User & Password = garnet
3. Migrate the database scheme. (follow the workflow of the rust-web-starter)






### Win 10 Home

Benötigt wird Docker Toolbox, npm, mysql
Docker muss gestartet werden
Umgebungsariable setzten: MYSQLCLIENT_LIB_DIR = C:\Program Files\MySQL\MySQL Connector C 6.1\lib\vs14
docker-compose up im Projekt-Verzeichnis
Nachdem die Container laufen (docker ps -a)
docker exec [Container ID des Servers] diesel migration run
IP des Docker-Containers mit: docker-machine ip (normalerweise 192.168.99.100)
Über DockerIP:3000 kann über auf das Frontend zugegriffen werden
Über DockerIP:3001 kann über bspw. Postman das Backend manipuliert werden
Über DockerIP:1234 PhpMyAdmin

## Architecture


## Frontend



## API



## Issues

Issues are only occuring in Windows Environments, in Linux everything works fine.

Current Issues:

- exec "diesel" not found. Currently no applicable solution. (Win10 Pro)
