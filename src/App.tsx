import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import CharacterListPage from './components/CharacterListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/characters" element={<CharacterListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
