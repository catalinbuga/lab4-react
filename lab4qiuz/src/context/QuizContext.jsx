import { createContext, useState, useCallback } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [options, setOptions] = useState({ random: false, timer: 0 });
  const [scoreHistory, setScoreHistory] = useState(() => {
    const data = localStorage.getItem('quizScores');
    return data ? JSON.parse(data) : [];
  });

  const addScore = useCallback((username, score) => {
    setScoreHistory(prev => {
      const existing = prev.find(entry => entry.username === username);
      let updated;

      if (existing) {
        if (score > existing.score) {
          updated = prev.map(entry =>
            entry.username === username ? { username, score } : entry
          );
        } else {
          updated = prev;
        }
      } else {
        updated = [...prev, { username, score }];
      }

      localStorage.setItem('quizScores', JSON.stringify(updated));
      return updated;
    });
  }, []);

  
  const clearScores = useCallback(() => {
    localStorage.clear();
    setScoreHistory([]);
    setUser(''); 
    setOptions({ random: false, timer: 0 }); 
  }, []);

  return (
    <QuizContext.Provider
      value={{
        user,
        setUser,
        options,
        setOptions,
        scoreHistory,
        addScore,
        clearScores,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
