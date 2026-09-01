import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/inter';
import '@fontsource-variable/newsreader';
// The hero and section headings set an italic serif; without the italic face
// the browser would synthesise a slanted roman, which looks wrong at display size.
import '@fontsource-variable/newsreader/wght-italic.css';
import '@fontsource-variable/jetbrains-mono';
import './styles/app.css';

import CaseStudy from './components/CaseStudy.jsx';

// Each case-study page is its own HTML entry and names its project on the
// root element, so one bundle serves all of them without a router.
const root = document.getElementById('root');

createRoot(root).render(
  <StrictMode>
    <CaseStudy slug={root.dataset.project} />
  </StrictMode>
);
