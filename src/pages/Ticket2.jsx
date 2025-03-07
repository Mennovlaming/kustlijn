import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';

import dev from '../assets/friends/dev.png'
import bri from '../assets/friends/bri.png'
import bo from '../assets/friends/bo.png'
import jari from '../assets/friends/jari.png'
import cinta from '../assets/friends/cinta.png'

const Ticket2 = (props) => {

    const eventId = props.url ? props.url.split('/').pop() : null;

    const [event, setEvent] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showError, setShowError] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [tickets, setTickets] = useState({
        normaleTicket: 0,
        groepsticket: 0
    });

    const TICKET_PRICES = {
        normaleTicket: 10, 
        groepsticket: 36
    };

    useEffect(() => {
        if (!eventId) return;

        console.log(" Ophalen van event data voor ID:", eventId);

        fetch(`http://localhost:5000/api/events/${eventId}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setEvent(data);
            })
            .catch(error => console.error("Fout bij ophalen van event:", error));
    }, [eventId]);

    useEffect(() => {
        const totalNormaleTickets = tickets.normaleTicket * TICKET_PRICES.normaleTicket;
        const totalGroepsTickets = tickets.groepsticket * TICKET_PRICES.groepsticket;

        setTotalPrice(totalNormaleTickets + totalGroepsTickets);
    }, [tickets]);

    const plusTicket = (type) => {
        setTickets(prev => ({
            ...prev, 
            [type]: prev[type] + 1
        }));
    };

    const minusTicket = (type) => {
        setTickets(prev => ({
            ...prev, 
            [type]: Math.max(0, prev[type] - 1)
        }));
    };

    const goToNextPage = () => {
        if (tickets.normaleTicket === 0 && tickets.groepsticket === 0) {
            return;
        }
        if (!termsAccepted) {
            setShowError(true);
            return;
        }
        route(`/details?ticketType=${encodeURIComponent(JSON.stringify(tickets))}&totalPrice=${totalPrice}`, true);
    };

    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
        if (event.target.checked) {
            setShowError(false);
        }
    };

    // Voorkom lege pagina als event nog niet is geladen
    if (!event) {
        return <p>Loading event data...</p>;
    }

    return (
        <>
            <h2>Tickets <span>1/3</span></h2>
            <div className='eventix'>
                <section>
                    <p>5 van je vrienden gaan</p>
                    <ul className='friends'>
                        <li><img src={dev} alt="" /></li>
                                        <li><img src={bri} alt="" /></li>
                                        <li><img src={bo} alt="" /></li>
                                        <li><img src={jari} alt="" /></li>
                                        <li><img src={cinta} alt="" /></li>
                    </ul>
                </section>
                <section className='event'>
                    <div className='info'>
                        <div className='info__date'>
                            <span>{event?.month?.toUpperCase().slice(0, 3)}.</span>
                            <span>{event?.date.split('-')[0]}</span>
                        </div>
                        <div className='info__adress'>
                            <h3>{event?.name || "Laden..."}</h3>
                            <p>{event?.date || ""} | 15:00 - 23:00</p>
                            <p>{event?.location || ""}</p>
                        </div>
                        <hr />
                    </div>
                    <hr />
                    <ul className='tickets'>
                        <li>
                            <div className='tickets__pricing'>
                                <p>Normale ticket</p>
                                <p>€{TICKET_PRICES.normaleTicket.toFixed(2)} + €4,50 fee</p>
                            </div>
                            <div className='tickets__plusminusButtons'>
                                <button className='minusButton' onClick={() => minusTicket("normaleTicket")}>-</button>
                                <p>{tickets.normaleTicket}</p>
                                <button className='plusButton' onClick={() => plusTicket("normaleTicket")}>+</button>
                            </div>
                            <p>€{(TICKET_PRICES.normaleTicket * tickets.normaleTicket).toFixed(2)}</p>
                        </li>
                        <li>
                            <div className='tickets__pricing'>
                                <p>Groepsticket 4 pers</p> 
                                <p>€{TICKET_PRICES.groepsticket.toFixed(2)} + €4,50 fee</p> 
                            </div> 
                            <div className='tickets__plusminusButtons'>
                                <button className='minusButton' onClick={() => minusTicket("groepsticket")}>-</button>
                                <p>{tickets.groepsticket}</p>
                                <button className='plusButton' onClick={() => plusTicket("groepsticket")}>+</button>
                            </div>
                            <p>€{(TICKET_PRICES.groepsticket * tickets.groepsticket).toFixed(2)}</p>
                        </li>
                    </ul>
                </section>
                <section>
                    <label className={showError ? "checkbox error" : "checkbox"}>
                        <input type="checkbox" onChange={handleCheckboxChange} required />
                        <span>I agree to the terms of service of Kustlijn Events and to the terms of service of Eventix*</span>
                    </label>  
                </section>
                <section> 
                    <p><strong>Totaalprijs: <br /><br /> €{totalPrice.toFixed(2)}</strong></p> 
                    
                    <button 
                        className='eventixButton'
                        disabled={tickets.normaleTicket === 0 && tickets.groepsticket === 0 || !termsAccepted}
                        onClick={goToNextPage}>
                        Volgende
                    </button>
                </section>
            </div>
        </>
    );
};

export default Ticket2;
