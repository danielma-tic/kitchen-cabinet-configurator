import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import CabinetViewer from './CabinetViewer';

const CabinetConfigurator = () => {
  const [dimensions, setDimensions] = useState({
    width: 30,
    height: 36,
    depth: 24
  });
  
  const [selectedType, setSelectedType] = useState('base');
  
  return (
    <div className="w-full h-screen flex">
      {/* 3D Viewport */}
      <div className="w-3/4 bg-gray-100 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50">
            <Camera className="w-5 h-5" />
          </button>
        </div>
        <CabinetViewer dimensions={dimensions} cabinetType={selectedType} />
      </div>
      
      {/* Control Panel */}
      <div className="w-1/4 p-4 bg-white shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cabinet Configuration</h2>
        
        {/* Cabinet Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Cabinet Type</label>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="base">Base Cabinet</option>
            <option value="wall">Wall Cabinet</option>
            <option value="tall">Tall Cabinet</option>
          </select>
        </div>
        
        {/* Dimensions */}
        <div className="space-y-4">
          <h3 className="font-medium">Dimensions (inches)</h3>
          
          <div>
            <label className="block text-sm">Width</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions({...dimensions, width: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm">Height</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => setDimensions({...dimensions, height: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm">Depth</label>
            <input
              type="number"
              value={dimensions.depth}
              onChange={(e) => setDimensions({...dimensions, depth: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-6 space-y-2">
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Cabinet
          </button>
          <button className="w-full border border-gray-300 p-2 rounded hover:bg-gray-50">
            Reset View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinetConfigurator;