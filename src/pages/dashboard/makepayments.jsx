import { Helmet } from 'react-helmet-async';
import TradingMakePaymentsView from 'src/sections/trading/makepayments/view/trading-make-payment-view';


// ----------------------------------------------------------------------

export default function TradingMakePaymentsPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingMakePaymentsView />
    </>
  );
}
