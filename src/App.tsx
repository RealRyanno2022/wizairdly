import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

type Message = {
  content: string;
  from: 'user' | 'ai';
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);


  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const userMessage = input.value;
    setMessages([...messages, {content: userMessage, from: 'user'}]);
    
    try {
        const response = await axios.post('http://localhost:5000/message', { message: userMessage });
        const aiMessage = response.data.message;
        setMessages([...messages, {content: userMessage, from: 'user'}, {content: aiMessage, from: 'ai'}]);
      } catch (error) {
          console.error(error);
      }

    input.value = '';
};


  return (
    <div className="App h-screen bg-gray-200 flex flex-col">
      <header className="text-white bg-blue-600 p-4 text-center">
        <h1 className="text-4xl">ChatGPT Replica</h1>
      </header>
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message, index) => (
          <p key={index} className="my-2 p-2 bg-white rounded shadow">
            {message.content} ({message.from})
          </p>
        ))}
      </div>
      <form onSubmit={handleSend} className="m-2">
        <input 
          type="text" 
          className="w-full p-2 rounded shadow"
          placeholder="Type your message here" 
        />
      </form>
    </div>
  );
}

export default App;
