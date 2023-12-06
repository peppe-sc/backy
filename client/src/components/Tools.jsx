import React from 'react';

export default () => {
  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('application/reactflow', nodeType+"###"+label);
    
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input','Start')} draggable>
        Start
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default' ,'Data Transform')} draggable>
        Data Transform
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default' ,'Database')} draggable>Database</div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', 'Return Response')} draggable>
        Return Response
      </div>
    </aside>
  );
};
