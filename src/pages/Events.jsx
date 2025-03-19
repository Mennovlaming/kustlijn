import { useEffect, useState } from 'preact/hooks';
import { Link } from 'preact-router';
import Arrow from '../assets/arrowright.png';

import dev from '../assets/friends/dev.png'
import bri from '../assets/friends/bri.png'
import bo from '../assets/friends/bo.png'
import jari from '../assets/friends/jari.png'
import cinta from '../assets/friends/cinta.png'

import share1 from '../assets/icons/Share1.png'
import share from '../assets/icons/Share.png'
import send from '../assets/icons/send.png'
import calendar from '../assets/icons/Calendar.png'


const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch om de events op te halen, standaard GET, dus hoeft niet aangegeven te worden.
    useEffect(() => {
        fetch('http://localhost:5000/api/events')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Netwerkrespons was niet ok");
                }
                return response.json();
            })
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Fout bij ophalen van events:", error);
                setLoading(false);
            });
    }, []);

    const formatEventDate = (dateString) => {
        const [day, month, year] = dateString.split("-"); // "15-07-2025" → ["15", "07", "2025"]
        const dateObj = new Date(`${year}-${month}-${day}`); // Maak een geldig Date object
        const monthShort = dateObj.toLocaleString("nl-NL", { month: "short" }).toUpperCase(); // "jul."
        return { day, monthShort };
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='events'>
            <h1>Alle evenementen</h1>
            <ul>
                {events.map(event => {
                    const { day, monthShort } = event.date ? formatEventDate(event.date) : { day: "", monthShort: "" };

                    return (
                        <li key={event.id}>
                            <section className='personalised event'>
                                <div className='info'>
                                    <div className='info__date'>
                                        <span>{monthShort}.</span>
                                        <span>{day}</span>
                                    </div>
                                    <div className='info__adress'>
                                        <h3>{event.name}</h3>
                                        <p>{event.date}</p>
                                        <p>{event.location}</p>
                                    </div>
                                    <div>
                                    <Link href={`/Tickets2/${event.id}`}><img src={Arrow} alt="arrowright" /></Link>

                                    </div>
                                </div>
                                <hr />
                                <div className='events__content'>
                                    <div className='friends-container'>
                                        <p>5 van je vrienden gaan</p>
                                        <ul className='friends'>
                                            <li><img src={dev} alt="" /></li>
                                            <li><img src={bri} alt="" /></li>
                                            <li><img src={bo} alt="" /></li>
                                            <li><img src={jari} alt="" /></li>
                                            <li><img src={cinta} alt="" /></li>
                                        </ul>
                                    </div>

                                    <div className="details-container">
                                        <details>
                                            <summary></summary>
                                            <div className='details-content'>
                                                <p>
                                                    <strong>Informatie</strong> <br />
                                                    We hebben er weer zin in! Na een succesvolle eerste editie van onze citadel house special keren we 18 april weer terug bij onze geliefde citadel. We hebben wederom onze lokale helden achter de draaitafel staan en het beloofd weer een geweldig feestje te worden. Haal nu je ticket en we zien jou 18 april bij Citadel!<br /><br />
                                                    <strong>Line up</strong><br />
                                                    Dj 1 15:00 - 17:00<br />
                                                    Dj 2 17:00 - 19:00<br />
                                                    Dj 3 19:00 - 21:00<br />
                                                    Dj 4 21:00 - 23:00
                                                </p>
                                            </div>
                                            <div className='shareButtons'>
                                                <button><img src={share1} alt="" /></button>
                                                <button><img src={share} alt="" /></button>
                                                <button><img src={send} alt="" /></button>
                                                <button><img src={calendar} alt="" /></button>
                                            </div>
                                        </details>
                                </div>
                            </div>
                            </section>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Events;
