import { Helmet } from 'react-helmet-async';

import TradingStockTransferView from 'src/sections/trading/stocktransfer/view/trading-stock-transfer-view';

// ----------------------------------------------------------------------

export default function TradingStockTransferPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingStockTransferView />
    </>
  );
}
