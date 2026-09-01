import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/inter';
import '@fontsource-variable/newsreader';
// The hero and section headings set an italic serif; without the italic face
// the browser would synthesise a slanted roman, which looks wrong at display size.
import '@fontsource-variable/newsreader/wght-italic.css';
import '@fontsource-variable/jetbrains-mono';
import './styles/app.css';

import Home from './components/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
