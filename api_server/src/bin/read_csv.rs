#![feature(proc_macro_hygiene)]
extern crate garnet_api;
//#[macro_use]
//extern crate rocket;
//use rocket::*;

//pub  mod routes;
use garnet_api::read_csv;
//use routes;
//use garnet_api::routes;

fn main() {
    read_csv();
}