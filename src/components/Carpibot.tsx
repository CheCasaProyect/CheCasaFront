// import io from 'socket.io-client';
// import { useState, useEffect } from 'react';

// const socket = io('http://localhost:3001/carpibot');

// interface MenuOption {
//   id: string;
//   text: string;
// }

// const Chatbot = () => {
//   const [menu, setMenu] = useState<MenuOption[]>([]);
//   const [options, setOptions] = useState<MenuOption[]>([]);
//   const [response, setResponse] = useState<string>('');
//   const [selectedOption, setSelectedOption] = useState<string>('');

//   useEffect(() => {
//     socket.on('menu', (menu: MenuOption[]) => {
//       setMenu(menu);
//     });

//     socket.on('options', (options: MenuOption[]) => {
//       setOptions(options);
//     });

//     socket.on('response', (response: string) => {
//       setResponse(response);
//     });
//   }, []);

//   const handleChooseOption = (optionId: string) => {
//     socket.emit('chooseOption', optionId);
//   };

//   const handleGetResponse = (optionId: string) => {
//     socket.emit('response', optionId);
//   };

//   return (
//     <div>
//       <h1>Menú</h1>
//       <ul>
//         {menu.map((item) => (
//           <li key={item.id}>
//             <button onClick={() => handleChooseOption(item.id)}>{item.text}</button>
//           </li>
//         ))}
//       </ul>

//       <h1>Opciones</h1>
//       <ul>
//         {options.map((item) => (
//           <li key={item.id}>
//             <button onClick={() => handleGetResponse(item.id)}>{item.text}</button>
//           </li>
//         ))}
//       </ul>

//       <h1>Respuesta</h1>
//       <p>{response}</p>
//     </div>
//   );
// };

// export default Chatbot;