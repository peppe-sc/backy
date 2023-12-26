const URL = "http://localhost:8080";

async function getNodes() {
    
    const response = await fetch(URL + '/nodes');
    
    const nodes = await response.json();
    
    if (response.ok) {
        return nodes.map((x) => ({id: x.id, type: x.node_type, data: {label: x.label}, position:{x:parseFloat(x.x),y:parseFloat(x.y)}}));
    } else {
        throw nodes;
    }
}

async function getEdges() {
    //console.log("s")
    const response = await fetch(URL + '/edges');
    //console.log(response)
    const edges = await response.json();
    //console.log(edges)
    if (response.ok) {
        return edges.map((x) => ({id: x.id, source: x.source, target: x.target, animated: true}));
    } else {
        throw edges;
    }
}

async function getTablesList() {
    //console.log("s")
    const response = await fetch(URL + '/db/tables');
    //console.log(response)
    const tables = await response.json();
    //console.log(edges)
    //console.log(tables.ok);
    if (response.ok) {
        
        return tables.map((x)=>x.name);
    } else {
        throw tables;
    }
}



const API = {getNodes,getEdges,getTablesList};
export default API;