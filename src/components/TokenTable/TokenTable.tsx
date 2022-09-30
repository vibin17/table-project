import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatData, getColumns } from '../../data/data';
import { DataItem, Filter } from '../../types/types';
import * as Styled from './TokenTable.styled';

type props = {
    items: DataItem[]
    sortColumnName: string
    filters: Filter
    onSort: (fieldName: string, data: DataItem[]) => DataItem[]
    onFilter: (filters: Filter, data: DataItem[]) => DataItem[]
    onBuy: (id: number) => void
}

const TokenTable = ({ items, sortColumnName, filters, onSort, onFilter, onBuy }: props) => {
    let columns = getColumns()
    let nav = useNavigate()
    let [data, setData] = useState<DataItem[]>([])
    let [sortField, setSortField] = useState(sortColumnName)
    let [activeFilterMenu, setActiveFilterMenu] = useState('') // '' when no filter select is active
    let [filter, setFilter] = useState<Filter>(filters)
    let filterValues = {
        status: ['', ...Array.from(new Set(items.map((item) => item.status)))],
        type: ['', ...Array.from(new Set(items.map((item) => item.type)))]
    }
    let dataRows = useMemo(() => data.map(({id, status, ...itemValues}, itemIndex) => (
            <Styled.TableRow 
                key={itemIndex} 
                status={status}
                onClick={() => {
                    nav(`/project/${id}`)
                }}
            >
                {Object.values(itemValues).map((value, valueIndex) => (
                    <Styled.TableCell key={valueIndex}>
                        <Styled.CellContent status={valueIndex === 0? status : ''}>
                            <Styled.CellText> 
                                {value}
                            </Styled.CellText>
                            {valueIndex === 6 &&
                            <Styled.BuyButton 
                                onClick={(event) => {
                                    event.stopPropagation()
                                    onBuy(id)
                                }}
                            >
                                Buy
                            </Styled.BuyButton>
                            }
                        </Styled.CellContent>
                    </Styled.TableCell>
                ))}
            </Styled.TableRow>
    )), [data, onBuy])

    useEffect(() => {
        setData(items.map((item) => formatData(item)))
    }, [items])

    return (
        <Styled.Table cellSpacing={0}>
            <Styled.TableHead>
                <Styled.TableRow>
                    {columns.map((col, index) => (
                        <Styled.TableCell 
                            key={index}
                        >
                            <Styled.CellContent>
                                {col.filterable && 
                                <Styled.FilterSection 
                                    active={col.name === activeFilterMenu}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        if (col.name === activeFilterMenu) {
                                            setActiveFilterMenu('')
                                            return
                                        }
                                        setActiveFilterMenu(col.name)
                                    }}
                                >
                                    <Styled.Filters>
                                        {col.name === 'Project' && filter.status 
                                            || col.name === 'Token type' && filter.type 
                                            || 'All'}
                                    </Styled.Filters>
                                </Styled.FilterSection>}
                                <Styled.CellText
                                    sortable={col.sortable}
                                    onClick={() => {
                                        if (!col.sortable) {
                                            return
                                        }
                                        let sortParam = col.name
                                        if (sortParam === sortField) {
                                            sortParam = `-${sortParam}`
                                        }
                                        setSortField(sortParam)
                                        let sortedData = onSort(sortParam, [...data])
                                        setData(sortedData)
                                    }}
                                > 
                                    {col.name}
                                    {col.sortable && 
                                    <Styled.SortSection 
                                        sortMode={sortField === col.name? 'asc' :
                                            sortField === `-${col.name}`? 'desc' : ''}
                                    />}
                                </Styled.CellText>
                            </Styled.CellContent>
                            {activeFilterMenu === col.name && col.name === 'Project' &&
                            <Styled.FilterSelect>
                                {filterValues.status.map((val, index) => (
                                    <Styled.FilterOption
                                        onClick={() => {
                                            let newFilter = {
                                                ...filter,
                                                status: val
                                            }
                                            setFilter(newFilter)
                                            let filteredData = onFilter(newFilter, [...items])
                                            let sortedAndFilteredData = onSort(sortField, [...filteredData])
                                            setData(sortedAndFilteredData)
                                            setActiveFilterMenu('')                                            
                                        }}
                                        key={index}
                                    >
                                        {val || 'Clear filter'}
                                    </Styled.FilterOption>
                                ))}    
                            </Styled.FilterSelect>}
                            {activeFilterMenu === col.name && col.name === 'Token type' &&
                            <Styled.FilterSelect>
                                {filterValues.type.map((val, index) => (
                                    <Styled.FilterOption
                                        onClick={() => {
                                            let newFilter = {
                                                ...filter,
                                                type: val
                                            }
                                            setFilter(newFilter)
                                            let filteredData = onFilter(newFilter, [...items])
                                            let sortedAndFilteredData = onSort(sortField, [...filteredData])
                                            setData(sortedAndFilteredData)
                                            setActiveFilterMenu('')  
                                        }}
                                        key={index}
                                    >
                                        {val || 'Clear filter'}
                                    </Styled.FilterOption>
                                ))}    
                            </Styled.FilterSelect>}
                        </Styled.TableCell>
                    ))}
                </Styled.TableRow>
            </Styled.TableHead>
            <Styled.TableBody>
                {dataRows}
            </Styled.TableBody>    
        </Styled.Table>
    )
}

export default TokenTable
