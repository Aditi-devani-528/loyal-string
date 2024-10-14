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
import React from 'react';
import { Grid, TextField, Typography, Tabs, Tab } from '@mui/material';
// ----------------------------------------------------------------------

export default function TradingMakePaymentsView() {

  const settings = useSettingsContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Container maxWidth={'xl'}>
        <CustomBreadcrumbs
          heading="Create Payments"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Trading', href: '/trading' },
            { name: 'Create Payments' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box sx={{ fontSize: "22px", fontWeight: 500, marginBottom: "10px" }}>Search Purchase Item</Box>

        <Box sx={{ padding: '20px' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Tabs for Make Payment / Receive Payment */}
            <Grid item xs={12}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Make Payment" />
                <Tab label="Receive Payment" />
              </Tabs>
            </Grid>

            {/* Conditionally render Make Payment or Receive Payment based on active tab */}
            {value === 0 && (
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField label="Firm Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Fine Gold</Typography>
                  <TextField variant="outlined" fullWidth value="10" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Fine Silver</Typography>
                  <TextField variant="outlined" fullWidth value="0" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Advance Amount</Typography>
                  <TextField variant="outlined" fullWidth value="0" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Balance Amount</Typography>
                  <TextField variant="outlined" fullWidth value="0" />
                </Grid>
              </Grid>
            )}

            {value === 1 && (
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                  <TextField label="Firm Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Receive Fine Gold</Typography>
                  <TextField variant="outlined" fullWidth value="5" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Receive Fine Silver</Typography>
                  <TextField variant="outlined" fullWidth value="3" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Receive Amount</Typography>
                  <TextField variant="outlined" fullWidth value="1000" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">Receive Balance</Typography>
                  <TextField variant="outlined" fullWidth value="500" />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
