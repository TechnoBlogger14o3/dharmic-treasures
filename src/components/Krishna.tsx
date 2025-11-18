import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface KrishnaProps {
  position: [number, number, number]
}

export default function Krishna({ position }: KrishnaProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Simplified Krishna representation */}
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Body - Blue (Krishna's color) */}
        <cylinderGeometry args={[0.4, 0.4, 1.2, 8]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      
      {/* Crown/Peacock Feather */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#FFD700" />
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
      
      {/* Flute */}
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}

