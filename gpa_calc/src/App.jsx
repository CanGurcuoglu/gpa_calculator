import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

import derslerYAP from './data/derslerYAP.json';
import derslerBIL from './data/derslerBIL.json';
import derslerELE from './data/derslerELE.json';
import derslerMAK from './data/derslerMAK.json';
import derslerEND from './data/derslerEND.json';

const allMajors = {
  YAP: derslerYAP,
  BIL: derslerBIL,
  ELE: derslerELE,
  MAK: derslerMAK,
  END: derslerEND
};

function App({ major, baseGPA = 0, baseCredits = 0 }) {
  const routeParams = useParams();
  const selectedMajor = major || routeParams.major;
  const derslerData = allMajors[selectedMajor] || [];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grade, setGrade] = useState("AA");
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const gradeToGPA = {
    "AA": 4.0, "BA": 3.5, "BB": 3.0, "CB": 2.5,
    "CC": 2.0, "DC": 1.5, "DD": 1.0, "FF": 0.0
  };

  const uniqueCoursesMap = new Map();
  derslerData.forEach(course => {
    if (!uniqueCoursesMap.has(course.code)) {
      uniqueCoursesMap.set(course.code, course);
    }
  });
  const uniqueCourses = Array.from(uniqueCoursesMap.values());

  const calculateAverage = (gradesList) => {
    let totalPoints = baseGPA * baseCredits;
    let totalCredits = baseCredits;

    gradesList.forEach(item => {
      const gpa = gradeToGPA[item.grade];
      totalPoints += gpa * item.credit;
      totalCredits += item.credit;
    });

    const avg = totalPoints / totalCredits;
    setAverage(totalCredits === 0 ? null : avg.toFixed(2));
  };

  const handleAdd = () => {
    if (!selectedCourse || !grade) return;

    const course = uniqueCourses.find(d => d.code === selectedCourse);
    if (!course) return;

    const credit = parseFloat(course.credit.replace(",", "."));

    const updatedGrades = grades.filter(item => item.code !== selectedCourse);
    updatedGrades.push({
      code: course.code,
      name: course.name,
      credit: credit,
      grade: grade
    });

    setGrades(updatedGrades);
    setSearchTerm("");
    setSelectedCourse(null);
    calculateAverage(updatedGrades);
  };

  const handleDelete = (codeToDelete) => {
    const newGrades = grades.filter(item => item.code !== codeToDelete);
    setGrades(newGrades);
    calculateAverage(newGrades);
  };

  const filteredCourses = uniqueCourses.filter(course => {
    const search = searchTerm.toLowerCase().trim();
    const code = course.code.toLowerCase();

    if (code.startsWith(search)) return true;

    if (/^\d+$/.test(search)) {
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
            <li key={`${item.code}-${index}`}>
              {item.code} - {item.name} | {item.credit} kredi | {item.grade}
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.code)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      {average !== null && (
        <div className="result">
          Ortalaman: {average}
        </div>
      )}
    </div>
  );
}

export default App;