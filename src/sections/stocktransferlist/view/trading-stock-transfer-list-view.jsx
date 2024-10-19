import React from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  IconButton,
  Pagination,
  FormControlLabel,
} from '@mui/material';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  _ecommerceNewProducts,
  _ecommerceBestSalesman,
  _ecommerceSalesOverview,
  _ecommerceLatestProducts,
} from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { Tabs, Tab } from '@mui/material';
import { RouterLink } from 'src/routes/components';
// ----------------------------------------------------------------------

export default function TradingStockTransferListView() {

  const settings = useSettingsContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dense, setDense] = React.useState(false);
  const [rows, setRows] = React.useState([
    { id: 1, stockType: 'Labelled', transferType: 'Packet to Salesmen', from: 'Daksh', to: 'P-1', transferBy: 'Daksh', transferTo: 'Daksh', receivedBy: 'Kaushal', pending: 1, approved: 0, rejected: 0, remark: 'Rejected' },
    { id: 2, stockType: 'Labelled', transferType: 'Packet to Salesmen', from: 'Daksh', to: 'P-1', transferBy: 'Daksh', transferTo: 'Daksh', receivedBy: 'Kaushal', pending: 1, approved: 0, rejected: 0, remark: 'Rejected' },
    { id: 3, stockType: 'Labelled', transferType: 'Packet to Salesmen', from: 'Daksh', to: 'P-1', transferBy: 'Daksh', transferTo: 'Daksh', receivedBy: 'Kaushal', pending: 1, approved: 0, rejected: 0, remark: 'Rejected' },
    { id: 4, stockType: 'Labelled', transferType: 'Packet to Salesmen', from: 'Daksh', to: 'P-1', transferBy: 'Daksh', transferTo: 'Daksh', receivedBy: 'Kaushal', pending: 1, approved: 0, rejected: 0, remark: 'Rejected' },
    { id: 5, stockType: 'Labelled', transferType: 'Packet to Salesmen', from: 'Daksh', to: 'P-1', transferBy: 'Daksh', transferTo: 'Daksh', receivedBy: 'Kaushal', pending: 1, approved: 0, rejected: 0, remark: 'Rejected' },
  ]);

  return (
    <Box>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Stock Transfer"
          links={[
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'Trading' },
            { name: 'Stock Transfer' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Typography variant="h5" gutterBottom>Stock Transfer History</Typography>

        <Box>
          <Container maxWidth={'xl'}>

            <Box sx={{ padding: '20px' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="In Requenst" />
                    <Tab label="Out Requenst" />
                  </Tabs>
                </Grid>

                {value === 0 && (
                  <Box>
                    <Container maxWidth="lg">

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Stock Type" fullWidth select>
                            <MenuItem value="Labelled">Labelled</MenuItem>
                            <MenuItem value="Unlabelled">Unlabelled</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Branch" fullWidth select>
                            <MenuItem value="Branch 1">Branch 1</MenuItem>
                            <MenuItem value="Branch 2">Branch 2</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Transfer Type" fullWidth select>
                            <MenuItem value="Type 1">Type 1</MenuItem>
                            <MenuItem value="Type 2">Type 2</MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>

                      <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table size={dense ? 'small' : 'medium'}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr. No.</TableCell>
                              <TableCell>Stock Type</TableCell>
                              <TableCell>Transfer Type</TableCell>
                              <TableCell>From</TableCell>
                              <TableCell>To</TableCell>
                              <TableCell>Transfer By</TableCell>
                              <TableCell>Received By</TableCell>
                              <TableCell>Pending</TableCell>
                              <TableCell>Approved</TableCell>
                              <TableCell>Rejected</TableCell>
                              <TableCell>Remark</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.stockType}</TableCell>
                                <TableCell>{row.transferType}</TableCell>
                                <TableCell>{row.from}</TableCell>
                                <TableCell>{row.to}</TableCell>
                                <TableCell>{row.transferBy}</TableCell>
                                <TableCell>{row.receivedBy}</TableCell>
                                <TableCell>{row.pending}</TableCell>
                                <TableCell>{row.approved}</TableCell>
                                <TableCell>{row.rejected}</TableCell>
                                <TableCell>{row.remark}</TableCell>
                                <TableCell>
                                  <IconButton>
                                      <Box
                                        component={RouterLink}
                                        href={paths.dashboard.trading.stocktransferlistinstock}
                                        variant="contained"
                                        sx={{fontSize: "16px",textDecoration: "none",color: "#212B36"}}
                                      >
                                        Next
                                      </Box>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <FormControlLabel
                          control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
                          label="Dense"
                        />
                        <Pagination count={5} color="primary" />
                      </Box>
                    </Container>
                  </Box>
                )}

                {value === 1 && (
                  <Box>
                    <Container maxWidth="lg">

                      <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="Start Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            label="End Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Stock Type" fullWidth select>
                            <MenuItem value="Labelled">Labelled</MenuItem>
                            <MenuItem value="Unlabelled">Unlabelled</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Branch" fullWidth select>
                            <MenuItem value="Branch 1">Branch 1</MenuItem>
                            <MenuItem value="Branch 2">Branch 2</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField label="Transfer Type" fullWidth select>
                            <MenuItem value="Type 1">Type 1</MenuItem>
                            <MenuItem value="Type 2">Type 2</MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>

                      <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table size={dense ? 'small' : 'medium'}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Sr. No.</TableCell>
                              <TableCell>Stock Type</TableCell>
                              <TableCell>Transfer Type</TableCell>
                              <TableCell>From</TableCell>
                              <TableCell>To</TableCell>
                              <TableCell>Transfer By</TableCell>
                              <TableCell>Received By</TableCell>
                              <TableCell>Pending</TableCell>
                              <TableCell>Approved</TableCell>
                              <TableCell>Rejected</TableCell>
                              <TableCell>Remark</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.stockType}</TableCell>
                                <TableCell>{row.transferType}</TableCell>
                                <TableCell>{row.from}</TableCell>
                                <TableCell>{row.to}</TableCell>
                                <TableCell>{row.transferBy}</TableCell>
                                <TableCell>{row.receivedBy}</TableCell>
                                <TableCell>{row.pending}</TableCell>
                                <TableCell>{row.approved}</TableCell>
                                <TableCell>{row.rejected}</TableCell>
                                <TableCell>{row.remark}</TableCell>
                                <TableCell>
                                  <IconButton>
                                      <Box
                                        component={RouterLink}
                                        href={paths.dashboard.trading.stocktransferlistoutstock}
                                        variant="contained"
                                        sx={{fontSize: "16px",textDecoration: "none",color: "#212B36"}}
                                      >
                                        Next
                                      </Box>
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                        <FormControlLabel
                          control={<Switch checked={dense} onChange={() => setDense(!dense)} />}
                          label="Dense"
                        />
                        <Pagination count={5} color="primary" />
                      </Box>
                    </Container>
                  </Box>
                )}

              </Grid>
            </Box>
          </Container>
        </Box>

      </Container>
    </Box>
  );
}
