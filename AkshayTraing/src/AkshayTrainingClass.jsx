import React from 'react'

// Default export component
function AkshayTrainingClass() {
  return (
    <div>
      <h2>Akshay Training Class Component</h2>
      <p>This is the main training class component.</p>
      <p>Welcome to the React training session!</p>
    </div>
  )
}

// Named export component
export function AkshayDemo() {
  return (
    <div>
      <h3>Akshay Demo Component</h3>
      <p>This is a demo component for the training.</p>
    </div>
  )
}

// Named export function
export function testValue() {   
  return 7+8
}

export default AkshayTrainingClass