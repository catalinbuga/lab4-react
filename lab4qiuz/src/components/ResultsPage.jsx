import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../styles/results.css';

function ResultsPage({ data, onReset }) {
  const { user, addScore, scoreHistory } = useContext(QuizContext);

  useEffect(() => {
    if (data) {
      addScore(user, data.score);
    }
  }, [data, addScore, user]);

  return (
    <div className="results-container">
      <h2>Rezultate finale</h2>
      <p>{user}, ai răspuns corect la {data.score} din {data.total} întrebări.</p>

      <h3>Istoric scoruri</h3>
      <table>
        <thead>
          <tr>
            <th>Utilizator</th>
            <th>Scor</th>
          </tr>
        </thead>
        <tbody>
          {scoreHistory.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onReset}>Reia quiz-ul</button>
    </div>
  );
}

export default ResultsPage;
