

# Garbage Netowrk (Garnet)
For the initial setup we used [Rust-Web-Start](#https://github.com/ghotiphud/rust-web-starter). 

Additional Changes we made:
- React-Frontend without TypeScript
- Switch from Postgres to MySQL
- OSRM-engine for routing


## Inhaltsverzeichnis

1. [Setup](#Setup)
2. [Architecture](#Architecture)
3. [Frontend](./frontend/README.md)
4. [API](./api_server/README.md)
5. [Issues](#Issues)


## Setup


### Linux
To setup the project localy follow these steps.

1. Setup the project. Execute `npm install` in `/frontend` For more information read [Frontend setup](#Frontend-setup)
2. Setup the Map data for routing. Check out [Map setup](#Map-setup) for more information.

After you've made the below setups you can simply spin up the containers. Afterwards you simply need to migrate the database include you'r bins.

To migrate the model execute (In general all commands to work with the api container are also listed in the [Rust-Web starter](https://github.com/ghotiphud/rust-web-starter) Readme):
`docker exec <container-name> diesel migration run`



### Frontend setup

Make sure that NPM/Node is installed. We used for the frontend setup.
Following version of Node/NPM were used.

```
NPM-version: 6.13.7
Node-version: 13.0.0
```

First of install NPM modules of the frontend. (Reason is the current dockerfile doesen't seem to install the packages correctly)

- cd into the frontend folder `./frontend`
- execute `npm install`


### Map setup

Download the needed data from [Geofabrik](#Geofabrik).

Example command: `wget http://download.geofabrik.de/europe/germany/<file-name>.osm.pbf`

Create a directory called `routing_data` in the project root and put the map file inside.

Run following commands in order to convert the `osm.pfg` file to a usable `osrm` file. 

1. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/<file-name>.osm.pbf`
2. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-partition /data/<file-name>.osrm`
3. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-customize /data/<file-name>.osrm`

After everything worked out you should be able to use the osrm api. For reference checkout the [osrm-backend](https://hub.docker.com/r/osrm/osrm-backend/) documentation.



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
