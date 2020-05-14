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

#[get("/v1/bin?<filled>&<districts>", format="json")]
pub fn get_trashcan_all(filled: bool, districts: Option<String>) -> JsonValue {
    
    // Return only filled trashcans
    if (filled) {
    
        // Select only trashcans of specific districts
        let result;
        if (!districts.is_none()) {
            
            let districtIdString: String = districts.unwrap();
            let mut indices: Vec<&str> = districtIdString.split(",").collect();

            // Split and collect district ids into vec
            let mut districtVec: Vec<i32> = vec![];
            for i in 0..indices.len() {

                let indx: &str = indices.pop().unwrap();
                let parsedValue = indx.parse::<i32>();

                if (parsedValue.is_ok()) {

                    let parsedDistrictId: i32 = parsedValue.unwrap();
                    districtVec.push(parsedDistrictId);
                }
            }

            result = db::select_filled_trashcans_from_districts(districtVec);

        } else {

            result = db::select_filled_trashcans();
        }

        let trashcans_json = json!(result);
        return trashcans_json;
    }

    let trash_cans = db::select_all_trashcans();
    let json_object = json!(trash_cans);
    json_object
}

// Create a new trashcan via endpoint
#[post("/v1/bin", data="<trashcan>", format="json")]
pub fn create_trashcan(trashcan: Json<NewTrashcan>) -> () {
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

// Specific information about a single trashcan
#[get("/v1/bin/<id>", format="json")]
pub fn get_trashcan_single(id: i32) -> JsonValue {
    let trashcan = db::select_trashcan(id);
    let json_object = json!(trashcan);
    json_object
}

 #[patch("/v1/bin/<id>", data = "<trashcan>", format="json")]
 pub fn update_trashcan(id: i32, trashcan: Json<NewTrashcan>) -> () {
    println!("fill can: {:?} with value: {:?}", id, trashcan.fill_weight);


    let tc: NewTrashcan = NewTrashcan {
        fill_weight: trashcan.fill_weight,
        longitude: trashcan.longitude,
        latitude: trashcan.latitude,
        district: trashcan.district,
        trashtype: trashcan.trashtype
    };

    db::update_trashcan(id, tc);
}

// Districts known to the system filled or not filled
#[get("/v1/district?<filled>", format="json")]
pub fn get_district_all(filled: bool) -> JsonValue {
    
    let result;
    if (filled) {
        result = db::select_filled_districts();

    } else {
        result = db::select_all_districts();

    }
    
    let disctricts_json = json!(result);
    disctricts_json
} 

// Path to calculate new value
// #[get("/optimalPath", data="<d_input>", format="json")]
// pub fn get_optimal_path(d_input: Json<DistrictsInput>) -> JsonValue {
//     let mut vec = Vec::new();
//     for i in 0..d_input.districts.len() {
//         vec.push(d_input.districts[i])
//     }
//     let trashcans = db::select_filled_trashcans_from_districts(vec);
//     println!("Computing TSP with trashcans: {:?}", trashcans);
//     let result_coordinates = tsp::compute_tsp(trashcans);
//     println!("result -> {:?}", result_coordinates);
//     let trashcans_json = json!(result_coordinates);
//     trashcans_json
// }


// #[post("/updateTrashcan", data = "<district_input>", format="json")]
// pub fn update_trashcan(district_input: Json<District>) -> () {
//    db::update_trashcan_district(district_input.id, district_input.district);
// } 

#[catch(404)]
pub fn not_found(req: &Request) -> String
{
  format!("Could not find {}. Try the following: /", req.uri())
}