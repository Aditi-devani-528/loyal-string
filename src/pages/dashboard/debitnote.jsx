import { Helmet } from 'react-helmet-async';
import TradingDebitNoteView from 'src/sections/trading/debitnote/view/trading-debit-note-view';

// ----------------------------------------------------------------------

export default function TradingDebitNotePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingDebitNoteView />
    </>
  );
}
