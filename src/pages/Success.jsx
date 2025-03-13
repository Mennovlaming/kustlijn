import { route } from 'preact-router';

const Success = () => {
    return (
        <div className='success'>
            <h1>Bedankt!</h1>
            <p>We zien je weer terug op 18 april bij Citadel House Edition!! 
Check je mail voor je gratis drankje!</p>
            <button onClick={() => route('/Events')}>Bekijk alle evenementen</button>
        </div>
    );
};

export default Success;
