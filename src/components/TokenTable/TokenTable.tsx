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
    let formattedData = useMemo(() => 
        items.map((item) => formatData(item)), 
    [items])
    let [processedData, setProcessedData] = useState<DataItem[]>([])
    let [sortField, setSortField] = useState(sortColumnName)
    let [activeFilterMenu, setActiveFilterMenu] = useState('') // '' when no filter select is active
    let [filter, setFilter] = useState<Filter>(filters)
    let filterValues = {
        status: ['', ...Array.from(new Set(items.map((item) => item.status)))],
        type: ['', ...Array.from(new Set(items.map((item) => item.type)))]
    }
    let dataRows = useMemo(() => processedData.map(({id, status, ...itemValues}, itemIndex) => (
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
    )), [processedData, onBuy])

    useEffect(() => {
        setProcessedData(onSort(sortColumnName, onFilter(filter, [...formattedData])))
    }, [formattedData])

    return (
        <Styled.Table cellSpacing={0}>
            <Styled.TableHead>
                <Styled.TableRow>
                    {columns.map((col, index) => (
                        <Styled.TableCell 
                            key={index}
                        >
                            <Styled.CellContent>
                                {col.filterParam && 
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
                                        {filter[col.filterParam] || 'All'}
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
                                        let sortedData = onSort(sortParam, [...processedData])
                                        setProcessedData(sortedData)
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
                            {(col.filterParam && activeFilterMenu === col.name) &&
                            <Styled.FilterSelect>
                                {filterValues[col.filterParam].map((val, index) => (
                                    <Styled.FilterOption
                                        onClick={() => {
                                            if (!col.filterParam) {
                                                return
                                            }
                                            let newFilter = {
                                                ...filter,
                                                [col.filterParam]: val
                                            }
                                            setFilter(newFilter)
                                            let filteredData = onFilter(newFilter, [...items])
                                            let sortedAndFilteredData = onSort(sortField, filteredData)
                                            setProcessedData(sortedAndFilteredData)
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
