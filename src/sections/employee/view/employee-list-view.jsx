import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

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

import EmployeeTableRow from '../employee-table-row';
import EmployeeTableToolbar from '../employee-table-toolbar';
import EmployeeTableFiltersResult from '../employee-table-filters-result';
import { useAuthContext } from 'src/auth/hooks';
import { useGetEmployee } from 'src/api/employee';
import { whitespace } from 'stylis';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'firstName', label: 'First name' },
  { id: 'lastName', label: 'Last name' },
  { id: 'email', label: 'Emp Email' },
  { id: 'contact', label: 'Mobile Number' },
  { id: 'street', label: 'Street Address' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State' },
  { id: 'country', label: 'Country' },
  { id: 'zipCode', label: 'Zip Code' },
  { id: 'aadharCard', label: 'Aadhar No' },
  { id: 'panCard', label: 'Pan No' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'gender', label: 'Gender' },
  { id: 'workLocation', label: 'Work Location' },
  { id: 'department', label: 'Department' },
  // { id: 'role', label: 'role' },
  // { id: 'reportingTo', label: 'Reporting to' },
  { id: 'bankName', label: 'Bank Name' },
  { id: 'accountNumber', label: 'Bank AccountNo' },
  { id: 'branch', label: 'Branch Name' },
  { id: 'ifscCode', label: 'IFSC Code' },
  { id: 'joiningDate', label: 'Joining Date' },
  { id: '' },
];
// const TABLE_HEAD = [
//   { id: 'branch', label: 'Employees Name' },
//   { id: 'phoneNumber', label: 'First name', width: 180 },
//   { id: 'company', label: 'Last name', width: 220 },
//   { id: 'role', label: 'Emp Email', width: 180 },
//   { id: 'role', label: 'Mobile Number', width: 180 },
//   { id: 'role', label: 'Town', width: 180 },
//   { id: 'role', label: 'Street Address', width: 180 },
//   { id: 'role', label: 'City', width: 180 },
//   { id: 'role', label: 'Country', width: 180 },
//   { id: 'role', label: 'Aadhar No', width: 180 },
//   { id: 'role', label: 'Pan No', width: 180 },
//   { id: 'role', label: 'Date of Birth', width: 180 },
//   { id: 'role', label: 'Gender', width: 180 },
//   { id: 'role', label: 'Designation', width: 180 },
//   { id: 'role', label: 'Work Location', width: 180 },
//   { id: 'role', label: 'Department', width: 180 },
//   { id: 'role', label: 'Reporting to', width: 180 },
//   { id: 'role', label: 'Bank Name', width: 180 },
//   { id: 'role', label: 'Account Name', width: 180 },
//   { id: 'role', label: 'Bank AccountNo', width: 180 },
//   { id: 'role', label: 'Branch Name', width: 180 },
//   { id: 'role', label: 'IFSC Code', width: 180 },
//   { id: 'role', label: 'Joining Date', width: 180 },
//   { id: 'status', label: 'Salary', width: 100 },
//   { id: 'status', label: 'Seating Location', width: 100 },
//   { id: 'status', label: 'Financial Year', width: 100 },
//   { id: '', width: 88 },
// ];

const defaultFilters = {
  name: '',
  role: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function EmployeeListView() {
  const { enqueueSnackbar } = useSnackbar();

  const { employee, mutate } = useGetEmployee();

  const table = useTable();

  const { user } = useAuthContext ();
  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(employee || []);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: employee,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const [employeeId, setEmployeeId] = useState('');
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
      const res = await axios.delete(`${import.meta.env.VITE_HOST_API}/${user?.company}/employee`, {
        data: { ids: id },
      });
      enqueueSnackbar(res.data.message, { variant: 'success' });
      confirm.onFalse();
      mutate();
    } catch (err) {
      enqueueSnackbar("Failed to delete employee", { variant: 'error' });
    }
  };
  const handleDeleteRow = useCallback(
    (id) => {
      handleDelete([id]);
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData],
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = employee.filter((row) => table.selected.includes(row._id));
    const deleteIds = deleteRows.map((row) => row._id);
    handleDelete(deleteIds);
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, enqueueSnackbar, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {

      router.push(paths.dashboard.userMaster.employeeedit(id));
      setEmployeeId(id);
    },
    [router]
  );
  console.log(employeeId);

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Employee"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User Master', href: paths.dashboard.userMaster.employeecreate },
            { name: 'Add Employee ' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.userMaster.employeecreate}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add Employee
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          {/* <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'banned' && 'error') ||
                      'default'
                    }
                  >
                    {['active', 'pending', 'banned', 'rejected'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <EmployeeTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          /> */}

          {canReset && (
            <EmployeeTableFiltersResult
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
                  dataFiltered.map((row) => row._id)
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
                  sx={{ whitespace: 'nowrap' }}
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row._id)
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
                      <EmployeeTableRow
                        key={row._id}
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
