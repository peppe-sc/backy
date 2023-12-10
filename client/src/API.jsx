const URL = "http://localhost:8080";

async function getNodes() {
    console.log("s")
    const response = await fetch(URL + '/nodes');
    console.log(response)
    const nodes = await response.json();
    console.log(nodes)
    if (response.ok) {
        return nodes.map((x) => ({id: x.id, type: x.node_type, data: {label: x.label}, position:{x:parseFloat(x.x),y:parseFloat(x.y)}}));
    } else {
        throw nodes;
    }
}

const API = {getNodes};
export default API;