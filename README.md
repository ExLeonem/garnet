

# Garbage Network (Garnet)
A proof of concept for an intelligent waste-management-system. Trashcans sending the current fill state over LoRa to an api-server. The optimal route to collect the trashcans filled to a certain degree is calculated via a separate routing engine. The route and trashcans to empty are displayed in a react application.


![GarNet app showcase](./assets/images/garnet_showcase.gif)

## Built with
- [Rust-Web-Starter](https://github.com/ghotiphud/rust-web-starter)
- [Docker](https://www.docker.com/)
- [OSRM Routing Machine](https://github.com/Project-OSRM/osrm-backend)
- [MySQL](https://www.mysql.com/de/)

## Index

1. [About](#About)
    1. [Roadmap](#Roadmap)
    2. [Communication](#Communication)
    3. [Trashcan Prototype](#Trashcan-Prototype)
2. [Gettings Started](#Getting-Started)
    1. [Setup](#Setup)
    2. [Windows](#Windows)
3. [Frontend](./frontend/)
    1. [Visual Concept](https://www.figma.com/file/RKXHEMSCQr9gEqnpWOKq6cpQ/Teamprojekt?node-id=208%3A1450)
    2. [Project Structure](./frontend/README.md#Project-Structure)
    3. [Available Scripts](./frontend/README.md#Available-Scripts)
4. [Backend](./api_server/README.md)
    1. [Local Setup](./api_server/README.md#Setup)
    2. [Endpoints](./api_server/README.md#Endpoints)
    3. [Architecture](./api_server/README.md#Architecture)
5. [Known Issues](#Known-Issues)



## About

### Roadmap

- [ ] API/Backend
    - [x] Endpoint for retrieval of districts containing filled trashcans  
    - [x] Endpoint for retrieval of filled trashcans
    - [ ] TSP Calculation using airline distance
    - [ ] Path optimization using a Neural Network(?)
    - [ ] Maturity level 3 REST API
- [ ] Frontend
    - [x] Display district in which to collect 
    - [x] Display the a route to collect the filled trashcans 
- [ ] Prototype 
    - [x] Create 3D-Models
    - [x] Print&Assemble the model
    - [x] Read ultrasonic sensor values
    - [ ] Communicate with the [TTN](https://www.thethingsnetwork.org/) via LORA/SigFox
    - [ ] Send data from prototype to the backend


### Communication

<img src="./assets/images/connection_schema.png" alt="Communication schema" height="350px"/>



### Trashcan Prototype
| Component 
| ---
| Arduino MKR 1300 WAN/Lopy4
| Lora Antenna
| US-015 Ultrasonic sensor
| Li-on Battery
| Battery Adapter


## Getting Started

For the initial setup we used [Rust-Web-Start](#https://github.com/ghotiphud/rust-web-starter). 
Additional Changes we made:
- React-Frontend without TypeScript
- Switch from Postgres to MySQL
- OSRM-engine for routing

| Container functionality   | Port
| ---                       | ---
| React-Frontend            | 3000
| Rust-Backend              | 3001
| PhpMyAdmin                | 1234
| MySQL                     | 3306
| OSRM Backend              | 5000 

### Setup
To setup the project localy follow these steps.

1. Setup the project. Execute `npm install` in `/frontend` For more information read [Frontend setup](#Frontend-setup)
2. Setup the Map data for routing. Check out [Map setup](#Map-setup) for more information.
3. Migrate the Schema to the database.

After you've made the above setup you can simply spin up the containers. Afterwards you simply need to migrate the database include you'r bins.

To migrate the model execute (In general all commands to work with the api container are also listed in the [Rust-Web starter](https://github.com/ghotiphud/rust-web-starter) Readme):
`docker exec <container-name> diesel migration run`


#### Frontend setup

Make sure that NPM/Node is installed. We used for the frontend setup.
Following version of Node/NPM were used.

```
NPM-version: 6.13.7
Node-version: 13.0.0
```

First of install NPM modules of the frontend. (Reason is the current dockerfile doesen't seem to install the packages correctly)

- cd into the frontend folder `./frontend`
- execute `npm install`

#### Backend Setup
Start following containers: rocket_api, MySQL and phpmyadmin. Phpmyadmin should now be accessable at localhost:1234.
Login with following credentials:


| user | password
| ---   | ---
| garnet | garnet


You should see the created database for the application.
Now you need to migrate the current model, execute`docker exec <api_container_id> diesel migration run` on the rocket_api container. After successfull execution of the command you should be able to see the created database tables inside phpmyadmin.

In the last step you should add information about trashcan positions and optional allocation to trashcans.
As this project resembles a proof of concept for the town of constance a .csv file with bin positions is included which could be 

There's also the posibility to only run the mysql container and develop the backend separatly.
For that you need to change the mysql address to `mysql://garnet:garnet@127.0.0.1:3306/garnet_db` in the following files:

- `./api_server/Rocket.toml`
- `./api_server/.env`


#### Map setup

Download the needed data from [Geofabrik](#Geofabrik).

Example command: `wget http://download.geofabrik.de/europe/germany/<file-name>.osm.pbf`

Create a directory called `routing_data` in the project root and put the map file inside.

Run following commands in order to convert the `osm.pfg` file to a usable `osrm` file. 

1. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/<file-name>.osm.pbf`
2. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-partition /data/<file-name>.osrm`
3. `docker run -t -v "${PWD}/routing_data:/data" osrm/osrm-backend osrm-customize /data/<file-name>.osrm`

After everything worked out you should be able to use the osrm api. For reference checkout the [osrm-backend](https://hub.docker.com/r/osrm/osrm-backend/) documentation.



### Windows

If you are using windows as a host operating system you need to consider two things in addition to the above guide for the setup.

1. You need to set an environment variable for `MYSQLCLIENT_LIB_DIR = C:\Program Files\MySQL\MySQL Connector C 6.1\lib\vs14`, pointing to the mysql connector.  

2. To access the frontend and the containers you need to know which IP docker uses. You can check with ``docker-machine ip``. (usually 192.168.99.100)

You then are abel to access the running containers with `<docker-ip>:<container-port>`



## Known Issues

### Windows

- exec "diesel" not found. Currently no applicable solution. (Win10 Pro)
- Opening some specific script files on windows may cause docker-compose up to break (namely wait-for-it.sh) seemingly because of the character encoding.

### Docker

1. Docker can't create socket for given port.
- Check if the container was already created with `docker ps -a` and execute it manually with `docker start <container_id>`. Or try to run `docker-compose up -d` again.
- To prevent this issue of occuring you need to give docker more memory space.


### Rust

- linking with 'cc' failed while trying to run with `cargo run --bin crud`

May be caused on linux system and/or because of newer nightly versions. Check [here](https://github.com/rust-lang/rust/issues/25289).

Alternativly try to install the default mysql client on if not already installed. On ubuntu check available packages with `sudo apt-cache search mysqlclient` & install the default client with `sudo apt-get install default-libmysqlclient-dev`