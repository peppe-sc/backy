import React, { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import API from '../API';
import Form from 'react-bootstrap/Form';
function ConfigurationMenu({ node, ...props }) {

  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  console.log(node)
  const [suffix, setSuffix] = useState(node.suffix ? node.suffix : "")
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState([]);
  const [dbList,setdbList] = useState();
  const [db, setDb] = useState();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("")
  


  useEffect(() => {
    setLoading(true);
    if (node.data.label == "Database") {
      //window.setTimeout(()=>setLoading(false),4000);
      API.getTablesList().then((t)=>{setTables(t.map((n)=>n));setLoading(false);}).catch((e)=>console.log("error"+e));
    } else {
      setLoading(false);
    }
  }, [node]);

  /**<p>Table: </p>
            <select name="db_params" id="db_params">
              {tables.map((table_name)=><option value={table_name}>{table_name}</option>)}
            </select> */
  return (
    <>
      {loading ? false : <aside>

        {node.data.label == "Start" ? <div className="dndnode"  >
          <form action=""><label htmlFor="suffix">Suffix:   </label><input name='suffix' type="text" value={suffix} onChange={(ev) => setSuffix(ev.target.value)} /></form>
        </div> : false}

        {node.data.label == "Database" ? <div   >
          <Form className='flex'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write here your SQL query</Form.Label>
              <Form.Control as="textarea" value={query}
          onChange={(event)=>setQuery(event.target.value)} rows={3} />
            </Form.Group>
          </Form>
        </div> : false}

        <div onClick={(event) => props.setConfigure(-1)} className="dndnode"  >
          <button>Back</button>
        </div>
        <div onClick={(event) => {
          setNodes((nodes) => nodes.map((n) => {
            if (n.id == node.id) {
              n.suffix = suffix;
              n.query = query;
              console.log(n);
            }
            return n;
          }));
          props.setConfigure(-1);
        }} className="dndnode"  >
          <button>Save</button>
        </div>

      </aside>}
    </>
  );
};


export default ConfigurationMenu