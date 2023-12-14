use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_cors::Cors;
use serde::Deserialize;
mod db;

#[derive(Deserialize)]
struct Node {
    id: String,
    node_type: String,
    source: String,
    opertation: String,
    tab: String,
    label: String,
    x: String,
    y: String,
}
#[derive(Deserialize)]
struct Nodes{
    node: Vec<Node>
}



#[get("/")]
async fn hello() -> impl Responder {
    
    HttpResponse::Ok().body("Hello world!")
}

#[get("/nodes")]
async fn get_nodes() -> impl Responder{
    let nodes = db::get_nodes();
    HttpResponse::Ok().body(nodes.unwrap())
}

#[get("/edges")]
async fn get_edges() -> impl Responder{
    let edges: Result<String, String> = db::get_edges();
    HttpResponse::Ok().body(edges.unwrap())
}

#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    HttpResponse::Ok().body(req_body)
}

async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn register_flow(payload: web::Json<Nodes>) -> impl Responder{
    let id = 2;
    println!("{:?}",payload.node[1].id);
    //db::add_nodes(payload);

    HttpResponse::Ok().body(id.to_string())
}

async fn execute_flow(id: web::Path<u32>) ->impl Responder{
    HttpResponse::Ok().body("ok")
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
            .service(get_edges)
            .route("/flows",web::put().to(register_flow))
            .route("/API/{flow_id}", web::post().to(execute_flow))
            
    })
    .bind(("localhost", 8080))?
    .run()
    .await
}