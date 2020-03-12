

# Garbage Netowrk (Garnet)
For the initial setup we used [Rust-Web-Start](#https://github.com/ghotiphud/rust-web-starter). 

Additional Changes we made:
- React-Frontend without TypeScript
- Switch from Postgres to MySQL
- Setup Graphhopper for routing


## Inhaltsverzeichnis

1. [Setup][#Setup]
2. [Architecture](#Architecture)
3. [Frontend](./frontend/README.md)
4. [API](./api_server/README.md)
5. [Issues](#Issues)


## Setup


### Linux


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
