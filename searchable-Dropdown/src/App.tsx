import './App.css';
import Dropdown from './components/Dropdown';
import { Items } from './constants/data';

function App() {
  return (
    <>
      <Dropdown data={Items} />
    </>
  );
}

export default App;
