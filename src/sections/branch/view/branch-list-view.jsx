import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { _roles, _userList } from 'src/_mock';
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
import BranchTableRow from '../branch-table-row';
import BranchTableToolbar from '../branch-table-toolbar';
import BranchTableFiltersResult from '../branch-table-filters-result';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import { useGetBranch } from '../../../api/branch';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Branch Name' },
  { id: 'type', label: 'Branch Type' },
  { id: 'branch_head', label: 'Branch Head' },
  { id: 'contact', label: 'Mobile Number ' },
  { id: 'email', label: 'Email' },
  { id: 'financial_year', label: 'Financial Year' },
  { id: '' },
];

const defaultFilters = {
  name: '',
  role: [],
};

// ----------------------------------------------------------------------

export default function BranchListView() {
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable();

  const settings = useSettingsContext();

  const { branch, mutate } = useGetBranch();
  const { user } = useAuthContext()

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_userList);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: branch,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage,
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
    [table],
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_HOST_API}/${user?.company}/branch`, {
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
      router.push(paths.dashboard.userMaster.branchedit(id));
    },
    [router],
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=' Branch'
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'User Master', href: paths.dashboard.user.root },
            { name: ' Branch list' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.userMaster.branchcreate}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              Add Branch
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>

          <BranchTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            roleOptions={_roles}
          />

          {canReset && (
            <BranchTableFiltersResult
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
                  dataFiltered.map((row) => row.id),
                )
              }
              action={
                <Tooltip title='Delete'>
                  <IconButton color='primary' onClick={confirm.onTrue}>
                    <Iconify icon='solar:trash-bin-trash-bold' />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  sx={{ whiteSpace: 'nowrap' }}
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id),
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage,
                    )
                    .map((row) => (
                      <BranchTableRow
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
        title='Delete'
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant='contained'
            color='error'
            onClick={async () => {
              if (table.selected.length > 0) {
                await handleDeleteRows();
                confirm.onFalse();
              } else {
                enqueueSnackbar('No items selected for deletion', { variant: 'warning' });
              }
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
  const { name, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
