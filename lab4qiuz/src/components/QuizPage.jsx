import React, { useContext, useEffect, useState, useCallback } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../styles/quiz.css';

const QuizPage = ({ onFinish }) => {
  const { options } = useContext(QuizContext);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(options.timer);

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => {
        const quizData = options.random ? [...data].sort(() => Math.random() - 0.5) : data;
        setQuestions(quizData);
      });
  }, [options.random]);

 

  const handleAnswer = (ans) => {
    setSelected(ans);
    if (ans === questions[index].answer) setScore(score + 1);
  };

  const handleNext = useCallback(() => {
    setSelected(null);
    setTimeLeft(options.timer);
    if (index + 1 < questions.length) {
      setIndex(prev => prev + 1);
    } else {
      onFinish({ score, total: questions.length, questions}); 
    }
  }, [index, options.timer, onFinish, questions, score]);
  
  useEffect(() => {
    if (options.timer > 0 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, handleNext, options.timer]);
  
  if (questions.length === 0) return <p>Se încarcă...</p>;

  const q = questions[index];

  return (
    <div className='quiz-page'>
      <h3>{q.category} - {q.difficulty}</h3>
      <p>{q.question}</p>
      <div className='options'>
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={selected === opt ? 'selected' : ''}
            onClick={() => !selected && handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {options.timer > 0 && <p>Timp rămas: {timeLeft}s</p>}
      {selected && <button onClick={handleNext}>Următoarea</button>}
    </div>
  );
};

export default QuizPage;
