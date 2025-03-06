import { route } from 'preact-router';
import QR from '../assets/qr.png';
import poster from '../assets/poster.png';

const Home = () => {
    return (
        <div className='poster'> 
            <h1>Welkom bij Kustlijn Events!</h1>
            <p>Scan de QR-code om een ticket te kopen voor het volgend evenement</p>
            <button onClick={() => route('/ticket')}><img src={QR} alt="QR-code"/></button>
        </div>
    );
};

export default Home;
