import { Helmet } from 'react-helmet-async';

import TradingPurchaseEntryView from 'src/sections/trading/purchase entry/view/trading-purchase-entry-view';

// ----------------------------------------------------------------------

export default function TradingPurchaseEntryPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingPurchaseEntryView />
    </>
  );
}
