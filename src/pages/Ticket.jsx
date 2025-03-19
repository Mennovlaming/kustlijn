import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';

const Ticket = () => {
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

    // Bereken de totaalprijs telkens wanneer tickets veranderen
    useEffect(() => {
        const totalNormaleTickets = tickets.normaleTicket * TICKET_PRICES.normaleTicket;
        const totalGroepsTickets = tickets.groepsticket * TICKET_PRICES.groepsticket;

        setTotalPrice(totalNormaleTickets + totalGroepsTickets);
    }, [tickets]); // Wordt opnieuw uitgevoerd bij verandering van tickets

    // Maak gebruik van prev zodat je altijd de huige staat van de useState gebruikt, met ...tickets haal je de huidge waarde op als de ticket word uitgevoerd, niet perse up to date.
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

    // Controleer of meer dan 0 tickets zijn gekocht en of de voorwaarden geaccepteerd zijn, zo ja, ga naar details met als prop ticketinfo.
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
    
    return (
        <>
            <h2>Tickets <span>1/3</span></h2>
            <div className='eventix'>
                <section className='event'>
                    <div className='info'>
                        <div className='info__date'>
                            <span>APR.</span>
                            <span>18</span>
                        </div>
                        <div className='info__adress'>
                            <h3>Citadel House Special</h3>
                            <p>18-04-2025 | 15:00 - 23:00</p>
                            <p>Huisduinen 630, 1789BA Den Helder</p>
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
                                    <button 
                                        className='minusButton'
                                        onClick={() => minusTicket("normaleTicket")}>-
                                    </button>
                                
                                    <p>{tickets.normaleTicket}</p>
                                    <button 
                                        className='plusButton'
                                        onClick={() => plusTicket("normaleTicket")}>+
                                    </button>
                                </div>
                                <p>€{(TICKET_PRICES.normaleTicket * tickets.normaleTicket).toFixed(2)}</p>
                            </li>
                            <li>
                                <div className='tickets__pricing'>
                                    <p>Groepsticket 4 pers</p> 
                                    <p>€{TICKET_PRICES.groepsticket.toFixed(2)} + €4,50 fee</p> 
                                </div> 
                                <div className='tickets__plusminusButtons'>
                                    <button 
                                        className='minusButton'
                                        onClick={() => minusTicket("groepsticket")}>-
                                    </button>
                                    <p>{tickets.groepsticket}</p>
                                    
                                    <button 
                                        className='plusButton'
                                        onClick={() => plusTicket("groepsticket")}>+
                                    </button>
                                </div>
                                <p>€{(TICKET_PRICES.groepsticket * tickets.groepsticket).toFixed(2)}</p>
                            </li>
                        </ul>
                </section>
                <section>
                    <label className={showError ? "checkbox error" : "checkbox"}>
                        <input 
                            type="checkbox" 
                            onChange={handleCheckboxChange}
                            required/>
                        <span>I agree to the terms of service of Kustlijn Events and to the terms of service of Eventix* </span>
                    </label>  
                </section>
                <section> 
                    <p><strong>Totaalprijs: 
                        <br /><br />
                        €{totalPrice.toFixed(2)}</strong></p> 
                    
                    <button 
                        className='eventixButton'
                        disabled={tickets.normaleTicket === 0 && tickets.groepsticket === 0 || !termsAccepted}
                        onClick={goToNextPage}>
                            Volgende</button>
                </section>
            </div>
        </>
    );
};

export default Ticket;
