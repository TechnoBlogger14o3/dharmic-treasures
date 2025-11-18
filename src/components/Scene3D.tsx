import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Krishna from './Krishna'
import Arjuna from './Arjuna'

export default function Scene3D() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Krishna position={[-2, 0, 0]} />
      <Arjuna position={[2, 0, 0]} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  )
}

