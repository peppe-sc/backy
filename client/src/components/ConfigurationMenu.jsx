import React, { useState } from 'react';
import { useReactFlow } from 'reactflow';

function ConfigurationMenu ({node,...props})  {
  
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    const [suffix,setSuffix] = useState(node.suffix? node.suffix:"" )
  return (
    <aside>
      
      {node.data.label == "Start"? <div className="dndnode"  >
        <form action=""><label htmlFor="suffix">Suffix:   </label><input name='suffix' type="text" value={suffix} onChange={(ev)=>setSuffix(ev.target.value)}/></form>
      </div>:false}
      
      {node.data.label == "Database"? <div className="dndnode"  >
        <form className='flex' action=""><p>DB: </p><select name="db_params" id="db_params"><option value="test_db">Test DB</option></select></form>
      </div>:false}

      <div onClick={(event)=>props.setConfigure(-1)} className="dndnode"  >
        <button>Back</button>
      </div>
      <div onClick={(event)=>{
        setNodes((nodes)=>nodes.map((n)=>{
            if(n.id==node.id){
                n.suffix=suffix;
            }
            return n;
        }));
        props.setConfigure(-1);
      }} className="dndnode"  >
        <button>Save</button>
      </div>
      
    </aside>
  );
};


export default ConfigurationMenu