

import React, { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [step, setStep] = useState('start');
  const [scoreData, setScoreData] = useState(null);

  return (
    <QuizProvider>
      <div className='app'>
        <ThemeToggle />
        {step === 'start' && <StartPage onStart={() => setStep('quiz')} />}
        {step === 'quiz' && (
          <QuizPage
            onFinish={(score) => {
              setScoreData(score);
              setStep('result');
            }}
          />
        )}
        {step === 'result' && (
          <ResultsPage data={scoreData} onReset={() => setStep('start')} />
        )}
      </div>
    </QuizProvider>
  );
}

export default App;
