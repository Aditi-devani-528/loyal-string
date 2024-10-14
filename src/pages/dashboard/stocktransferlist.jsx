import { Helmet } from 'react-helmet-async';
import TradingStockTransferListView from 'src/sections/trading/stocktransferlist/view/trading-stock-transfer-list-view';


// ----------------------------------------------------------------------

export default function TradingStockTransferListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingStockTransferListView />
    </>
  );
}
