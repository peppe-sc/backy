import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ContextMenu from './ContextMenu';
import EdgeMenu from './EdgeMenu';
//import Sidebar from './Sidebar';


const minimapStyle = {
  height: 120,
};

import Tools from './Tools';
import ConfigurationMenu from './ConfigurationMenu';
import API from '../API';

const initialNodes = [
  /*{
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 5 },
  },*/
];

let id = 0;
const getId = () => `${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(null);
  const [edgeMenu, setEdgeMenu] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);
  const [configure, setConfigure] = useState(-1);
  const [loadingg, setLoading] = useState(true);
  const ref = useRef(null);

  const handleResize = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    // Aggiungi un listener per l'evento resize quando il componente monta
    window.addEventListener('resize', handleResize);
    setLoading(true);
    console.log("yes")
    API.getNodes().then((n) => {
      setNodes(n);
      id = Math.max(...n.map(x=>parseInt(x.id)))+1;
      API.getEdges().then((e) => { setEdges(e); setLoading(false); }).catch((e)=>console.log(e));
    }).catch((e) => console.log(e));
    
    // Pulisci il listener quando il componente smonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Basic code to work
   */
  const onConnect = useCallback(
    (params) => setEdges((eds) => { console.log(params); params.animated = true; return addEdge(params, eds); }),
    [],
  );

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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      //const label = "f"
      const type_label = event.dataTransfer.getData('application/reactflow');

      const type = type_label.split("###")[0]
      const label = type_label.split("###")[1]

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  const onEdgeMouseEnter = (event, edge) => {

    setEdgeMenu({
      id: edge.id,
      top: event.clientY,
      left: event.clientX,
      width: '200px',
      height: '100px'
    });


    setHoveredEdge(edge.id);
  };

  const onEdgeMouseLeave = (event, edge) => {
    window.setTimeout(() => setHoveredEdge(null), 1000)

  };

  /**
   * End of basic
   */
  return (<>
    {loadingg ? <h1>Ciaoooo</h1> : <div style={{ width: width, height: height }} className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper bg-white" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onPaneClick={onPaneClick}
            onNodeContextMenu={onNodeContextMenu}
            onEdgeMouseEnter={onEdgeMouseEnter}
            onEdgeMouseLeave={onEdgeMouseLeave}
            ref={ref}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <MiniMap style={minimapStyle} zoomable pannable />
            <Controls />
            {menu && <ContextMenu onClick={onPaneClick} {...menu} setConfigure={setConfigure} />}
            {hoveredEdge && <EdgeMenu {...edgeMenu} />}
          </ReactFlow>
        </div>
        {configure == -1 ? <Tools /> : <ConfigurationMenu setConfigure={setConfigure} node={configure} />}
      </ReactFlowProvider>
    </div>}</>
  );
};

export default DnDFlow;
