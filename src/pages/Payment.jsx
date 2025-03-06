import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Payment = ({ url }) => {
  useEffect(() => {
    const params = new URLSearchParams(url.split('?')[1]);

    // Haal de string uit de query
    const rawTicketType = params.get('ticketType');
    let ticketType = {};

    try {
      ticketType = JSON.parse(decodeURIComponent(rawTicketType));
    } catch (error) {
      console.error('Fout bij parsen ticketType:', error);
    }

    // Haal de andere queryparameters op
    const name = params.get('name');
    const phone = params.get('phone');
    const email = params.get('email');  // <-- Nieuw

    // Stuur gegevens naar backend
    fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketType, name, phone, email }) // Email meesturen
    })
      .then(() => {
        // Even wachten, dan door naar success
        setTimeout(() => {
          route('/success', true);
        }, 2000);
      });
  }, [url]);

  return (
    <div>
      <h1>Betaling verwerken...</h1>
      <p>Even geduld, we verwerken je bestelling.</p>
    </div>
  );
};

export default Payment;
