import { useState } from 'react';
import './App.css';
import derslerData from './data/dersler.json';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grade, setGrade] = useState("AA");
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Remove duplicate courses from derslerData
  const uniqueCoursesMap = new Map();
  derslerData.forEach(course => {
    if (!uniqueCoursesMap.has(course.code)) {
      uniqueCoursesMap.set(course.code, course);
    }
  });
  const uniqueCourses = Array.from(uniqueCoursesMap.values());

  const handleAdd = () => {
    if (!selectedCourse || !grade) return;

    const course = uniqueCourses.find(d => d.code === selectedCourse);
    if (!course) return;

    setGrades([...grades, {
      code: course.code,
      name: course.name,
      credit: parseFloat(course.credit.replace(",", ".")),
      grade: grade
    }]);
    setSearchTerm("");
    setSelectedCourse(null);
  };

  const handleCalculate = () => {
    if (grades.length === 0) return;

    const gradeToGPA = {
      "AA": 4.0, "BA": 3.5, "BB": 3.0, "CB": 2.5,
      "CC": 2.0, "DC": 1.5, "DD": 1.0, "FF": 0.0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach(item => {
      const gpa = gradeToGPA[item.grade];
      totalPoints += gpa * item.credit;
      totalCredits += item.credit;
    });

    const avg = totalPoints / totalCredits;
    setAverage(avg.toFixed(2));
  };

  // Enhanced filtering logic with numeric prefix matching
  const filteredCourses = uniqueCourses.filter(course => {
    const search = searchTerm.toLowerCase().trim();
    const code = course.code.toLowerCase();
    
    // Check if code starts with the search term (case insensitive)
    if (code.startsWith(search)) {
      return true;
    }
    
    // If the search term is numeric, check if the numeric part of the code starts with it
    if (/^\d+$/.test(search)) {
      // Extract the numeric part from the course code
      const numericMatch = code.match(/\d+/);
      if (numericMatch && numericMatch[0].startsWith(search)) {
        return true;
      }
    }
    
    return false;
  });

  return (
    <div className="container">
      <h1>Not Ortalaması Hesaplayıcı</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="dropdown">
          <input
            type="text"
            className="dropdown-input"
            placeholder="Ders kodu girin"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <li
                      key={course.code}
                      onClick={() => {
                        setSelectedCourse(course.code);
                        setSearchTerm(course.code);
                        setDropdownOpen(false);
                      }}
                    >
                      {course.code} - {course.name} ({course.credit} kredi)
                    </li>
                  ))
                ) : (
                  <li className="no-result">Sonuç bulunamadı</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          {["AA", "BA", "BB", "CB", "CC", "DC", "DD", "FF"].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <button type="button" onClick={handleAdd}>Ekle</button>
      </form>

      <div>
        <h3>Girilen Dersler:</h3>
        <ul className="grade-list">
  {grades.map((item, index) => (
    <li key={`${item.code}-${index}`} className="grade-item">
      {item.code} - {item.name} | {item.credit} kredi | {item.grade}
      <button
        className="delete-btn"
        onClick={() => {
          const updatedGrades = grades.filter((_, i) => i !== index);
          setGrades(updatedGrades);
        }}
      >
        X
      </button>
    </li>
  ))}
</ul>
      </div>

      <button onClick={handleCalculate} style={{ marginTop: "1rem" }}>
        Ortalamayı Hesapla
      </button>

      {average !== null && (
        <div className="result">
          Ortalaman: {average}
        </div>
      )}
    </div>
  );
}

export default App;