import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface ChapterCard3DProps {
  position: [number, number, number]
  chapterNumber: number
  onClick: () => void
}

export default function ChapterCard3D({ position, chapterNumber, onClick }: ChapterCard3DProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.05
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.5, 2, 0.1]} />
      <meshStandardMaterial
        color={chapterNumber % 2 === 0 ? '#F59E0B' : '#D97706'}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

