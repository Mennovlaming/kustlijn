import { render } from 'preact';
import { Router } from 'preact-router';
import Ticket from './pages/Ticket.jsx';
import Details from './pages/Details.jsx';
import Payment from './pages/Payment.jsx';
import Success from './pages/Success.jsx';
import Events from './pages/Events.jsx';
import Ticket2 from './pages/Ticket2.jsx';

const App = () => (
    <Router>
        <Ticket path="/" />
        <Details path="/details" />
        <Payment path="/payment" />
        <Success path="/success" />
        <Events path="/Events" />
        <Ticket2 path="/Tickets2/:id" />
    </Router>
);

render(<App />, document.getElementById('app'));
