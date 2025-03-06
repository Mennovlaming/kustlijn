//Deze pagina is overbodig. Er voor nu voor gekozen om door te leiden naar details.jsx

import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

const Details2 = ({ url }) => {
    const [name, setName] = useState('Menno Vlaming'); // Fake opgeslagen naam
    const [phone, setPhone] = useState('0612345678'); // Fake opgeslagen telefoonnummer
    const [ticketType, setTicketType] = useState('');
    const [totalPrice, setPrice] = useState(0);
    
    useEffect(() => {
        const params = new URLSearchParams(url.split('?')[1]);
        const ticketData = params.get('ticketType');
        const price = Number(params.get('totalPrice'));

        if (!isNaN(price)) {
            setPrice(price);
        }

        if (ticketData) {
            try {
                const parsedTickets = JSON.parse(decodeURIComponent(ticketData));
                setTicketType(parsedTickets);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        route(`/payment?ticketType=${ticketType}&name=${name}&phone=${phone}`, true);
    };

    return (
        <>
        <h2>Informatie <span>2/3</span></h2>
        <div className='eventix'>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className='inputfields'>
                        <label For="name">Naam
                            <input name="name" type="text" placeholder="Naam" value={name} onInput={(e) => setName(e.target.value)} required />
                        </label>
                        <label For="">Telefoonnummer
                            <input 
                                name="phonenumber" 
                                type="text" 
                                placeholder="Telefoonnummer" 
                                value={phone} 
                                onInput={(e) => setPhone(e.target.value)} 
                                required />
                        </label>
                    </div>
                    <button className="eventixButton" type="submit">Doorgaan naar betaling</button>
                    <div style={{ width: "100%" }}>
                        <p><strong>{generateTicketText()}</strong></p>
                        <p><strong>Totaalprijs: €{totalPrice.toFixed(2)}</strong></p>
                    </div>
                </form>
            </section>
        </div>
        </>
    );
};

export default Details2;
