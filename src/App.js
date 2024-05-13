import logo from './logo.svg';
import './App.css';
import TestComponent from './components/TestComponent';
import CurrencyConverter from './components/CurrencyConverter';
import Timer from './components/Timer';
import PropsApp from './components/DestructuringProps';

function App() {
  return (
    <div className="App">
      {/* <TestComponent></TestComponent> */}
      {/* <Timer></Timer> */}
      {/* <CurrencyConverter></CurrencyConverter> */}
      <PropsApp></PropsApp>
    </div>
  );
}

export default App;
