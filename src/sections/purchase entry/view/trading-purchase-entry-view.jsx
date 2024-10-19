import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { useMockedUser } from 'src/hooks/use-mocked-user';

import {
  _ecommerceNewProducts,
  _ecommerceBestSalesman,
  _ecommerceSalesOverview,
  _ecommerceLatestProducts,
} from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { Grid, Button, Switch, FormControlLabel, Select, MenuItem, InputLabel } from "@mui/material";
// ----------------------------------------------------------------------

export default function TradingPurchaseEntryView() {

  const settings = useSettingsContext();

  return (
    <Box>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Purchase Entry"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Trading', href: paths.dashboard.trading.root },
            { name: 'Purchase Entry' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Box sx={{ fontSize: "22px", fontWeight: 500, marginBottom: "10px" }}>Add Purchase Entry</Box>

        <Box sx={{ backgroundColor: "#fff", padding: "30px", display: "flex" }}>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <TextField id="outlined-basic" label="Firm Name" variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0, // Remove border radius
              },
            }} />
          </Box>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <TextField id="outlined-basic" label="Lot Number" variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0, // Remove border radius
              },
            }} />
          </Box>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <TextField id="outlined-basic" label="Invoice Number" variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }} />
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "#fff", padding: "30px", display: "flex" }}>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <Box sx={{ marginBottom: "5px" }}>Fine Gold</Box>
            <TextField type='number' variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0, // Remove border radius
              },
            }} />
          </Box>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <Box sx={{ marginBottom: "5px" }}>Fine Silver</Box>
            <TextField type='number' variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0, // Remove border radius
              },
            }} />
          </Box>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <Box sx={{ marginBottom: "5px" }}>Advance Amount</Box>
            <TextField type='number' variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }} />
          </Box>
          <Box sx={{ margin: "0 20px" }} width={"100%"}>
            <Box sx={{ marginBottom: "5px" }}>Invoice Number</Box>
            <TextField type='number' variant="outlined" fullWidth sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }} />
          </Box>
        </Box>

        <Box sx={{ backgroundColor: "#fff", padding: "30px" }}>
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                border: "1px dashed grey",
                height: "150px",
                width: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px"
              }}
            >
              <Button variant="text">+ Upload</Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField label="SKU" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select variant="outlined" fullWidth>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select variant="outlined" fullWidth>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Gross WT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Stone WT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Clip WT/Item" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Clip Quantity" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Net WT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Select variant="outlined" fullWidth>
                  <MenuItem value={10}>Option 1</MenuItem>
                  <MenuItem value={20}>Option 2</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Purity" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Fine Percent" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Wastage%" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Stone Pieces" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Quantity" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Fixed Wastage WT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Making/GM" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Fixed Making" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Rate/100GM" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Stone Amount" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Hallmark Amount" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Tag  Weight" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Finding Weight" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Lanyard Weight" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Total Item amt." variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="T Dia. Amount" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="T Dia. Qty" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="T Dia. WT(Grm)" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Testing" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="Fine WT" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField label="F WT + W WT" variant="outlined" fullWidth />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Add to Unlabel"
                />
              </Grid>

            </Grid>
            <Button
                component={RouterLink}
                href={paths.dashboard.trading.stocktransferlist}
                variant="contained"
                style={{marginRight: "10px"}}
              >
                Add
              </Button>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
