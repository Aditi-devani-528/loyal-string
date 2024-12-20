import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';



// ----------------------------------------------------------------------

export default function MainVendorTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { vendorName, firmName,status, firmDetails, email, contact, panCard, gstNumber , type , onlineStatus,balanceAmount,advanceAmount,fineGold,fineSilver,addToCustomer,addressDetails} = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/*<TableCell sx={{ display: 'flex', alignItems: 'center' }}>*/}

        {/*  <ListItemText*/}
        {/*    primary={vendorName}*/}
        {/*    primaryTypographyProps={{ typography: 'body2' }}*/}
        {/*    secondaryTypographyProps={{*/}
        {/*      component: 'span',*/}
        {/*      color: 'text.disabled',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</TableCell>*/}

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{vendorName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firmName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{onlineStatus}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{contact}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>


        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>



      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

MainVendorTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
