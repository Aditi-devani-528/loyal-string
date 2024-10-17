import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
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
import { fData } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { department, firstName, lastName, email, contact,addressDetails, bankDetails, panCard, aadharCard, dob, joiningDate, gender, workLocation } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firstName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{contact}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{addressDetails?.street}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{addressDetails?.city}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{addressDetails?.state}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{addressDetails?.country}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{addressDetails?.zipCode}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{aadharCard}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{panCard}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(dob)}</TableCell>
        
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{workLocation}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{department}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bankDetails?.bankName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bankDetails?.accountNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bankDetails?.ifscCode}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(joiningDate)}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
