import { useNavigate } from 'react-router-dom';
import './Home.css';

const majors = [
  { key: "YAP", name: "Yapay Zeka Mühendisliği" },
  { key: "BIL", name: "Bilgisayar Mühendisliği" },
  { key: "ELE", name: "Elektrik-Elektronik Mühendisliği" },
  { key: "MAK", name: "Makine Mühendisliği" },
  { key: "END", name: "Endüstri Mühendisliği" }
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Bölümünü Seç</h1>
      <ul className="major-list">
        {majors.map(major => (
          <li key={major.key}>
            <button onClick={() => navigate(`/gpa-mode/${major.key}`)}>
              {major.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;