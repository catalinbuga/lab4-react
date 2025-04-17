import React, { useContext, useEffect, useState, useCallback } from 'react';
import { QuizContext } from '../context/QuizContext';
import questions from "../../public/questions.json";
import '../styles/quiz.css'; 

const QuizPage = ({ onFinish }) => {
  const { options } = useContext(QuizContext);
  const [questionsData, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(options.timer);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const quizData = options.random ? [...questions].sort(() => Math.random() - 0.5) : questions;
    setQuestions(quizData);
  }, [options.random]);

  const handleAnswer = (ans) => {
    if (!answered) {
      setSelected(ans);
      if (ans === questionsData[index].answer) setScore(score + 1);
      setAnswered(true);
    }
  };

  const handleNext = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setTimeLeft(options.timer);
    if (index + 1 < questionsData.length) {
      setIndex(prev => prev + 1);
    } else {
      onFinish({ score, total: questionsData.length, questions: questionsData });
    }
  }, [index, options.timer, onFinish, questionsData, score]);

  useEffect(() => {
    if (answered) {
      const timeout = setTimeout(() => {
        handleNext();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [answered, handleNext]);

  useEffect(() => {
    if (options.timer > 0 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNext();
    }
  }, [timeLeft, handleNext, options.timer]);

  if (questionsData.length === 0) return <p>Se încarcă...</p>;

  const q = questionsData[index];

  return (
    <div className="quiz-page">
      <h3>{q.category} - {q.difficulty}</h3>
      <p>{q.question}</p>
      <div className="options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            className={`${selected === opt ? 'selected' : ''} ${answered ? (opt === q.answer ? 'correct' : (opt === selected ? 'incorrect' : '')) : ''}`}
            onClick={() => handleAnswer(opt)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {options.timer > 0 && <p>Timp rămas: {timeLeft}s</p>}
    </div>
  );
};

export default QuizPage;
