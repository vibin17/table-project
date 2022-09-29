import styled, { css } from 'styled-components';
import { FieldStatuses } from '../../types/types';

export const Table = styled.table`
     border-spacing: 0 10px;
`

export const TableHead = styled.thead`
    
`

export const TableBody = styled.tbody`
    
`

export const TableRow = styled.tr<{ status?: FieldStatuses | null }>`
    background: ${({ status = null }) => {
        if (status) {
            return bgColors.get(status)
        }
    }};
`

export const TableCell = styled.td`
    font: normal 14px 'Saira';
    padding: 0 10px;
    color: rgb(161, 161, 161);
    white-space: nowrap;
    position: relative;
    
    ${TableBody} & {
        color: rgb(0, 0, 0);
        padding: 14px 14px;
        font-weight: bold;
    }
`

export const CellContent = styled.div<{ status?: FieldStatuses | null }>`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    gap: 0.9em;

    ${TableBody} ${TableCell}:first-child & {
        gap: 0.7em;
    }

    ${TableBody} ${TableCell}:last-child & {
        gap: 150px;
        justify-content: space-between;
    }

    ${({ status }) => status && css`
        &::before {
            content: '';
            display: inline-block;
            background: ${circleColors.get(status)};
            height: 1em;
            width: 1em;
            border-radius: 50%;
        }
    `}
`

export const BuyButton = styled.button`
    outline: 0;
    background: transparent;
    border: solid 1px rgb(153, 18, 158);
    color: rgb(153, 18, 158);
    transition: all .2s;
    font: bold 14px 'Saira';
    border-radius: 8px;
    padding: 6px 15px;
    &:hover {
        background: rgb(153, 18, 158);
        color: rgb(255, 255, 255);
    }
`

export const FilterSection = styled.div`
    display: flex;
    height: 100%;
    align-items: flex-start;

    &::before {
            display: block;
            content: '';
            border: solid rgb(161, 161, 161);
            border-width: 0 2px 2px 0;
            width: 6px;
            height: 6px;
            transform: rotate(45deg);
        }
`

export const SortSection = styled.div<{ sortMode?: string}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 1px;

    &::before, &::after {
            display: block;
            content: '';
            width: 0;
            height: 0;
            border-style: solid;
            border-color: transparent;
        }

    &::before {
        border-width: 0 4px 4px 4px;
        border-bottom-color: ${({ sortMode = ''}) => {
            if (sortMode === 'asc') {
                return 'rgb(0, 0, 0)'
            }
            return 'rgb(161, 161, 161)'
        }};
    }

    &::after {
        border-width: 4px 4px 0 4px;
        border-top-color: ${({ sortMode = ''}) => {
            if (sortMode === 'desc') {
                return 'rgb(0, 0, 0)'
            }
            return 'rgb(161, 161, 161)'
        }};
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