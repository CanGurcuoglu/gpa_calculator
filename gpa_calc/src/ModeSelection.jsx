import { useNavigate, useParams } from 'react-router-dom';
import './ModeSelection.css';

function ModeSelection() {
  const { major } = useParams();
  const navigate = useNavigate();

  return (
    <div className="mode-container">
      <h2>Hesaplama Yöntemini Seç</h2>
      <div className="mode-buttons">
        <button onClick={() => navigate(`/gpa/new/${major}`)}>
          Sıfırdan Ortalama Hesapla
        </button>
        <button onClick={() => navigate(`/gpa/existing/${major}`)}>
          Mevcut Ortalama ile Hesapla
        </button>
      </div>
    </div>
  );
}

export default ModeSelection;
