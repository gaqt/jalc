/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';

import './index.css';
import Home from './components/Home';
import Layout from './Layout';
import Bmi from './components/BMI';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => (
  <Router root={Layout}>
    <Route path="/" component={Home} />
    <Route path="/bmi" component={Bmi} />
  </Router>
), root!);
