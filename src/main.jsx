import { render } from 'preact';
import { Router } from 'preact-router';
import Home from './pages/Home.jsx'
import Ticket from './pages/Ticket.jsx';
import Details from './pages/Details.jsx';
import Payment from './pages/Payment.jsx';
import Success from './pages/Success.jsx';
import Events from './pages/Events.jsx';
import Ticket2 from './pages/Ticket2.jsx';
import Details2 from './pages/Details2.jsx';

const App = () => (
    <Router>
        {/* <Home path="/" /> */}
        <Ticket path="/" />
        <Details path="/details" />
        <Payment path="/payment" />
        <Success path="/success" />
        <Events path="/Events" />
        <Ticket2 path="/Tickets2/:id" />
        <Details2 path="/Details2" />
    </Router>
);

render(<App />, document.getElementById('app'));
