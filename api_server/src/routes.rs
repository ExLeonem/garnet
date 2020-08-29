use rocket::Request;
use rocket::response::content::Html;
use rocket_contrib::json::JsonValue;
use rocket_contrib::json::Json;
use serde::{Deserialize};
use serde_json::{Result, Value};
use super::db;
use super::models::{NewTrashcan, TrashcanBatch, NewDistrict, DistrictBatch};
// use self::responder::BatchCreated;

// use super::com::responder;


// use super::tsp;



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
pub fn index() -> JsonValue {
    
    json!({
        "_links": {
            "self": {
                "href": "localhost:3001/api" 
            },
            "bin": {
                "href": "localhost:3001/bin"
            },
            "district": {
                "href": "localhost:3001/district"
            }
        },
        "welcome": "Welcome to the garnet API. you can lookup the documentation at 'https://exleonem.github.io/garnet/'"
    })
}


#[get("/bin?<filled>&<districts>", format="json")]
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
#[post("/bin", data="<trashcan>", format="json")]
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


// #[post("/bin", data="<trashcan>", format="json")]
// pub fn create_trashcan(trashcan: Json<NewTrashcan>) -> () {
//     println!("trashcan fillweight: {:?}", trashcan.fill_weight);
//     let tc : NewTrashcan = NewTrashcan {
//         district: trashcan.district,
//         longitude: trashcan.longitude,
//         latitude: trashcan.latitude,
//         fill_weight : trashcan.fill_weight,
//         trashtype: trashcan.trashtype
//     };
//     db::insert_trashcan(tc);
// }


// Specific information about a single trashcan
#[get("/bin/<id>", format="json")]
pub fn get_trashcan_single(id: i32) -> JsonValue {
    let trashcan = db::select_trashcan(id);
    let json_object = json!(trashcan);
    json_object
}


 #[patch("/bin/<id>", data="<trashcan>", format="json")]
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


// Create single and batches of districts
#[post("/district", data="<data>", format="json")]
pub fn create_district(data: String) ->  () {

    let districtBatch: DistrictBatch =serde_json::from_str(&data).unwrap();

    if (!districtBatch.data.is_none()) {
        println!("Got a batch");


    } 




    // Parse the string of data into serde_json::Value.
    // let parsedJson: Value = serde_json::from_str(&data).unwrap();

    // // Single or batch insert 
    // let mut isBatch: bool = false;
    // if (!parsedJson["data"].is_null() && parsedJson["data"].is_array()) {
    //     isBatch = true;
    // }


    // Create single json object and return
    // if (!isBatch) {

    //     let districtArray = parsedJson["data"].as_array().unwrap();
    //     for i in 0..districtArray.len() {

    //         let district: NewDistrict = districtArray[i].as_object().unwrap();
    //         println!("{}", district.district_number);
    //     }

    // }


    // Access parts of the data by indexing with square brackets.
    // println!("{}", parsedJson["district_number"]);

}

    // json!({
    //     "id": 12,
    //     "district_number": 12,
    //     "district_flag": 14,
    //     "_links": {
    //         "self": {
    //             "href": "/district"
    //         },
    //         "parent": {
    //             "href": ""
    //         }
    //     }
    // })
// }


// Districts known to the system filled or not filled
#[get("/district?<filled>", format="json")]
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
//   format!("Could not find {}. Check the documentation at https://exleonem.github.io/garnet/", req.uri())
  format!("Could not find {}. Check the documentation at", req.uri())
}


// Catch 405 HTTP Method not allowed
// Catch 406 Ressource is not available in required form
// Catch 415 Wrong media type used for request