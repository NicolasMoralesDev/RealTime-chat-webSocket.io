import './App.css'
import io from 'socket.io-client'
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:4000');


function App() {

  const [mensage, setMensage] = useState('');
  const [mensages, setMensages] = useState([{
    body:'',
    from:'',
}]);


  const recibirMensage = (e) => {

    e.preventDefault()
    socket.emit('message', mensage)

    const newMessage = {
      body: mensage,
      from: "yo",      /* ggg */
    };
    setMensages([ newMessage, ...mensages])
    setMensage('')
  };

  useEffect(() => {

    const receiveMessage = (mensage) => {
      setMensages([mensage, ...mensages]);
    };

   socket.on("message", receiveMessage);

    return()=>{
    socket.off("message", receiveMessage);
    
    }

  }, [mensages])
  

  return (
    <div className="h-screen bg-zinc-800 text-white flex-items-center justify-center">
    
       <Form onSubmit={recibirMensage} className="bg-zinc-900 p-10">
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Control className="border-2 bg-zinc-500 p-2 text-black w-full" type="text" value={mensage} onChange={e => setMensage(e.target.value)} placeholder="Escribe tu mensage..." />
      </Form.Group>
    </Form>
 <ul className='h-80 overflow-y-auto'>
 { mensages.map((element, index) => (
      <li key={index} className={` table p-2 my-2 text-sm rounder-md ${mensage.from === "yo" ? "bg-sky-700 ml-auto": "bg-black"}` }> 
        <p>{element.from} | {element.body}</p>
      </li>
      
    ))}
 </ul>
   
    </div>
  )
}

export default App
