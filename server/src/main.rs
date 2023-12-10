use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
mod db;

#[get("/")]
async fn hello() -> impl Responder {
    
    HttpResponse::Ok().body("Hello world!")
}

#[get("/nodes")]
async fn get_nodes() -> impl Responder{
    let nodes = db::get_nodes();
    HttpResponse::Ok().body(nodes.unwrap())
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .service(hello)
            .service(echo)
            .service(get_nodes)
            .route("/hey", web::get().to(manual_hello))
            .route("/demo/{demo_id}",web::get().to(manual_hello))
    })
    .bind(("localhost", 8080))?
    .run()
    .await
}