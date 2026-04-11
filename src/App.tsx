import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import QuizPage from './components/QuizPage';
import CharacterListPage from './components/CharacterListPage';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/characters" element={<CharacterListPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
