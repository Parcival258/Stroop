import React, { useState } from 'react'

const Profile:React.FC = () => {
    const [name, SetName] = useState(``);
    const [score, setScore] = useState(0);
  return (
    <div>Profile</div>
  )
}

export default Profile