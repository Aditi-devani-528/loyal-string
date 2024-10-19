import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PacketTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { branch, department, firstName, lastName, email, contact, street, city, state, zipCode, country, bankName, accountNumber, ifscCode, panCard, aadharCard, dob, joiningDate, gender, workLocation, role, reportingTo, username, password } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{branch}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{department}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firstName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{contact}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{street}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{city}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{state}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{zipCode}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{country}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bankName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{accountNumber}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{ifscCode}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{panCard}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{aadharCard}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dob}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{joiningDate}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{gender}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{workLocation}</TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{reportingTo}</TableCell> */}

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{username}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{password}</TableCell>

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

PacketTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
