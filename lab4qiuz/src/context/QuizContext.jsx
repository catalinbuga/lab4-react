import { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [options, setOptions] = useState({ random: false, timer: 0 });
  const [scoreHistory, setScoreHistory] = useState(() => {
    const data = localStorage.getItem('quizScores');
    return data ? JSON.parse(data) : [];
  });

  
  const addScore = (username, score) => {
    const updated = [...scoreHistory, { username, score }];
    localStorage.setItem('quizScores', JSON.stringify(updated));
    setScoreHistory(updated);
  };

  return (
    <QuizContext.Provider value={{ user, setUser, options, setOptions, scoreHistory, addScore }}>
      {children}
    </QuizContext.Provider>
  );
};
