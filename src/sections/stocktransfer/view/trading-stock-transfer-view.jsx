import React from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  MenuItem,
  Switch,
  Typography,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  InputLabel,
  Select
} from '@mui/material';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// ----------------------------------------------------------------------

export default function TradingStockTransferView() {

    const [transferType, setTransferType] = React.useState('');
    const [from, setFrom] = React.useState('');
    const [to, setTo] = React.useState('');
    const [date, setDate] = React.useState('');
    const [labeledStock, setLabeledStock] = React.useState(true);
    const [selectAll, setSelectAll] = React.useState(false);
    const [rows, setRows] = React.useState([
      { id: 1, productName: 'Normal red13n', label: '0.001', grossWT: 2, netWT: 0, transfer: false },
      { id: 2, productName: 'Normal red13n', label: '0.001', grossWT: 1, netWT: 0, transfer: false },
      { id: 3, productName: 'Normal red13n', label: '0.001', grossWT: 1, netWT: 0, transfer: false },
      { id: 4, productName: 'Normal red13n', label: '0.001', grossWT: 1, netWT: 0, transfer: false },
      { id: 5, productName: 'Normal red13n', label: '0.001', grossWT: 1, netWT: 0, transfer: false }
    ]);
  
    const handleSelectAll = (event) => {
      setSelectAll(event.target.checked);
      setRows(rows.map(row => ({ ...row, transfer: event.target.checked })));
    };
  
    const handleRowChange = (event, id) => {
      setRows(rows.map(row => row.id === id ? { ...row, transfer: event.target.checked } : row));
    };
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
      <Typography variant="h5" gutterBottom>Stock Transfer</Typography>

      <Grid container spacing={2}>
        {/* Transfer Type, From, To, Date */}
        <Grid item xs={12} md={3}>
          <Select
            fullWidth
            value={transferType}
            onChange={(e) => setTransferType(e.target.value)}
          >
            <MenuItem value="Type 1">Type 1</MenuItem>
            <MenuItem value="Type 2">Type 2</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="From"
            fullWidth
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="To"
            fullWidth
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>

        {/* Labeled Stock Toggle */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={labeledStock}
                onChange={() => setLabeledStock(!labeledStock)}
              />
            }
            label="Labeled Stock"
          />
        </Grid>

        {/* Category, Product, Design, Purity */}
        <Grid item xs={3}>
          <TextField label="Category" fullWidth select>
            <MenuItem value="Category 1">Category 1</MenuItem>
            <MenuItem value="Category 2">Category 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Product" fullWidth select>
            <MenuItem value="Product 1">Product 1</MenuItem>
            <MenuItem value="Product 2">Product 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Design" fullWidth select>
            <MenuItem value="Design 1">Design 1</MenuItem>
            <MenuItem value="Design 2">Design 2</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Purity" fullWidth select>
            <MenuItem value="Purity 1">Purity 1</MenuItem>
            <MenuItem value="Purity 2">Purity 2</MenuItem>
          </TextField>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />
            }
            label="Select All"
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Gross WT</TableCell>
                  <TableCell>Net WT</TableCell>
                  <TableCell>Transfer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.productName}</TableCell>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.grossWT}</TableCell>
                    <TableCell>{row.netWT}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={row.transfer}
                        onChange={(e) => handleRowChange(e, row.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Transfer Button */}
        <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
          <Button variant="contained" color="primary">
            Transfer Stock
          </Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
}
