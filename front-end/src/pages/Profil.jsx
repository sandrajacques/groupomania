import React from 'react'
import { useEffect, useState } from 'react'

export default function Profil() {
  const [profil, setProfil] = useState({});

  useEffect(() => {
    fetch('http://localhost:3001/api/user/profil/1')
        .then(res => res.json())
        .then(data => setProfil (data))
        .catch(err => alert(err))
}, [])
  return (
    <div>
      <h1>profil</h1>
      <p>{JSON.stringify(profil)}</p>
    </div>
  )
}
