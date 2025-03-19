import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

// Wederom props aangeven
const Payment = ({ url }) => {

  // En uit de URL halen
  useEffect(() => {
    const params = new URLSearchParams(url.split('?')[1]);
    const rawTicketType = params.get('ticketType');
    let ticketType = {};

    try {
      ticketType = JSON.parse(decodeURIComponent(rawTicketType));
    } catch (error) {
      console.error('Fout bij parsen ticketType:', error);
    }

    // Haal de andere url parameters op
    const name = params.get('name');
    const phone = params.get('phone');
    const email = params.get('email');

    // Stuur (POST) gegevens naar backend
    fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketType, name, phone, email })
    })

      .then(res => res.json())
      .then(data => {
        // Check algemene bestelling, daarna los SMS of email.
        if (!data.success) {
          alert("Er ging iets mis met je bestelling! Probeer het later opnieuw.");
        } else {
          if (!data.smsSuccess) {
            alert("Let op: de bevestigings-SMS kon niet worden verstuurd. Check je email!");
          }
          if (!data.emailSuccess) {
            alert("Let op: de bevestigings-e-mail kon niet worden verstuurd.");
          }

          // BEtaling faken met 2 seconden, dan door naar /succes
          setTimeout(() => {
            route('/success', true);
          }, 2000);
        }
      })
      .catch(error => {
        console.error("Fout bij de betaling:", error);
        alert("Er ging iets mis. We kunnen je bestelling niet voltooien.");
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
