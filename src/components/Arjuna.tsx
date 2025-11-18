import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface ArjunaProps {
  position: [number, number, number]
}

export default function Arjuna({ position }: ArjunaProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + Math.PI) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + Math.PI) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Simplified Arjuna representation */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Body */}
        <cylinderGeometry args={[0.4, 0.4, 1.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      {/* Crown/Helmet */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.2, 0.25, 8]} />
        <meshStandardMaterial color="#C0C0C0" />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      {/* Bow */}
      <mesh position={[0.6, 0.1, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.05, 0.5, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

