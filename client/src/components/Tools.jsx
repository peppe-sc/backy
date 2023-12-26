import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default () => {

  const onDragStart = (event, nodeType, label) => {
    event.dataTransfer.setData('application/reactflow', nodeType + "###" + label);

    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="p-4 bg-gray-200">
      <div className="text-lg mb-4">Drag nodes to the left pane</div>

      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input', 'Start')} draggable>
        Start
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'Decision')} draggable>
        Decision
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'Login')} draggable>
        Login
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'Custom Script')} draggable>
        Custom Script
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'Data Mapping')} draggable>
        Data Mapping
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'External Call')} draggable>
        External Call
      </div>

      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', 'Database')} draggable>
        Database
      </div>

      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', 'Return Response')} draggable>
        Return Response
      </div>

      <div>
        <Button className=' pr-5' href="#">Save</Button>

        <Button  href="#">Deploy</Button>
      </div>
    </aside>
  );
};
