import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

function EdgeMenu({top,left,right,bottom,...props}){

    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

    const deleteEdge = ()=>{
        setEdges((edges)=>edges.filter((e)=>e.id!==props.id))
    }

    return (
        <div
          style={{ top, left, right, bottom }}
          className="context-menu"
          {...props}
        >
          <p style={{ margin: '0.5em' }}>
            <small>edge: {props.id}</small>
          </p>
          
          <button onClick={deleteEdge}>delete</button>
        </div>
      );

}

export default EdgeMenu