

import React, { useContext, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../styles/start.css';

function StartPage({ onStart }) {
  const { setUser, setOptions } = useContext(QuizContext);
  const [name, setName] = useState('');
  const [randomOrder, setRandomOrder] = useState(false);
  const [timer, setTimer] = useState(10);  // taks , timp 10 sec , cum e spus 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Introduceți numele!');
    setUser(name.trim());
    setOptions({ random: randomOrder, timer: Number(timer) });
    onStart(); 
  };

  return (
    <div className="start-container">
      <h1>Aplicație Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nume:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Ordine aleatorie a întrebărilor:
          <input
            type="checkbox"
            checked={randomOrder}
            onChange={() => setRandomOrder(!randomOrder)}
          />
        </label>

        <label>
          Timp pe întrebare (secunde):
          <input
            type="number"
            min="0"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
          />
        </label>

        <button type="submit">Începe Quiz-ul</button>
      </form>
    </div>
  );
}

export default StartPage;
