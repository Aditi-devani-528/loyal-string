import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { _roles, _userList, USER_STATUS_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import BankTableRow from '../bank-table-row';
import BankTableToolbar from '../bank-table-toolbar';
import BankTableFiltersResult from '../bank-table-filters-result';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import { useGetBank } from '../../../api/bank';

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'bankName', label: 'Bank Name' },
  { id: 'accountName', label: 'Account Name', width: 180 },
  { id: 'accountNo', label: 'Bank Account No', width: 220 },
  { id: 'branchName', label: 'Branch Name', width: 180 },
  { id: 'contact', label: 'Mobile No.', width: 100 },
  { id: 'accountType', label: 'Account Type', width: 100 },
  { id: 'branchAddress', label: 'Branch Address', width: 100 },
  { id: 'IFSCCode', label: 'IFSC Code', width: 100 },
  { id: '', width: 88 },
];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function BankListView() {
  const { enqueueSnackbar } = useSnackbar();
  const table = useTable();
  const settings = useSettingsContext();
  const [bankId, setBankId] = useState('');
  const router = useRouter();
  const { user } = useAuthContext();
  const confirm = useBoolean();
  const {bank, mutate} = useGetBank()
  const [tableData, setTableData] = useState(bank);
  const [filters, setFilters] = useState(defaultFilters);
useEffect(()=>{
  if(bank){
    setTableData(bank)
  }
})
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_HOST_API}/${user?.company}/bank-account`, {
        data: { ids: id },
      });
      enqueueSnackbar(res.data.message);
      confirm.onFalse();
      mutate();
    } catch (err) {
      enqueueSnackbar("Failed to delete Scheme");
    }
  };

  const handleDeleteRow = useCallback(
    (id) => {
      handleDelete([id]);

      setTableData((prevData) => prevData.filter((row) => row._id !== id));

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData],
  );


  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => table.selected.includes(row._id));
    const deleteIds = deleteRows.map((row) => row._id);
    handleDelete(deleteIds);

    setTableData((prevData) => prevData.filter((row) => !deleteIds.includes(row._id)));

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      console.log('Edit Button clicked', id);
      router.push(paths.dashboard.userMaster.bankedit(id));
      setBankId(id);
    },
    [router]
  );
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Banks "
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User Master', href: paths.dashboard.user.root },
            { name: 'Add Banks' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.userMaster.bankcreate}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add Banks
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          {/*<Tabs*/}
          {/*  value={filters.status}*/}
          {/*  onChange={handleFilterStatus}*/}
          {/*  sx={{*/}
          {/*    px: 2.5,*/}
          {/*    boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {STATUS_OPTIONS.map((tab) => (*/}
          {/*    <Tab*/}
          {/*      key={tab.value}*/}
          {/*      iconPosition="end"*/}
          {/*      value={tab.value}*/}
          {/*      label={tab.label}*/}
          {/*      icon={*/}
          {/*        <Label*/}
          {/*          variant={*/}
          {/*            ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'*/}
          {/*          }*/}
          {/*          color={*/}
          {/*            (tab.value === 'active' && 'success') ||*/}
          {/*            (tab.value === 'pending' && 'warning') ||*/}
          {/*            (tab.value === 'banned' && 'error') ||*/}
          {/*            'default'*/}
          {/*          }*/}
          {/*        >*/}
          {/*          {['active', 'pending', 'banned', 'rejected'].includes(tab.value)*/}
          {/*            ? tableData.filter((user) => user.status === tab.value).length*/}
          {/*            : tableData.length}*/}
          {/*        </Label>*/}
          {/*      }*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</Tabs>*/}

          <BankTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <BankTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <BankTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                        onEditRow={() => handleEditRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
