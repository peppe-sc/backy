import React, { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import API from '../API';

function ConfigurationMenu({ node, ...props }) {

  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const [suffix, setSuffix] = useState(node.suffix ? node.suffix : "")
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState([]);
  const [dbList,setdbList] = useState();
  const [db, setDb] = useState();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (node.data.label == "Database") {
      //window.setTimeout(()=>setLoading(false),4000);
      API.getTablesList().then((t)=>{setTables(t.map((n)=>n));setLoading(false);}).catch((e)=>console.log("error"+e));
    } else {
      setLoading(false);
    }
  }, [node]);


  return (
    <>
      {loading ? false : <aside>

        {node.data.label == "Start" ? <div className="dndnode"  >
          <form action=""><label htmlFor="suffix">Suffix:   </label><input name='suffix' type="text" value={suffix} onChange={(ev) => setSuffix(ev.target.value)} /></form>
        </div> : false}

        {node.data.label == "Database" ? <div className="dndnode"  >
          <form className='flex' action="">

            <p>Table: </p>
            <select name="db_params" id="db_params">
              {tables.map((table_name)=><option value={table_name}>{table_name}</option>)}
            </select>
            
          </form>
        </div> : false}

        <div onClick={(event) => props.setConfigure(-1)} className="dndnode"  >
          <button>Back</button>
        </div>
        <div onClick={(event) => {
          setNodes((nodes) => nodes.map((n) => {
            if (n.id == node.id) {
              n.suffix = suffix;
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