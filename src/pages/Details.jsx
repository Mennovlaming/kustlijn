import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Details = ({ url }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState('');       // 1) Nieuw email-state
  const [emailError, setEmailError] = useState(false); // 2) Optionele email-validatie
  const [ticketType, setTicketType] = useState('');
  const [totalPrice, setPrice] = useState(0);
  
  useEffect(() => {
    const params = new URLSearchParams(url.split('?')[1]);
    const ticketData = params.get('ticketType');
    const price = Number(params.get('totalPrice'));
    setPrice(price);

    if (ticketData) {
      try {
        const parsedTickets = JSON.parse(decodeURIComponent(ticketData));
        setTicketType(parsedTickets); // Nu is ticketType een object met aantallen
      } catch (error) {
        console.error("Fout bij het parsen van ticketgegevens:", error);
      }
    }
  }, [url]);
  
  const generateTicketText = () => {
    const selectedTickets = [];
    if (ticketType.normaleTicket > 0) {
      selectedTickets.push(`${ticketType.normaleTicket} normale ticket(s)`);
    }
    if (ticketType.groepsticket > 0) {
      selectedTickets.push(`${ticketType.groepsticket} groepsticket(s)`);
    }
    return `Je hebt gekozen voor: ${selectedTickets.join(" en ")}.`;
  };

  // Validatie Telefoon
  const validatePhone = (value) => {
    const phoneRegex = /^\+?(\d{1,3})?\d{8,14}$/;
    setPhone(value);
    setPhoneError(!phoneRegex.test(value));
  };

  // Optionele validatie E-mail
  const validateEmail = (value) => {
    // Simpele email-check (niet perfect, maar voldoende voor demo)
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    setEmail(value);
    setEmailError(!emailRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Encoden van het ticketType zodat we het in Payment.jsx weer kunnen parsen
    const ticketTypeString = encodeURIComponent(JSON.stringify(ticketType));

    // 3) E-mail meesturen in de query
    route(`/payment?ticketType=${ticketTypeString}&name=${name}&phone=${phone}&email=${email}`, true);
  };

  return (
    <>
      <h2>Informatie <span>2/3</span></h2>
      <div className='eventix'>
        <section>
          <form onSubmit={handleSubmit}>
            <div className='inputfields'>

              <label htmlFor="name">
                Naam
                <input
                  name="name"
                  type="text"
                  placeholder="Naam"
                  value={name}
                  onInput={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label htmlFor="phonenumber">
                Telefoonnummer
                <input
                  name="phonenumber"
                  type="text"
                  placeholder="Telefoonnummer"
                  value={phone}
                  onInput={(e) => validatePhone(e.target.value)}
                  required
                />
                {phoneError && <p style={{ color: "red" }}>Voer een geldig telefoonnummer in</p>}
              </label>

              {/* 1) Nieuw inputveld voor E-MAIL */}
              <label htmlFor="email">
                E-mailadres
                <input
                  name="email"
                  type="email"
                  placeholder="E-mailadres"
                  value={email}
                  onInput={(e) => validateEmail(e.target.value)}
                  required
                />
                {emailError && <p style={{ color: "red" }}>Voer een geldig e-mailadres in</p>}
              </label>
            </div>

            <button className="eventixButton" type="submit">Doorgaan naar betaling</button>
            <div style={"width: 100%;"}>
              <p><strong>{generateTicketText()}</strong></p>
              <p><strong>Totaalprijs: €{totalPrice.toFixed(2)}</strong></p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Details;
