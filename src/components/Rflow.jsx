import React from 'react'
import { useParams } from 'react-router-dom';
function Rflow() {
  const { id,name} = useParams();
  return (
    <div>
      <h1>id: {id}</h1>
      <h1>name: {name}</h1>
    </div>
  )
}

export default Rflow