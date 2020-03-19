use rocket::Request;
use rocket_contrib::json::JsonValue;
use rocket_contrib::json::Json;
use serde::{Deserialize};
use rocket::response::content::Html;
use super::db;
use super::models::{NewTrashcan};
use super::tsp;

#[derive(Deserialize)]
pub struct Input {
    id: i32,
    fill_weight: f64
}

#[derive(Deserialize)]
pub struct DistrictsInput {
    districts: Vec<i32>
}

#[derive(Deserialize)]
pub struct District {
    id: i32,
    district: i32
}

#[get("/")]
pub fn index() -> Html<&'static str> {
    Html(r#"
        <title>Welcome to Garnet</title>
        <h1>GARNET API</h1>
        <p> Welcome to Garnet API. Try one of the following urls: </p>
        <ul>
            <li> <a href="/allTrashcans">/allTrashcans</a> </li>
            <li> <a href="/trashCan/1">/trashCan/id</a> </li>
        </ul>
    "#)
}

#[get("/allTrashcans", format="json")]
pub fn get_all_trashcans() -> JsonValue {
    let trash_cans = db::select_all_trashcans();
    let json_object = json!(trash_cans);
    json_object
}

#[get("/trashCan/<id>", format="json")]
pub fn trashcan(id: i32) -> JsonValue {
    let trashcan = db::select_trashcan(id);
    let json_object = json!(trashcan);
    json_object
}

#[get("/allDistricts", format="json")]
pub fn get_all_districts() -> JsonValue {
    let disctricts = db::select_all_districts();
    let disctricts_json = json!(disctricts);
    disctricts_json
} 

#[get("/allFilledDistricts", format="json")]
pub fn get_all_filled_districts() -> JsonValue {
    let result = db::select_filled_district_ids();
    let trashcans_json = json!(result);
    trashcans_json
} 

#[get("/getFilledTrashcans", data="<d_input>", format="json")]
pub fn get_filled_trashcans(d_input: Json<DistrictsInput>) -> JsonValue {
    let mut vec = Vec::new();
    for i in 0..d_input.districts.len() {
        vec.push(d_input.districts[i])
    }
    let result = db::select_filled_trashcans_from_districts(vec);
    let trashcans_json = json!(result);
    trashcans_json
}

#[get("/optimalPath", data="<d_input>", format="json")]
pub fn get_optimal_path(d_input: Json<DistrictsInput>) -> JsonValue {
    let mut vec = Vec::new();
    for i in 0..d_input.districts.len() {
        vec.push(d_input.districts[i])
    }
    let trashcans = db::select_filled_trashcans_from_districts(vec);
    println!("Computing TSP with trashcans: {:?}", trashcans);
    let result_coordinates = tsp::compute_tsp(trashcans);
    println!("result -> {:?}", result_coordinates);
    let trashcans_json = json!(result_coordinates);
    trashcans_json
}

#[post("/trashcan", data="<trashcan>", format="json")]
pub fn add_trashcan(trashcan: Json<NewTrashcan>) -> () {
    println!("trashcan fillweight: {:?}", trashcan.fill_weight);
    let tc : NewTrashcan = NewTrashcan {
        district: trashcan.district,
        longitude: trashcan.longitude,
        latitude: trashcan.latitude,
        fill_weight : trashcan.fill_weight,
        trashtype: trashcan.trashtype
    };
    db::insert_trashcan(tc);
}

 #[post("/fillTrashcan", data = "<input>", format="json")]
 pub fn fill_trashcan(input: Json<Input>) -> () {
    println!("fill can: {:?} with value: {:?}", input.id, input.fill_weight);
    db::update_trashcan_fill_weight(input.id, input.fill_weight);
}

#[post("/updateTrashcan", data = "<district_input>", format="json")]
pub fn update_trashcan(district_input: Json<District>) -> () {
   db::update_trashcan_district(district_input.id, district_input.district);
} 

#[catch(404)]
pub fn not_found(req: &Request) -> String
{
  format!("Could not find {}. Try the following: /", req.uri())
}