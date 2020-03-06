table! {
    district (id) {
        id -> Integer,
        district_number -> Integer,
        district_flag -> Nullable<Varchar>,
    }
}

table! {
    trashcan (id) {
        id -> Integer,
        fill_weight -> Nullable<Double>,
        latitude -> Double,
        longitude -> Double,
        trashtype -> Integer,
        district -> Nullable<Integer>,
    }
}

table! {
    trashtype (id) {
        id -> Integer,
        trashtype_name -> Varchar,
    }
}

table! {
    user (id) {
        id -> Integer,
        forename -> Varchar,
        surname -> Varchar,
        username -> Varchar,
        email -> Varchar,
        password -> Varchar,
    }
}

joinable!(trashcan -> district (district));
joinable!(trashcan -> trashtype (trashtype));

allow_tables_to_appear_in_same_query!(
    district,
    trashcan,
    trashtype,
    user,
);
