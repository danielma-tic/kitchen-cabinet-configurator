import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const CabinetViewer = ({ dimensions, cabinetType }) => {
  const canvasRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create cabinet mesh
    const createCabinet = () => {
      const { width, height, depth } = dimensions;
      const geometry = new THREE.BoxGeometry(width/10, height/10, depth/10);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x808080,
        roughness: 0.5,
        metalness: 0.1
      });
      return new THREE.Mesh(geometry, material);
    };
    
    const cabinet = createCabinet();
    scene.add(cabinet);
    
    // Position camera
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0, 0, 0);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cabinet.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoading(false);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth * 0.75, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      canvasRef.current?.removeChild(renderer.domElement);
    };
  }, [dimensions, cabinetType]);
  
  return (
    <div ref={canvasRef} className="w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-lg">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default CabinetViewer;