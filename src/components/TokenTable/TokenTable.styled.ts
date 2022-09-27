import styled from 'styled-components';
import { FieldStatuses } from '../../types/types';

export const Table = styled.table`
    
`

export const TableHead = styled.thead`
    
`

export const TableBody = styled.tbody`
    
`

export const TableRow = styled.tr<{ status?: FieldStatuses | null}>`
    background-color: ${({ status = null }) => {
        if (status) {
            return colors.get(status)
        }
    }};
`

export const TableCell = styled.td`
    font: bold 12px 'Quicksand';
    padding: 20px 10px;
    color: rgb(195, 197, 197);
    
    ${TableBody} & {
        color: rgb(0, 0, 0);
    }
`

const colors = new Map<FieldStatuses, string>([
    [FieldStatuses.GREEN, 'rgba(241, 254, 245, 255)'],
    [FieldStatuses.RED, 'rgba(255, 246, 247, 255)'],
    [FieldStatuses.YELLOW, 'rgba(253, 255, 231, 255)'],
])