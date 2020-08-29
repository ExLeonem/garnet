use rocket::http::{Header, ContentType};


#[derive(Responder)]
#[response(status = 201, content_type = "json")]
pub struct BatchCreated {
    inner: InnerResponder,
    header: ContentType,   
}


// Responders for error codes 405, 406, 409, 415 and 400
#[derive(Responder)]
#[response(status = 405, content_type = "json")]
pub struct ErrMethodNotAllowed {
    inner: InnerResponder,
    header: ContentType
}


#[derive(Responder)]
#[response(status = 406, content_type = "json")]
pub struct ErrRessourceNotAv {
    inner: InnerResponder,
    header: ContentType
}


#[derive(Responder)]
#[response(status = 409, content_type = "json")]
pub struct ErrAlreadyExists {
    inner: InnerResponder,
    header: ContentType
}


#[derive(Responder)]
#[response(status = 415, content_type = "json")]
pub struct ErrWrongMediaT {
    inner: InnerResponder,
    header: ContentType
}