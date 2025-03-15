import './App.css';
import CurrencyConverter from './components/CurrencyConverter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Currency Converter</h1>
      </header>
      <main>
        <CurrencyConverter />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Currency Converter App</p>
      </footer>
    </div>
  );
}

export default App;