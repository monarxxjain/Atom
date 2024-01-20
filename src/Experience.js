import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { MeshNormalMaterial, MeshStandardMaterial, TorusGeometry } from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three';
export default function Experience()
{

        const groupRef2 = useRef();
        const groupRef3 = useRef();
    


        const groupRef = useRef();
        const groupRef1 = useRef();
        const elapsedTime = useRef(0);
      
        // This function will be called on each frame to update the rotation
        useFrame((state, delta) => {
          if (groupRef1.current) {
            // Rotate the group in x and y axes for the first 3 seconds
            if (elapsedTime.current <3) {
                groupRef1.current.rotation.y += 0.025;


            } else {
            groupRef1.current.rotation.x += 0.042;
            groupRef1.current.rotation.y += 0.025;

            }
      
            // Update the elapsed time
            elapsedTime.current += delta;

          
          }
        });










const Nucleus = ({ protonCount, neutronCount }) => {
  const nucleusGroup = useRef();
  
  const createParticle = (position, color,opacity) => {

    const materialProps = {
      color,
      roughness: 0.5,
      metalness: 0.5,
      transparent: true,
      opacity:opacity // Adjust transparency as needed
    };
    return ( <>
      <mesh position={position} key={position.toString()}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial {...materialProps} />

      </mesh>
      <mesh position={position} key={position.toString()}>
        <sphereGeometry args={[0.03, 32, 32]} />
        <meshStandardMaterial color={color}  />

      </mesh>
      </>
    );
  };

  const distributeParticles = (particleCount, isProton) => {
    const particles = [];
    // const radius = 1; // Radius of the nucleus
    
    const radius = Math.max(protonCount, neutronCount) <=20 ?  Math.max(protonCount, neutronCount) * 0.02 :  Math.max(protonCount, neutronCount)*0.01; // Adjust the multiplier as needed
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));



    for (let i = 0; i < particleCount; i++) {
      const theta = goldenAngle * i;
      const y = isProton ? ((i / particleCount) * 2 - 1) * radius * 0.7 : ((i / particleCount) * 2 - 1) * radius;
      
      
      const radiusOnSphere = Math.sqrt(radius * radius - y * y);
      const x = Math.cos(theta) * radiusOnSphere;
      const z = Math.sin(theta) * radiusOnSphere;

      const color = isProton ?  "#fc0505" : "#0073ff"; // Red for protons, black for neutrons
      const opacity = isProton ?  1 : 0.6; // Red for protons, black for neutrons

      particles.push(createParticle([x, y, z], color,opacity));
    }

    return particles;
  };

  return (
    <group ref={nucleusGroup}>
      {distributeParticles(protonCount, true)} {/* Protons */}
      {distributeParticles(neutronCount, false)} {/* Neutrons */}
    </group>
  );
};











//----------------------------


const config = [2,8,18,18,32,32];


config.map((x,i)=>{ 


  return (
    <mesh scale={0.5}>
        <torusBufferGeometry args={[15+i*3, 0.1, 16, 100]} />
        <meshNormalMaterial />
      </mesh>
  )


 })



const Shells = ()=>{

  const angleInDegrees = 60;
const rotations = 2;
const speed = 0.02;

// Convert angle to radians
const angleInRadians = (angleInDegrees * Math.PI) / 180;

// Calculate time for 2 rotations
const time = (Math.PI / speed) * rotations;

console.log(`Time for 2 rotations: ${time} seconds`);

  const groupRefs = config.map(() => useRef());
  const [elapsedTime, setElapsedTime] = useState(0);
  const fixedDelta = 0.016;
  
  useFrame((state, delta) => {
    setElapsedTime((prev) => prev + fixedDelta);
    if(elapsedTime>9){  setElapsedTime(0)}
  
    const duration = 5; // Duration for two complete rotations in seconds
  
    // Calculate rotation speed based on time, not frame rate
    const rotationSpeed = (2 * Math.PI) / duration;
  
    groupRefs.forEach((groupRef, i) => {
      const axis = new THREE.Vector3(0, 1, 0);
  
      if (elapsedTime < 3) {
        // Rotate only in X-axis for the first 3 seconds
        groupRef.current.rotateOnAxis(axis, 0.01);
      } else if (elapsedTime < 3 + duration) {
        delta = 0.017;
        // Rotate in both X and Y axes after 3 seconds
        const angle = i * 60 * (Math.PI / 180); // Convert 60 degrees to radians
        const x = Math.cos(angle);
        const y = Math.sin(angle);
        const customAxis = new THREE.Vector3(x, 0, y);
      
        // Track the accumulated rotation on the custom axis
        if (!groupRef.customAxisRotation) {
          groupRef.customAxisRotation = 0;
        }
      
        const previousRotation = groupRef.customAxisRotation; // Store previous rotation for logging
      
        groupRef.customAxisRotation += rotationSpeed * delta;
        groupRef.current.rotateOnAxis(customAxis, rotationSpeed * fixedDelta);
      
        const rotationMade = groupRef.customAxisRotation - previousRotation;
        console.log(rotationSpeed);
        console.log(`delta ${delta}`)
      
        console.log(`Group ${i + 1} Rotation: ${rotationMade} radians`);
      }
      else {
        groupRef.current.rotateOnAxis(axis, 0.01);

      }
    });
  });
  
  
  

  return config.map((x,i)=>{ 



    const angleIncrement = (Math.PI * 2) / x;
    const spheres = [];
      const radius = (15 + i * 3) / 2;
    
      for (let num = 1; num <= x; num++) {
        const angle = num * angleIncrement;
        const xPos = radius * Math.cos(angle);
        const zPos = radius * Math.sin(angle);
    
        spheres.push(
          <mesh scale={0.02} position={[xPos, 0, zPos]} key={num}>
            <sphereBufferGeometry args={[15, 32, 16]} />
            <meshStandardMaterial  color="#2ec27e" />
          </mesh>
        );
      }
    
  
    return ( <group  ref={groupRefs[i]} key={i} >
      <mesh scale={0.5} rotation={[Math.PI/2,0,0]} >
          <torusBufferGeometry args={[15+i*3, 0.1, 16, 100]} />
          <meshStandardMaterial />
        </mesh>

  {spheres}

        </group>

    )
  
  
   })

}



    return <>

        <Perf position="top-left" />

        <OrbitControls 
        enablePan={false}
        minDistance={25}
        maxDistance={70}
        makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
        <ambientLight intensity={ 0.5 } />
      <group  scale={5}  >

      <Nucleus protonCount={20} neutronCount={20} />
      </group>
<Shells/>
 

    </>
}