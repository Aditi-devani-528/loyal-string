import { Helmet } from 'react-helmet-async';
import TradingCreatePacketView from 'src/sections/trading/createpacket/view/tranding-create-packet-view';

// ----------------------------------------------------------------------

export default function TradingCreatePacketPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: E-Commerce</title>
      </Helmet>

      <TradingCreatePacketView />
    </>
  );
}
