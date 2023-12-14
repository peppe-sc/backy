use rusqlite::Connection;
use serde::Serialize;
use serde_json;

#[derive(Serialize)]
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

#[derive(Serialize)]
struct Edge {
    id: String,
    source: String,
    target: String,
}



pub fn get_nodes() -> Result<String, String> {
    let connection = Connection::open("./server.db");

    if connection.is_err() {
        return Err("Error during database connection".to_string());
    }

    let query = "SELECT * FROM NODES";

    let db = connection.unwrap();

    let mut stmt = db.prepare(query).unwrap();

    //let node_list:Node;

    let result = stmt.query_map([], |row| {
        
       //println!("{:?}",row);
        Ok(Node {
            id: match row.get(0) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            node_type: match row.get(1) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            source: match row.get(2) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            opertation: match row.get(3) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            tab: match row.get(4) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            label: match row.get(5) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            x: match row.get(6) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            y: match row.get(7) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            }
        })
    }); 
    //drop(stmt);

    let node_list: Vec<Node> = result.unwrap().map(|e|{e.unwrap()}).collect();



    return Ok(serde_json::to_string(&node_list).unwrap());
}

pub fn get_edges() -> Result<String,String>{
    let connection = Connection::open("./server.db");

    if connection.is_err() {
        return Err("Error during database connection".to_string());
    }

    let query = "SELECT * FROM EDGES";

    let db = connection.unwrap();

    let mut stmt = db.prepare(query).unwrap();

    let result = stmt.query_map([], |row| {
        
        //println!("{:?}",row);
        
        Ok(Edge {
            id: match row.get(0) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            source: match row.get(1) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            },
            target: match row.get(2) {
                Ok(s) => s,
                Err(_e) => "null".to_string()
            }
        })
    }); 
    //drop(stmt);

    let edge_list: Vec<Edge> = result.unwrap().map(|e|{e.unwrap()}).collect();



    return Ok(serde_json::to_string(&edge_list).unwrap());
}


pub fn add_nodes(nodes: Vec<Node>) -> Result<String,String>{
    let connection = Connection::open("./server.db");

    if connection.is_err() {
        return Err("Error during database connection".to_string());
    }
    
    Ok("2".to_string())
}