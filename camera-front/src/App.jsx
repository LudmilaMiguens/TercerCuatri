import { useEffect, useState } from 'react'
import './Card.css'
import './App.css'
import { getCamera } from '../api/ApiCamera';
import { CameraCard } from './Card-camera';
import { Modal } from './modal';
import './modal.css'

function App() {
  const [cameras, setCameras] = useState([]);
  const [selecCamera, setSelecCamera] = useState(null);

  useEffect(() => {
    getCamera()
      .then((res) => res.json())
      .then((data) => setCameras(data));
  }, []);

  const openModal = (camera) =>{
    setSelecCamera(camera);
  }

  const closeModal = () => {
    setSelecCamera(null);
  }

  return (
    <>
      <div>
        <h1>Camaras</h1>
 
          <div className='card-container'>
             {cameras.map((camera) => (<CameraCard camera={camera} key= {camera.id}
          openModal={() => openModal(camera)} 
          />
          ))}
          </div>
          {selecCamera && <Modal camera={selecCamera}closeModal={closeModal}/>
          }
          </div>


    </>
  )
}

export default App
