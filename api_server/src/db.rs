use diesel::prelude::*;
use dotenv::dotenv;
use std::env;
use super::schema;
use crate::models::*;

// Hier ist der komplette Datenbankzugriff definiert.

pub fn establish_connection() -> MysqlConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
    .expect("DATABASE_URL must be set.");
    // Meine SQL-DB URL hart-codiert. URL in Z.17 anpassen.
    let _database_url = "mysql://localhost:3306/garnet_db";

    MysqlConnection::establish(&_database_url)
        .expect(&format!("Error connecting to {}", _database_url))
}

pub fn select_all_users() -> Vec<User> {
    use schema::user::dsl::*;
    let connection = establish_connection();
    let results = user.load::<User>(&connection).expect("Error loading users");
    results
}

pub fn select_user_by_username(user_name: String) -> Option<User> {
    use schema::user::dsl::*;
    let connection = establish_connection();
    let mut result = user.filter(username.eq(user_name)).load::<User>(&connection).expect("Error loading user");
    result.pop()
}

pub fn select_all_trashtypes() -> Vec<TrashType> {
    use schema::trashtype::dsl::*;
    let connection = establish_connection();
    let results = trashtype.load::<TrashType>(&connection).expect("Error loading trashtypes");
    results
}

pub fn select_all_districts() -> Vec<District> {
    use schema::district::dsl::*;
    let connection = establish_connection();
    let results = district.load::<District>(&connection).expect("Error loading districts");
    results
}

pub fn select_all_trashcans() -> Vec<Trashcan> {
    use schema::trashcan::dsl::*;
    let connection = establish_connection();
    let results = trashcan.load::<Trashcan>(&connection).expect("Error loading trashcans");
    results
}

 pub fn select_trashcan(t_id: i32) -> Option<Trashcan> {
     use schema::trashcan::dsl::*;
     let connection = establish_connection();
     let mut result = trashcan.filter(id.eq(t_id)).load::<Trashcan>(&connection).expect("Error loading Trashcan.");
     result.pop()
 }

pub fn select_filled_trashcans_from_districts(districts: Vec<i32>) -> Vec<Trashcan>{
    use schema::trashcan::dsl::*;
    let connection = establish_connection();
    let mut result: Vec<Trashcan> = vec![];

    for d in districts {
        let mut filled_trashcans = 
        trashcan.filter(district.eq(d))
        .filter(fill_weight.gt(Some(100.0)))
        .order_by(id.asc())
        .load::<Trashcan>(&connection)
        .expect("Error loading filled Trashcans.");

        result.append(&mut filled_trashcans);
    }
    result
}

pub fn insert_user(new_user: NewUser) -> User {
    use schema::user;
    let connection = establish_connection();
    diesel::insert_into(user::table).values(&new_user).execute(&connection).expect("Error saving new user");
    user::table.order(user::id.desc()).first(&connection).unwrap()
}

pub fn insert_trashtype(new_trashtype: NewTrashType) -> TrashType {
    use schema::trashtype;
    let connection = establish_connection();
    diesel::insert_into(trashtype::table).values(&new_trashtype).execute(&connection).expect("Error saving new trashtype");
    trashtype::table.order(trashtype::id.desc()).first(&connection).unwrap()
}

pub fn insert_district(new_district: NewDistrict) -> District {
    use schema::district;
    let connection = establish_connection();
    diesel::insert_into(district::table).values(&new_district).execute(&connection).expect("Error saving new district");
    district::table.order(district::id.desc()).first(&connection).unwrap()
}

pub fn insert_trashcan(new_trashcan: NewTrashcan) -> Trashcan {
    use schema::trashcan;
    let connection = establish_connection();
    diesel::insert_into(trashcan::table).values(&new_trashcan).execute(&connection).expect("Error saving new trashcan");
    trashcan::table.order(trashcan::id.desc()).first(&connection).unwrap()
}

pub fn update_user_forename(user_id: i32, new_forename: String) -> User {
    use schema::user::dsl::{user, forename};
    let connection = establish_connection();
    diesel::update(user.find(user_id)).set(forename.eq(new_forename))
        .execute(&connection).unwrap();
    user.find(user_id).first(&connection).expect("Unable to find user")
}

pub fn update_user_surname(user_id: i32, new_surname: String) -> User {
    use schema::user::dsl::{user, surname};
    let connection = establish_connection();
    diesel::update(user.find(user_id)).set(surname.eq(new_surname))
        .execute(&connection).unwrap();
    user.find(user_id).first(&connection).expect("Unable to find user")
}

pub fn update_user_username(user_id: i32, new_username: String) -> User {
    use schema::user::dsl::{user, username};
    let connection = establish_connection();
    diesel::update(user.find(user_id)).set(username.eq(new_username))
        .execute(&connection).unwrap();
    user.find(user_id).first(&connection).expect("Unable to find user")
}

pub fn update_user_email(user_id: i32, new_email: String) -> User {
    use schema::user::dsl::{user, email};
    let connection = establish_connection();
    diesel::update(user.find(user_id)).set(email.eq(new_email))
        .execute(&connection).unwrap();
    user.find(user_id).first(&connection).expect("Unable to find user")
}

pub fn update_user_password(user_id: i32, new_password: String) -> User {
    use schema::user::dsl::{user, password};
    let connection = establish_connection();
    diesel::update(user.find(user_id)).set(password.eq(new_password))
        .execute(&connection).unwrap();
    user.find(user_id).first(&connection).expect("Unable to find user")
}

pub fn update_trashtype(trashtype_id: i32, new_trashtype_name: String) -> TrashType {
    use schema::trashtype::dsl::{trashtype, trashtype_name};
    let connection = establish_connection();
    diesel::update(trashtype.find(trashtype_id)).set(trashtype_name.eq(new_trashtype_name))
        .execute(&connection).unwrap();
    trashtype.find(trashtype_id).first(&connection).expect("Unable to find trashtype")
}

pub fn update_district_number(district_id: i32, new_district_number: i32) -> District {
    use schema::district::dsl::{district, district_number};
    let connection = establish_connection();
    diesel::update(district.find(district_id)).set(district_number.eq(new_district_number))
        .execute(&connection).unwrap();
    district.find(district_id).first(&connection).expect("Unable to find district")
}

pub fn update_district_flag(district_id: i32, new_district_flag: String) -> District {
    use schema::district::dsl::{district, district_flag};
    let connection = establish_connection();
    diesel::update(district.find(district_id)).set(district_flag.eq(new_district_flag))
        .execute(&connection).unwrap();
    district.find(district_id).first(&connection).expect("Unable to find district")
}

pub fn update_trashcan_fill_weight(trashcan_id: i32, new_fill_weight: f64) -> Trashcan {
    use schema::trashcan::dsl::{trashcan, fill_weight};
    let connection = establish_connection();
    diesel::update(trashcan.find(trashcan_id)).set(fill_weight.eq(new_fill_weight))
        .execute(&connection).unwrap();
    trashcan.find(trashcan_id).first(&connection).expect("Unable to find trashcan")
}

pub fn update_trashcan_latitude(trashcan_id: i32, new_latitude: f64) -> Trashcan {
    use schema::trashcan::dsl::{trashcan, latitude};
    let connection = establish_connection();
    diesel::update(trashcan.find(trashcan_id)).set(latitude.eq(new_latitude))
        .execute(&connection).unwrap();
    trashcan.find(trashcan_id).first(&connection).expect("Unable to find trashcan")
}

pub fn update_trashcan_longitude(trashcan_id: i32, new_longitude: f64) -> Trashcan {
    use schema::trashcan::dsl::{trashcan, longitude};
    let connection = establish_connection();
    diesel::update(trashcan.find(trashcan_id)).set(longitude.eq(new_longitude))
        .execute(&connection).unwrap();
    trashcan.find(trashcan_id).first(&connection).expect("Unable to find trashcan")
}

pub fn update_trashcan_trashtype(trashcan_id: i32, new_trashtype: i32) -> Trashcan {
    use schema::trashcan::dsl::{trashcan, trashtype};
    let connection = establish_connection();
    diesel::update(trashcan.find(trashcan_id)).set(trashtype.eq(new_trashtype))
        .execute(&connection).unwrap();
    trashcan.find(trashcan_id).first(&connection).expect("Unable to find trashcan")
}

pub fn update_trashcan_district(trashcan_id: i32, new_district: i32) -> Trashcan {
    use schema::trashcan::dsl::{trashcan, district};
    let connection = establish_connection();
    diesel::update(trashcan.find(trashcan_id)).set(district.eq(new_district))
        .execute(&connection).unwrap();
    trashcan.find(trashcan_id).first(&connection).expect("Unable to find trashcan")
}

pub fn delete_user(user_id: i32) -> usize {
    use schema::user::dsl::*;
    let connection = establish_connection();
    diesel::delete(user.filter(id.eq(user_id))).execute(&connection).expect("Error deleting user")
}

pub fn delete_trashtype(trashtype_id: i32) -> usize {
    use schema::trashtype::dsl::*;
    let connection = establish_connection();
    diesel::delete(trashtype.filter(id.eq(trashtype_id))).execute(&connection).expect("Error deleting trashtype")
}

pub fn delete_district(district_id: i32) -> usize {
    use schema::district::dsl::*;
    let connection = establish_connection();
    diesel::delete(district.filter(id.eq(district_id))).execute(&connection).expect("Error deleting district")
}

pub fn delete_trashcan(trashcan_id: i32) -> usize {
    use schema::trashcan::dsl::*;
    let connection = establish_connection();
    diesel::delete(trashcan.filter(id.eq(trashcan_id))).execute(&connection).expect("Error deleting trashcan")
}