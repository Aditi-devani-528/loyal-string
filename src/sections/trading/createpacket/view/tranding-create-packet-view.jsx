import Container from '@mui/material/Container';

import {
    _ecommerceNewProducts,
    _ecommerceBestSalesman,
    _ecommerceSalesOverview,
    _ecommerceLatestProducts,
} from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import CreatePacketListView from '../create-packet-list-view';
// ----------------------------------------------------------------------

export default function TradingCreatePacketView() {

    const settings = useSettingsContext();

    return (
        <Box>
            <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                <CustomBreadcrumbs
                    heading="Create Packet"
                    links={[
                        { name: 'Dashboard', href: paths.dashboard.root },
                        { name: 'Trading', href: paths.dashboard.trading.root },
                        { name: 'Create Packet' },
                    ]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                />
                <Box sx={{ fontSize: "22px", fontWeight: 500, marginBottom: "10px" }}>Search Purchase Item</Box>

                <Box sx={{ backgroundColor: "#fff", padding: "30px", display: "flex" }}>
                    <Box sx={{ margin: "0 20px" }} width={"100%"}>
                        <TextField type='number' placeholder='Select Vendor' variant="outlined" fullWidth sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            },
                        }} />
                    </Box>
                    <Box sx={{ margin: "0 20px" }} width={"100%"}>
                        <TextField type='number' placeholder='Select Lot Number' variant="outlined" fullWidth sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0, 
                            }, 
                        }} />
                    </Box>
                    <Box sx={{ margin: "0 20px" }} width={"100%"}>
                        <TextField type='number' placeholder='Select Category' variant="outlined" fullWidth sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            },
                        }} />
                    </Box>
                    <Box sx={{ margin: "0 20px" }} width={"100%"}>
                        <TextField type='number' placeholder='Select Product' variant="outlined" fullWidth sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 0,
                            },
                        }} />
                    </Box>
                </Box>

                <CreatePacketListView/>
                
            </Container>
        </Box>
    );
}
