import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Array<string>>([]);

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    setMessages([...messages, input.value]);
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
            {message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSend} className="m-2">
        <input 
          type
