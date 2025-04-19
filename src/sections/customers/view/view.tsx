'use client';

import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// _mock
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
// types
import { IUserItem, IUserTableFilters, IUserTableFilterValue } from 'src/types/user';
//
import { Typography } from '@mui/material';
import { gitCustomers, setCustomer } from 'src/redux/slices/customerSignSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserTableRow from '../customer-table-row';
import UserTableToolbar from '../customer-table-toolbar';
import UserTableFiltersResult from '../customer-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Banned', label: 'Banned' },
];

const TABLE_HEAD = [
  { id: '', width: 50 },
  { id: 'name', label: 'Name', width: 5000 },
  { id: 'phoneNumber', label: 'Phone Number', flex: 2 },
  { id: '', width: 88 },
  { id: '', flex: 1 },
  { id: 'status', label: 'Status', flex: 1 },
  { id: '', width: 88 },
];

const defaultFilters: {
  name: string;
  status: string;
} = {
  name: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function CustomersListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const customers = useSelector((state: any) => state.signDialog.customers);
  const dispatch = useDispatch();

  // const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: customers,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {      
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      const updatedCustomers = customers.filter((row: { id: string;}) => row.id !== id);
      dispatch(setCustomer({ customers: updatedCustomers }));
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [customers, dispatch, dataInPage.length, table]
  );


  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      // console.log(newValue, 11111);
      
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const customersData = await gitCustomers();
      
      dispatch(setCustomer({
        customers: customersData.map((user: {
          id: string;
          fullName: string;
          picture: string;
          phoneNumber: string;
          email: string;
          active: boolean; }) => ({
          id: user.id || '',
          name: user.fullName || '',
          avatarUrl: user.picture || '',
          phoneNumber: user.phoneNumber || '+1234567890123',
          email: user.email || '',
          status: user.active === true ? 'active' : 'banned',
        })),
      }));
    }


    // Call the async function
    fetchData();
    
  }, [dispatch]);
  console.log(customers);
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Customers
        </Typography>

        <Card>
          <Tabs
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
                      (tab.value === 'all' && 'wGray') ||
                      'default'
                    }
                  >
                    {tab.value === 'all' && customers.length}
                    {tab.value === 'Active' &&
                      customers.filter((user: { status: string;}) => user.status === 'active').length}

                    {tab.value === 'pending' &&
                      customers.filter((user:{ status: string;}) => user.status === 'bending').length}
                    {tab.value === 'Banned' &&
                      customers.filter((user:{ status: string;}) => user.status === 'banned').length}
                    {tab.value === 'rejected' &&
                      customers.filter((user:{ status: string;}) => user.status === 'rejected').length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
          />

          {canReset && (
            <UserTableFiltersResult
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
              rowCount={customers.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  customers.map((row: { id: string;}) => row.id)
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
                  rowCount={customers.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      customers.map((row: { id: string;}) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(String(row.id))}
                        onSelectRow={() => table.onSelectRow(String(row.id))}
                        onDeleteRow={() => handleDeleteRow(String(row.id))}
                        onEditRow={() => handleEditRow(String(row.id))}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, customers.length)}
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

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUserItem[] | any;
  comparator: (a: any, b: any) => number;
  filters: {
    name: string;
    status: string;
  };
}) {
  const { name, status } = filters;

  const stabilizedThis = inputData.map((el: any, index: number) => [el, index] as const);

  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user: IUserItem) => user?.name?.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: IUserItem) => (user.status ? 'Active' : 'Banned') === status);
    console.log(inputData, status);
    
  }

  return inputData;
}
