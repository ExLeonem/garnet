// Inspired by https://docs.rs/csv/1.1.1/csv/tutorial/index.html#writing-csv
use std::error::Error;
use std::path::Path;
use csv::StringRecord;
use crate::models::{NewTrashcan, NewTrashType};


pub fn run() -> Result<(Vec<NewTrashType>, Vec<NewTrashcan>), Box<dyn Error>> {

    let mut rdr = csv::ReaderBuilder::new()
    .delimiter(b';')
    .from_path("./csv/trash_bins_kn.csv")?;

    let mut trashcans: Vec<NewTrashcan> = vec![];
    let mut trash_types: Vec<NewTrashType> = vec![];

    for result in rdr.records() {
        let record = result?;
        let trashtype_and_trashcan = convert_record_to_struct(record).unwrap();
        if !trash_types.contains(&trashtype_and_trashcan.0) {
            trash_types.push(trashtype_and_trashcan.0);
        }
        trashcans.push(trashtype_and_trashcan.1);
    }

    Ok((trash_types, trashcans))
}


fn convert_record_to_struct(record: StringRecord) -> Result<(NewTrashType, NewTrashcan), Box<dyn Error>> {
    let art: i32 = record[0].parse()?;
    let art_name: String = record[1].parse()?;
    let longitude: f64 = record[2].replace(",", ".").parse()?;
    let latitude: f64 = record[3].replace(",", ".").parse()?;

    let trash_type = NewTrashType {
        id: art,
        trashtype_name: art_name
    };

    let trashcan = NewTrashcan { fill_weight: None,
                                 latitude,
                                 longitude,
                                 trashtype: art,
                                 district: None};

    Ok((trash_type, trashcan))
}
