import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Model from './Model.js'
import { Suspense } from 'react'
import Placeholder from './Placeholder.js'
import Hamburger from './Hamburger.js'
import Fox from './Fox.js'
import  Atom2 from './Atom2.js'
import { MeshNormalMaterial, MeshStandardMaterial, TorusGeometry } from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three';
export default function Experience()
{

        // const groupRef = useRef();
        const groupRef2 = useRef();
        const groupRef3 = useRef();

      
        // // This function will be called on each frame to update the rotation
        // useFrame(() => {
        //   if (groupRef.current) {
        //     // Rotate the group on each frame
        //     groupRef.current.rotation.x += 0.005;
        //     groupRef.current.rotation.y += 0.005;
        //     groupRef.current.rotation.z += 0.009;

        //     groupRef2.current.rotation.x += 0.003;
        //     groupRef2.current.rotation.y += 0.003;
        //     groupRef2.current.rotation.z += 0.009;


        //     groupRef3.current.rotation.x += 0.002;
        //     groupRef3.current.rotation.y += 0.002;
        //     groupRef3.current.rotation.z += 0.009;
 
        // }
        // }); 
    


        const groupRef = useRef();
        const groupRef1 = useRef();
        const elapsedTime = useRef(0);
      
        // This function will be called on each frame to update the rotation
        useFrame((state, delta) => {
          if (groupRef1.current) {
            // Rotate the group in x and y axes for the first 3 seconds
            if (elapsedTime.current <3) {
                // groupRef.current.rotation.z += 0.005;
                // groupRef2.current.rotation.z += 0.005;
                // groupRef3.current.rotation.z += 0.005;
                groupRef1.current.rotation.y += 0.025;


            } else {
              // After 3 seconds, keep rotating in the z axis
              // groupRef.current.rotation.x += 0.005;
              // groupRef.current.rotation.y += 0.005;
// 
              //  groupRef2.current.rotation.x += 0.003;
              //  groupRef2.current.rotation.y += 0.003;

            // groupRef3.current.rotation.x += 0.002;
            // groupRef3.current.rotation.y += 0.002;

            groupRef1.current.rotation.x += 0.042;
            // groupRef1.current.rotation.z += 0.042;
            groupRef1.current.rotation.y += 0.025;

            }
      
            // Update the elapsed time
            elapsedTime.current += delta;

          
          }
        });




    //-------------------------

// const Neucleus  = [];

// const SphereOfSpheres = ({ sphereCount }) => {
//   const sphereGroup = useRef();

//   const createSphere = (position, color) => {
//     return (
//       <mesh position={position} scale={5} key={position.toString()}>
//         <sphereGeometry args={[0.1, 32, 32]} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//     );
//   };

//   const createSpheres = () => {
//     const spheres = [];
//     for (let i = 0; i < sphereCount; i++) {
//       const phi = Math.acos(-1 + Math.random() * 2);
//       const theta = Math.random() * 2 * Math.PI;
//       const radius = Math.cbrt(Math.random()) * 0.5; // Use cubic root for more even distribution
//       const color = i % 2 === 0 ? 0xff0000 : 0x000000; // Alternate between red and black
//       const x = radius * Math.sin(phi) * Math.cos(theta)*1.4;
//       const y = radius * Math.sin(phi) * Math.sin(theta)*1.4;
//       const z = radius * Math.cos(phi)*1.4*Math.sin(theta);
//       spheres.push(createSphere([x, y, z], color));
//     }
//     return spheres;
//   };

//   return (
//     <group ref={sphereGroup}>
//       {createSpheres()}
//     </group>
//   );
// };







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

// config.map((x,index)=>{ console.log(index);- })

config.map((x,i)=>{ 

  // console.log(x);
  // console.log(i);

  return (
    <mesh scale={0.5}>
        <torusBufferGeometry args={[15+i*3, 0.1, 16, 100]} />
        <meshNormalMaterial />
      </mesh>
  )


 })

//  const Sphere = () => {
//   let x = 2;
//   let i = 1;
//   const angleIncrement = (Math.PI * 2) / x;
//   // console.log(angleIncrement);

//   // console.log(x);

//   const radius = (15 + i * 3) / 2;
//   const spheres = [];

//   for (let num = 1; num <= x; num++) {
//     console.log(num * angleIncrement);
//     const angle = num * angleIncrement;
//     const xPos = radius * Math.cos(angle);
//     const zPos = radius * Math.sin(angle);

//     spheres.push(
//       <mesh scale={0.04} position={[xPos, 0, zPos]} key={num}>
//         <sphereBufferGeometry args={[15, 32, 16]} />
//         <meshNormalMaterial />
//       </mesh>
//     );
//   }

//   return spheres;
// };


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

  
useFrame((state, delta) => {
  setElapsedTime((prev) => prev + delta);

  // if(elapsedTime>9){ setElapsedTime(0)}

  const frameRate = 143.7; // Frames per second
  const duration = 5; // Duration for two complete rotations in seconds

  const rotationSpeed = (2 * Math.PI) / (frameRate * duration);

  groupRefs.forEach((groupRef, i) => {
    const axis = new THREE.Vector3(0, 1, 0);

    if (elapsedTime < 3) {
      // Rotate only in X-axis for the first 3 seconds
      groupRef.current.rotateOnAxis(axis, 0.01);
    } else if (elapsedTime < 3 + duration) {
      // Rotate in both X and Y axes after 3 seconds
      const angle = i * 60 * (Math.PI / 180); // Convert 60 degrees to radians
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      const customAxis = new THREE.Vector3(x, 0, y);
      groupRef.current.rotateOnAxis(customAxis, rotationSpeed);
    } else {
      // Stop the rotation after two complete revolutions
      const targetRotation = 2 * Math.PI * 2;
      const currentRotation = groupRef.current.rotation.y % (2 * Math.PI);
      const remainingRotation = targetRotation - currentRotation;

      if (remainingRotation > rotationSpeed) {
        groupRef.current.rotateOnAxis(axis, rotationSpeed);
      } else {
        // Snap to the target rotation when close enough
        groupRef.current.rotateOnAxis(axis, remainingRotation);
      }
    }
  });
});

  return config.map((x,i)=>{ 



    // console.log(x);

    const angleIncrement = (Math.PI * 2) / x;
    const spheres = [];

    // sphere() 
  
     
     
      // console.log(angleIncrement);
    
      // console.log(x);
    
      const radius = (15 + i * 3) / 2;
    
      for (let num = 1; num <= x; num++) {
        // console.log(num * angleIncrement);
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
    
    



    


    // console.log(i);
  
    return ( <group  ref={groupRefs[i]} key={i} >
      <mesh scale={0.5} rotation={[Math.PI/2,0,0]} >
          <torusBufferGeometry args={[15+i*3, 0.1, 16, 100]} />
          <meshStandardMaterial />
        </mesh>

  {/* <Sphere/> */}
  {spheres}

        </group>

    )
  
  
   })

}



    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-normalBias={ 0.04 } />
        <ambientLight intensity={ 0.5 } />
        {/* <Atom2 scale={5}  /> */}
        
{/* 
        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}

        {/* <Suspense fallback={ <Placeholder position-y={ 0.5 } scale={ [ 2, 3, 2 ] } /> }> */}
            {/* <Hamburger scale={ 0.35 } /> */}
        {/* </Suspense> */}


{/* <Sphere/> */}


        {/* <mesh scale={0.1} >
  <sphereBufferGeometry args={[8, 32, 16]}  />
  <meshNormalMaterial />
</mesh> */}

{/* <mesh scale={0.1} position={[0.4,0.4,0.4]} >
  <sphereBufferGeometry args={[8, 32, 16]}   />
  <meshNormalMaterial />
</mesh>
<mesh scale={0.1} position={[0.4,0.4,-0.4]} >
  <sphereBufferGeometry args={[8, 32, 16]}   />
  <meshNormalMaterial />
</mesh> */}
{/* 
        <mesh scale={0.1} >
  <sphereBufferGeometry args={[15, 32, 16]}  />
  <meshNormalMaterial />
</mesh>

<mesh scale={0.04} position={[5,5,5]} >
  <sphereBufferGeometry args={[15, 32, 16]}  />
  <meshNormalMaterial />
</mesh> */}

{/* {spheres} */}
{/* <mesh scale={0.5}>

<torusBufferGeometry args={[ 10, 0.1, 16, 100]}/>
<meshNormalMaterial/>

</mesh>

<mesh scale={0.5} rotation-x={90} >

<torusBufferGeometry args={[ 10, 0.1, 16, 100]}/>
<meshNormalMaterial/>

</mesh>


<mesh scale={0.5} rotation-x={-90} >

<torusBufferGeometry args={[ 10, 0.1, 16, 100]}/>
<meshNormalMaterial/>

</mesh> */}
      {/* <SphereOfSpheres sphereCount={10} /> */}

      <group  scale={5}  >

      <Nucleus protonCount={20} neutronCount={20} />
      </group>
<Shells/>
 
        {/* <Fox /> */}

    </>
}