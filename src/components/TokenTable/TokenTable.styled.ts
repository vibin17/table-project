import styled, { css } from 'styled-components';
import { FieldStatuses } from '../../types/types';

export const Table = styled.table`
     border-spacing: 0 15px;
`

export const TableHead = styled.thead`
    
`

export const TableBody = styled.tbody`
    
`

export const TableRow = styled.tr<{ status?: FieldStatuses | null }>`
    background-color: ${({ status = null }) => {
        if (status) {
            return bgColors.get(status)
        }
    }};
`

export const TableCell = styled.td`
    font: normal 16px 'Quicksand';
    padding: 0 10px;
    color: rgb(161, 161, 161);
    
    ${TableBody} & {
        color: rgb(0, 0, 0);
        padding: 20px 10px;
        font-weight: bold;
    }
`

export const CellContent = styled.div<{ status?: FieldStatuses | null }>`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    ${({ status }) => status &&
        css`
            &::before {
                content: '';
                display: inline-block;
                background-color: ${circleColors.get(status)};
                height: 1em;
                width: 1em;
                border-radius: 50%;
            }
        `
    }

`

export const BuyButton = styled.button`
    outline: 0;
    background: transparent;
    border: solid 1px rgb(153, 18, 158);
    color: rgb(153, 18, 158);
    transition: all .2s;
    font: bold 16px 'Quicksand';
    border-radius: 15%;
    padding: 6px 14px;
    &:hover {
        background: rgb(153, 18, 158);
        color: rgb(255, 255, 255);
    }
`

const bgColors = new Map<FieldStatuses, string>([
    [FieldStatuses.GREEN, 'rgba(241, 254, 245, 255)'],
    [FieldStatuses.RED, 'rgba(255, 246, 247, 255)'],
    [FieldStatuses.YELLOW, 'rgba(253, 255, 231, 255)'],
])

const circleColors = new Map<FieldStatuses, string>([
    [FieldStatuses.GREEN, 'rgba(15, 230, 56, 255)'],
    [FieldStatuses.RED, 'rgba(244, 99, 73, 255)'],
    [FieldStatuses.YELLOW, 'rgba(245, 183, 12, 255)'],
])