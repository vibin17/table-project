import styled, { css } from 'styled-components';

export const Table = styled.table`
    border-spacing: 0 10px;
    width: 100%;
`

export const TableHead = styled.thead`
    
`

export const TableBody = styled.tbody`
    
`

export const TableRow = styled.tr<{ status?: string }>`
    background: ${({ status = null }) => {
        if (status) {
            return bgColors.get(status)
        }
    }};
    transition: all .2s;

    ${TableBody} &:hover {
        cursor: pointer;
        filter: invert(3%);
    }
`

export const TableCell = styled.td`
    font: normal 14px 'Saira';
    padding: 0 14px;
    color: rgb(161, 161, 161);
    white-space: nowrap;
    vertical-align: text-top;
    
    ${TableBody} & {
        color: rgb(0, 0, 0);
        padding: 14px;
        font-weight: bold;
    }
`

export const CellContent = styled.div<{ status?: string }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.3em;

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

export const CellText = styled.div<{ sortable?: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5em;
    transition: all .2s;

    ${({ sortable = false }) => sortable && css`
        &:hover {
            filter: invert(40%);
            cursor: pointer;
        }`
    }
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
        cursor: pointer;
    }
`

export const FilterSection = styled.div<{ active: boolean }>`
    display: flex;
    height: 100%;
    align-items: center;
    gap: 0.5em;
    padding-right: 5px;
    position: relative;
    transition: all .2s;
    border-radius: 5px;
    padding: 0 5px;
    cursor: pointer;
    ${({ active }) => {
        let size = '6px'
        return css`
        &::before, &::after {
            display: block;
            content: '';
            width: 0;
            height: 0;
            transition: all .2s;
            border-style: solid;
            border-color: transparent;
            border-width: ${size} ${size} 0 ${size};
            border-top-color: rgb(0, 0, 0);

            ${active && css`
                transform: rotate(180deg);
            `}
        }

        &::after {
            position: absolute;
            border-top-color: rgb(255, 255, 255);
            top: ${size};
            ${active && css`
                top: auto;
                bottom: ${size};
            `}
        }
        `
    }}

    &:hover {
        background: rgb(255, 255, 255);
        filter: invert(10%);
    }
`

export const Filters = styled.div`
    color: rgb(255, 255, 255);
    background: rgb(161, 161, 161);
    padding: 0 5px;
    border-radius: 6px;
    text-transform: capitalize;
`

export const FilterSelect = styled.div`
    padding-top: 6px;
    max-height: 200px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

export const FilterOption = styled.div`
    color: rgb(0, 0, 0);
    text-transform: capitalize;

    &:hover {
        cursor: pointer;
        filter: invert(30%);
    }
`

export const SortSection = styled.div<{ sortMode?: string, size?: number }>`
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
    ${({ size = 4, sortMode = '' }) => css`
        &::before {
            border-width: 0 ${size}px ${size}px ${size}px;
            border-bottom-color: ${() => {
                if (sortMode === 'desc') {
                    return 'rgb(0, 0, 0)'
                }
                return 'rgb(161, 161, 161)'
            }};
        }

        &::after {
            border-width: ${size}px ${size}px 0 ${size}px;
            border-top-color: ${() => {
                if (sortMode === 'asc') {
                    return 'rgb(0, 0, 0)'
                }
                return 'rgb(161, 161, 161)'
            }};
        }
    `}

`

const bgColors = new Map<string, string>([
    ['green', 'rgba(241, 254, 245, 255)'],
    ['red', 'rgba(255, 246, 247, 255)'],
    ['yellow', 'rgba(253, 255, 231, 255)'],
])

const circleColors = new Map<string, string>([
    ['green', 'rgba(15, 230, 56, 255)'],
    ['red', 'rgba(244, 99, 73, 255)'],
    ['yellow', 'rgba(245, 183, 12, 255)'],
])