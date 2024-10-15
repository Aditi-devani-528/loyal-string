import { Helmet } from 'react-helmet-async';
import TradingReceivePaymentsView from 'src/sections/trading/receivepayments/view/trading-receive-payments-view';


// ----------------------------------------------------------------------

export default function TradingReceivePaymentsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingReceivePaymentsView/>
    </>
  );
}
