import React, { useCallback, useState,useRef, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    applyEdgeChanges, 
    applyNodeChanges,
    ReactFlowProvider
} from 'reactflow';

import 'reactflow/dist/style.css';

import ContextMenu from './ContextMenu';
import EdgeMenu from './EdgeMenu';

const minimapStyle = {
    height: 120,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
    configuratin: {
      suffix: "test_api",
    },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];

function DemoCanva({edges,setEdges,...props}) {
    
    const [nodes, setNodes] = useState(initialNodes);
    const [menu, setMenu] = useState(null);
    const [edgeMenu, setEdgeMenu] = useState(null)
    const ref = useRef(null);

    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const [hoveredEdge,setHoveredEdge] = useState(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);


    const onNodesChange = (changes) => {console.log(changes);setNodes((nds) => applyNodeChanges(changes, nds));}
        
    
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {connection.animated = true;setEdges((eds) => addEdge(connection, eds));},
        [setEdges]
      );

    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        // Aggiungi un listener per l'evento resize quando il componente monta
        window.addEventListener('resize', handleResize);

        // Pulisci il listener quando il componente smonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const onNodeContextMenu = useCallback(
        (event, node) => {
          // Prevent native context menu from showing
          event.preventDefault();
            
          // Calculate position of the context menu. We want to make sure it
          // doesn't get positioned off-screen.
          const pane = ref.current.getBoundingClientRect();
          setMenu({
            id: node.id,
            top: event.clientY < pane.height - 200 && event.clientY,
            left: event.clientX < pane.width - 200 && event.clientX,
            right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
            bottom:
              event.clientY >= pane.height - 200 && pane.height - event.clientY,
          });
        },
        [setMenu],
      );

      const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

      /*const onEdgeClick = (event, edge) => {
        console.log(`Clicked on edge ${edge.id}`);
      };*/
      
      const onEdgeMouseEnter = (event, edge) => {
        //console.log(props.mousePosition)
        setEdgeMenu({
            id: edge.id,
            top: event.clientY - props.offset ,
            left: event.clientX ,
            width: '200px',
            height: '100px'
        });
        
        setNodes((ns)=>{
          const i = Math.max(...ns.map((n)=>n.id));
          const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          //console.log(ns)
          return [{
          id: i+1,
          type: 'default',
          data: { label: 'Data Transform' },
          position: position,
        },...ns];});
        setNodes((ns)=>ns.map((n)=>{n.position.x = 1; return n}))

        setHoveredEdge(edge.id);
      };
      
      const onEdgeMouseLeave = (event, edge) => {
        window.setTimeout(()=>setHoveredEdge(null),700)
        
      };

    return (
        <div  className=' bg-white' style={{ width: width, height: height-props.offset }}>
            <ReactFlowProvider>
            <ReactFlow ref={ref} nodes={nodes} edges={edges} onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} onConnect={onConnect} onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu} onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseLeave={onEdgeMouseLeave} onInit={setReactFlowInstance} fitView >
                <Background color="#aaa" gap={16} />
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
                {hoveredEdge && <EdgeMenu {...edgeMenu}/>}
            </ReactFlow>
            </ReactFlowProvider>
        </div>
    );
}
export default DemoCanva