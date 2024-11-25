import { useState } from 'react';
// import './App.css';


// importera komponenterna
import Movies from './components/Movies';
import Shows from './components/Shows';
import Seats from './components/Seats';
import Booking from './components/Booking';

function App() {
  // state variables som kommer användas i olika komponenter
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedShow, setSelectedShow] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [booking, setBooking] = useState(false);

  return (
    <>

      <Movies
        // skicka med nödvändiga props till komponenten
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />

      {selectedMovie && (
        <Shows
          selectedMovie={selectedMovie}
          setSelectedShow={setSelectedShow}
        />
      )}

      {selectedMovie && selectedShow && (
        <Seats
          selectedMovie={selectedMovie}
          selectedShow={selectedShow}
          setName={setName}
          setEmail={setEmail}
          setSelectedSeats={setSelectedSeats}
          setTotalPrice={setTotalPrice}
          setBooking={setBooking}
        />
      )}

      {/* props som kör Booking komponenten om villkoren uppfylls */}
      {selectedMovie && selectedShow && name && email && selectedSeats.length > 0 && booking && (
        <Booking
          // props som skickas till booking komponenten om villkoren är uppfyllda
          name={name}
          email={email}
          seats={selectedSeats}
          totalPrice={totalPrice}
          selectedMovie={selectedMovie}
          selectedShow={selectedShow}
          booking={booking}
        />
      )}

    </>
  );
}

export default App;
