import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

type Props = {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: any[];
  numSelected: number;
  onSort: (id: string) => void;
  onSelectAllRows: (checked: any) => void


};
export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllRows,
  onSort,
}: Props) {
  return (
    <TableHead>
      <TableRow>

        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth, }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id)}
              sx={{display: 'flex', alignItems: 'center', justifyContent: headCell.label === 'Date' ? 'center' : 'flex-start'}}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
