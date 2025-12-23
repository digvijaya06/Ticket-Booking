import BookingForm from './components/BookingForm';
import { BookingProvider } from './context/BookingProvider';
import './App.css';

function App() {
  return (
    <BookingProvider>
      <div className="App">
        <BookingForm />
      </div>
    </BookingProvider>
  );
}

export default App;
