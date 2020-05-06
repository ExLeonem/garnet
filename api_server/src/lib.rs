#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate diesel;
#[macro_use] extern crate rocket_cors;

use rocket::http::Method;
use std::str::FromStr;

use rocket_cors::{
    AllowedHeaders, AllowedOrigins, Error,
    Cors, CorsOptions
};

pub mod routes;
pub mod models;
pub mod csv_reader;
pub mod schema;
pub mod db;
pub mod tsp;

// Alle db zugriffe ausgelagert in db.rs
// Hier nur API Aufruf als Einstiegspunkt.

pub fn start_api() {
    //read_csv();
    // .mount("/", routes![routes::index, routes::get_all_trashcans,routes::trashcan, routes::add_trashcan, routes::get_all_filled_districts, routes::get_all_districts, routes::get_filled_trashcans, routes::fill_trashcan, routes::get_optimal_path, routes::update_trashcan])
    rocket::ignite()
    .register(catchers![routes::not_found])
    .mount("/", routes![routes::index, routes::get_trashcan_all, routes::get_trashcan_single, routes::create_trashcan, routes::get_district_all])
    .attach(make_cors()).launch();
}

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:1234",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "https://garnet.works",
        "http://garnet.works"
    ]);

    let methods = ["POST","PATCH","PUT","DELETE","HEAD","OPTIONS","GET"]
        .iter()
        .map(|s| FromStr::from_str(s).unwrap())
        .collect();

    CorsOptions {
        allowed_origins, //see above
        allowed_methods: methods, // default = ["POST","PATCH","PUT","DELETE","HEAD","OPTIONS","GET"]
        allowed_headers: AllowedHeaders::all(), //accept all headers
        allow_credentials: false,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}

pub fn read_csv() {
    let csv = csv_reader::run();

    match csv {
        Ok(trashtypes_and_trashcans) => {
            let trashtypes = trashtypes_and_trashcans.0;
            let trashcans = trashtypes_and_trashcans.1;
            for trashtype in trashtypes {
                db::insert_trashtype(trashtype);
            }
            for trashcan in trashcans {
                db::insert_trashcan(trashcan);
            }
        }
        Err(err) => println!("{:?}", err),
    }
}