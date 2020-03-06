#![feature(proc_macro_hygiene)]
extern crate garnet_api;
use garnet_api::start_api;

//****Einstiegspunkt**** -> cargo run --bin crud
fn main() {
    start_api();
}
