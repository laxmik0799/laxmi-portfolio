import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * The hero's 3D centerpiece — a "digital core":
 *   • a liquid, distorting inner sphere
 *   • a wireframe icosahedron shell
 *   • two orbit rings
 *   • a Fibonacci point-sphere (data cloud)
 *   • a handful of small floating geometric satellites
 * The whole group eases toward the cursor (tracked on window, so it
 * reacts even when the pointer is over the text).
 *
 * Loaded lazily (React.lazy) so three.js never blocks first paint.
 */

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return pointer
}

function PointSphere({ count, radius }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      const jitter = radius * (0.96 + Math.random() * 0.08)
      arr[i * 3] = Math.cos(theta) * r * jitter
      arr[i * 3 + 1] = y * jitter
      arr[i * 3 + 2] = Math.sin(theta) * r * jitter
    }
    return arr
  }, [count, radius])

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y -= dt * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#7dd3fc" transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Satellite({ position, geometry, color, speed = 1, scale = 0.16 }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.4 * speed
    ref.current.rotation.y += dt * 0.6 * speed
  })
  return (
    <Float speed={1.4 * speed} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.4} roughness={0.25} wireframe />
      </mesh>
    </Float>
  )
}

function Core({ reduced, mobile }) {
  const group = useRef()
  const shell = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const pointer = usePointer()

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const tx = pointer.current.y * 0.35
    const ty = pointer.current.x * 0.55
    // Smoothly ease toward the cursor (frame-rate independent damping).
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3, dt)
    g.position.x = THREE.MathUtils.damp(g.position.x, pointer.current.x * 0.15, 2, dt)
    g.position.y = THREE.MathUtils.damp(g.position.y, pointer.current.y * 0.1, 2, dt)

    if (reduced) return
    const t = state.clock.elapsedTime
    if (shell.current) {
      shell.current.rotation.y = t * 0.12
      shell.current.rotation.z = t * 0.05
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.25
    if (ringB.current) ringB.current.rotation.z = -t * 0.18
  })

  return (
    <group ref={group}>
      {/* Liquid inner core */}
      <mesh>
        <icosahedronGeometry args={[1.05, mobile ? 12 : 24]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#241066"
          emissiveIntensity={0.7}
          roughness={0.28}
          metalness={0.25}
          distort={reduced ? 0 : 0.38}
          speed={reduced ? 0 : 1.6}
        />
      </mesh>

      {/* Inner glow halo */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6d5bff" transparent opacity={0.07} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.18} />
      </mesh>

      {/* Orbit rings */}
      <group rotation={[Math.PI / 2.4, 0.2, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[2.25, 0.006, 8, 160]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
        </mesh>
      </group>
      <group rotation={[Math.PI / 1.7, -0.5, 0.3]}>
        <mesh ref={ringB}>
          <torusGeometry args={[2.55, 0.004, 8, 160]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
      </group>

      <PointSphere count={mobile ? 320 : 700} radius={2.9} />

      {/* Floating satellites */}
      <Satellite position={[2.4, 1.3, 0.4]} geometry={<octahedronGeometry args={[1, 0]} />} color="#a78bfa" />
      <Satellite position={[-2.5, -1.0, 0.6]} geometry={<tetrahedronGeometry args={[1, 0]} />} color="#22d3ee" speed={0.8} />
      <Satellite position={[-1.8, 1.8, -0.8]} geometry={<boxGeometry args={[1, 1, 1]} />} color="#60a5fa" speed={1.2} scale={0.12} />
      {!mobile && (
        <>
          <Satellite position={[1.9, -1.9, -0.4]} geometry={<dodecahedronGeometry args={[1, 0]} />} color="#818cf8" speed={0.9} />
          <Satellite position={[0.2, 2.7, -1.2]} geometry={<icosahedronGeometry args={[1, 0]} />} color="#67e8f9" speed={1.1} scale={0.11} />
        </>
      )}
    </group>
  )
}

export default function HeroScene({ reduced = false, mobile = false, active = true }) {
  return (
    <Canvas
      dpr={[1, mobile ? 1.3 : 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#a78bfa" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#22d3ee" />
      <pointLight position={[0, 0, -4]} intensity={20} color="#4f7cff" />
      <Core reduced={reduced} mobile={mobile} />
    </Canvas>
  )
}
