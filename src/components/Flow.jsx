import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../index.css';
import '../App.css'
import CustomNode from './CustomNode';

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 5 },
    data: { 
      input:"A",
      name:"Input",
      output:"B",
     },
      style:{
        Background:'transparent'
      }
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  custom: CustomNode,
};
const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
        input:`${JSON.parse(type).input}`,
        name:`${JSON.parse(type).name}`,
        output:`${JSON.parse(type).output}`
       },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div className="dndflow">
      
        <div style={{
          height: 1000,
          width: 1000,
        }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}

            defaultZoom={1}
            defaultPosition={[0, 0]}
            >
            <Background variant="dots" gap={12} size={1} />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
    
    </div>
  );
};

export default Flow;