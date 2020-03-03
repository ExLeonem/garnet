use std::fmt::Display;
use serde::export::Formatter;
use serde::export::fmt::Error;
use serde::{Serialize, Deserialize};
use super::schema::{user, trashtype, district, trashcan};

#[derive(Queryable, Debug, PartialEq)]
pub struct User {
    pub id: i32,
    pub forename: String,
    pub surname: String,
    pub username: String,
    pub email: String,
    pub password: String,
}

impl Display for User {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error> {
        write!(f, "id: {}, forename: {}, surname: {}, username: {}, email: {}, password: {}", self.id, self.forename, self.surname, self.username, self.email, self.password)
    }
}

#[derive(Queryable, Debug, PartialEq)]
pub struct TrashType {
    pub id: i32,
    pub trashtype_name: String,
}

impl Display for TrashType {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error> {
        writeln!(f, "id: {}, trashtype: {}", self.id, self.trashtype_name)
    }
}

#[derive(Serialize, Queryable, Debug, PartialEq)]
pub struct District {
    pub id: i32,
    pub district_number: i32,
    pub district_flag: Option<String>,
}

impl Display for District {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error> {
        let district_flag = match &self.district_flag {
            Some(d) => d,
            None => " "
        };
        writeln!(f, "id: {}, district_number: {}, district_flag: {}", self.id, self.district_number, district_flag)
    }
}

#[derive(Serialize, Deserialize, Queryable, Debug, PartialEq)]
pub struct Trashcan {
    pub id: i32,
    pub fill_weight: Option<f64>,
    pub latitude: f64,
    pub longitude: f64,
    pub trash_type: i32,
    pub district: Option<i32>,
}

impl Display for Trashcan {
    fn fmt(&self, f: &mut Formatter<'_>) -> Result<(), Error> {
        let fill_weight = match &self.fill_weight {
            Some(fw) => fw,
            None => &0.0
        };
        let district = match &self.district {
            Some(d) => d,
            None => &0
        };
        writeln!(f, "id: {}, fill_weight: {}, latitude: {}, longitude: {}, trashtype: {}, district: {}",
                        self.id, fill_weight, self.latitude, self.longitude, self.trash_type, district)
    }
}


#[derive(Insertable)]
#[table_name="user"]
pub struct NewUser {
    pub forename: String,
    pub surname: String,
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Insertable, Debug, PartialEq)]
#[table_name="trashtype"]
pub struct NewTrashType {
    pub id: i32,
    pub trashtype_name: String,
}

#[derive(Insertable, Serialize)]
#[table_name="district"]
pub struct NewDistrict {
    pub district_number: i32,
    pub district_flag: Option<String>,
}

#[derive(Insertable, Deserialize)]
#[table_name="trashcan"]
pub struct NewTrashcan {
    pub fill_weight: Option<f64>,
    pub latitude: f64,
    pub longitude: f64,
    pub trashtype: i32,
    pub district: Option<i32>,
}