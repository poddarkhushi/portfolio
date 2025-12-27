import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Html } from '@react-three/drei'


function Gizmo() {
return (
<Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
<mesh>
<torusKnotGeometry args={[0.9, 0.3, 128, 32]} />
<meshStandardMaterial metalness={0.9} roughness={0.15} color={'#0ea5a4'} />
</mesh>
</Float>
)
}


export default function ThreeScene(){
return (
<Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
<ambientLight intensity={0.6} />
<directionalLight position={[5, 5, 5]} intensity={1} />
<Suspense fallback={null}>
<Gizmo />
<Environment preset="studio" />
</Suspense>
<OrbitControls autoRotate={false} enablePan={false} />
</Canvas>
)
}