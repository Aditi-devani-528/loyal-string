import { Helmet } from 'react-helmet-async';
import TradingCreditNoteView from 'src/sections/trading/creditnote/view/trading-credit-note-view';

// ----------------------------------------------------------------------

export default function TradingCreditNotePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingCreditNoteView />
    </>
  );
}
