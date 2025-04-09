import { useState } from 'react';
import { useParams } from 'react-router-dom';
import App from './App';
import './ExistingGPA.css';

function ExistingGPA() {
  const { major } = useParams();
  const [existingGPA, setExistingGPA] = useState('');
  const [existingCredits, setExistingCredits] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingGPA && existingCredits) {
      setSubmitted(true);
    }
  };

  return (
    <div className="existing-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="existing-form">
          <h2>Mevcut Ortalama ile Hesapla</h2>
          <input
            type="number"
            step="0.01"
            placeholder="Mevcut Ortalama"
            value={existingGPA}
            onChange={(e) => setExistingGPA(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.1"
            placeholder="Toplam Kredi"
            value={existingCredits}
            onChange={(e) => setExistingCredits(e.target.value)}
            required
          />
          <button type="submit">Devam Et</button>
        </form>
      ) : (
        <App major={major} baseGPA={parseFloat(existingGPA)} baseCredits={parseFloat(existingCredits)} />
      )}
    </div>
  );
}

export default ExistingGPA;