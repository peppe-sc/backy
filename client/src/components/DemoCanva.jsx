import React, { useCallback, useState,useRef, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    applyEdgeChanges, 
    applyNodeChanges
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
    },

    {
        id: '2',
        // you can also pass a React component as a label
        data: { label: <div>Default Node</div> },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'Output Node' },
        position: { x: 250, y: 250 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' , animated: true},
    { id: 'e2-3', source: '2', target: '3', animated: true, op: "ciao" },
];

function DemoCanva(props) {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    
    const [menu, setMenu] = useState(null);
    const [edgeMenu, setEdgeMenu] = useState(null)
    const ref = useRef(null);

    const [height, setHeight] = useState(window.innerHeight);
    const [width, setWidth] = useState(window.innerWidth);

    const [hoveredEdge,setHoveredEdge] = useState(null);

    const [mousePosition,setMousePosition] = useState(0);
  

  const handle_mouse = (event) =>{
    const {clientX, clientY} = event;
    setMousePosition({x: clientX,y: clientY});
  }

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {connection.animated = true;setEdges((eds) => addEdge(connection, eds));console.log(connection)},
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
        console.log(props.mousePosition)
        setEdgeMenu({
            id: edge.id,
            top: event.clientY - props.offset ,
            left: event.clientX ,
            width: '200px',
            height: '100px'
        });
        setHoveredEdge(edge.id);
      };
    
      const onEdgeMouseLeave = (event, edge) => {
        window.setTimeout(()=>setHoveredEdge(null),1000)
        //setHoveredEdge(null);
      };

    return (
        <div onMouseMove={handle_mouse} className=' bg-white' style={{ width: width, height: height-props.offset }}>
            <ReactFlow ref={ref} nodes={nodes} edges={edges} onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange} onConnect={onConnect} onPaneClick={onPaneClick}
      onNodeContextMenu={onNodeContextMenu} onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseLeave={onEdgeMouseLeave} fitView >
                <Background color="#aaa" gap={16} />
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
                {hoveredEdge && <EdgeMenu {...edgeMenu}/>}
            </ReactFlow>
        </div>
    );
}
export default DemoCanva