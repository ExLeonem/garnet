
# Index

1. [API](#API)
2. [Architecture](#Architecture)


## API

The endpoints can be reached below the basie url of the backend api. For example in case of the docker container : `localhost:3001/<endpoint>`.
**To receive responses from the backend, the content-type needs to be set to: `content-type: application/json`.**

| Endpoint              | Method    |  Description  | Body
| ---                   | ---       |  ---          | ---
| /allTrashcans         | GET       | Retrieve all trashcans known to the system |
| /trashCan/{id}        | GET       |   |
| /allDistricts         | GET       | Retrieves all districts known to the system
| /getFilledTrashcans   | POST      | Retriev all district where an trashcan exists that needs to be emptied. | `{"districsts": \[id_1, id_2, ...\]}`
| /trashcan             | POST      | Add a trashcan to the system | `{"fill_weight": number, "latitude": number, "longitude": number, "trashtype": number, "districts": number}`
| /fillTrashcan         | POST      | Update the current fill state of trashcan | `{"id": <bin_id>, "fill_state": number}`
| /updateTrashcan       | POST      | Update the curent values of a trashcan    | `{"id": <bin_id>, "district": <district_id>}`


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
