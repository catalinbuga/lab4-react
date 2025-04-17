import React, { useContext, useEffect, useRef } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../styles/results.css';

function ResultsPage({ data, onReset }) {
  const { user, addScore, scoreHistory, clearScores } = useContext(QuizContext);
  const scoreAdded = useRef(false);

  useEffect(() => {
    if (data && !scoreAdded.current) {
      addScore(user, data.score);
      scoreAdded.current = true;
    }
  }, [data, addScore, user]);

  return (
    <div className="results-container">
      <h2>Rezultate finale</h2>
      <p>{user}, ai răspuns corect la {data.score} din {data.total} întrebări.</p>

      <h3>Istoric scoruri</h3>
      {scoreHistory.length === 0 ? (
        <p>Nu există scoruri salvate.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Utilizator</th>
              <th>Scor</th>
            </tr>
          </thead>
          <tbody>
            {[...scoreHistory]
              .sort((a, b) => b.score - a.score)
              .map((entry, idx) => (
                <tr key={idx}>
                  <td>{entry.username}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <button onClick={onReset}> Reia quiz-ul</button>

      {/* Butonul care șterge scorurile din localStorage */}
      <button 
        onClick={() => {
          if (window.confirm("Sigur vrei să ștergi toate scorurile?")) {
            clearScores();
          }
        }} 
        className="reset-button">
        Șterge istoricul scorurilor
      </button>
    </div>
  );
}

export default ResultsPage;
