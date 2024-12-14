import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import CatViewer from './CatViewer';
import WorkingHours from './WorkingHours';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 50,
            background: 'rgba(255,255,255,.5)',
          }}
        >
          <ul>
            <li>
              <NavLink to="/cat-viewer">CatViewer</NavLink>
            </li>
            <li>
              <NavLink to="/working-hour">WorkingHours</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cat-viewer" element={<CatViewer />} />
          <Route path="/working-hour" element={<WorkingHours />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
