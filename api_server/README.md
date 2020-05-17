
# Index
1. [Setup](#Setup)
1. [API](#API)
2. [Architecture](#Architecture)
3. [Issues](#Issues)



# Setup


1. Pull the images from the docker-compose file with `docker-compose pull`
2. Run the docker database and phpmyadmin docker images with `docker-compose up -d db phpmyadmin`
3. Setup a rust nightly version locally
4. Install the diesel-cli locally with `cargo install diesel_cli --no-default-features --features mysql` (**\***If the installtion fails with cc-linkin error you need to install an mysql-client for Linux with `sudo apt-get install default-libmysqlclient-dev`)

To check if the backend is working simply compile it with `cargo run --bin crud`. If everything works accordingly the api_server should by running at port 3001 on localhost.

Finally you need to setup diesel and run the migration against the running database with:

1. `diesel setup`
2. `diesel migration run`

If everything worked out you should see the created database in phpmyadmin. You can access phpmyadmin on localhost:1234, the login credentials are given below.

| username | password
| ---   | ---
| garnet | garnet


**\*** The DB is at this point empty and needs to be filled first. Check the setup guide in the main [README](./../README.md#Map-setup).


# API

The endpoints can be reached under following base-url: `localhost:3001/api`. You can find documentation [here](https://exleonem.github.io/garnet/).
A summary for the available endpoints is displayed below.

| Endpoint              | Method    |  Description  
| ---                   | ---       |  ---          
| /bin          | GET       | Retrieve all trashcans known to the system 
| /bin          | POST      | Add a trashcan to the system 
| /bin/{id}          | PATCH      | Update the current fill state of trashcan 
| /bin/{id}     | GET       |  Get information on a specific trashcan
| /bin/{id}     | DELETE       |  Delete a existing trashcan
| /bin/type     | GET       |  Get the existing trashcan types
| /bin/type     | POST       |  Create a trashcan type
| /bin/type/{id}     | PATCH       |  Update a trashcan type
| /bin/type/{id}     | DELETE       |  Delete a trashcan type
| /district     | POST | Create a new district
| /district     | GET       | Retrieves all districts known to the system
| /district/{id} | PATCH  | Update an existing district
| /district/{id} | PATCH  | Update an existing district
| /district/{id}/bin | GET | Get all bins for a specific district


## Architecture

The following is a description of classes implemented in this API and Database-Schema.

### crud.rs

Entrypoint for this Application. Run the API with: "cargo run --bin crud"

### lib.rs
Defines the Rocket ignite() Function. All modules used in the API are listed here.
Besides the ignite() Function, the read_csv() Helper Function is defined here. It is used to fill the Database with Data for the Trashcans.

### routes.rs
Definies all routes that are callable from outside the API. 

### models.rs
Datastructures for Database Entities are defined in this class. Structs that are used to insert data are defined with the refix New_.

### db.rs
All Database calls that is used in the API (and more) are defined in this class.

### schema.rs
Is a automatically from Diesel generated schema file. It represents the Database-Schema.

### tsp.rs
Is a solver for an Tsp-Problem based on an Evolutionary Algorithm. Although currently only working with linear distance it can be easily modified to work with street distance.

### csv_reader.rs
Entrypoint to call the helper function read_csv(), which fills the Database based on a geolocation File.

## Database

In this Project we are using a MySql database. The following shows the implemented Database-Schema.

### District
Stores the garbage disposal district of a community. Every district has a unique ID and a district number.

### Trashtype
Stores the different types of trash (e.g. paper waste, glass container etc.).
id: Unique ID
trashtype_name: Name of the trashtype

### Trashcan
Stores the garbage bins of a community. The attributes are
id: Unique ID
fill_weight: Current fill height of a garbage bin. Measured by a sensor and transmitted to backend.
latitude: The latitude of a garbage bins‘ place.
longitude: The longitude of a garbage bins‘ place.
trashtype: Foreign Key to table Trashtype
district: Foreign Key to table district

### Edges
Stores the distance between two garbage bins. Distance is calculated by using Graphhopper (see below).
id: Unique ID
trashcan_id_1: Start Trashcan (Foreign Key to table Trashcan)
trashcan_id_2: Destination Trashcan (Foreign Key to table Trashcan)
distance: Distance between Start und Destination Trashcan.

### User
Stores the user that register for the application. The columns of this table are self-explanatory:
id
forename
surname
username
email
password


## ORM
As Orm we are using Diesel. See [http://diesel.rs/] for more info.



# Issues

- Error: no default toolchain configured after installing diesel_cli and executing `cargo run --bin crud`
    - Run `rustup default nightly` to set the nightly toolchain