import { useCallback, useEffect, useMemo, useState } from 'react';
import { Column, DataItem, Filter, FormatedData, getColumns } from '../../types/types';
import * as Styled from './TokenTable.styled';

type props = {
    items: DataItem[]
    sortColumnName: string
    filters: Filter | null
    onSort: (fieldName: string) => void
    onFilter: () => void
    onBuy: (id: number) => void
}

const TokenTable = ({ items, sortColumnName, onSort, onBuy }: props) => {
    let [data, setData] = useState<DataItem[]>([])
    let [sortColumn, setSortColumn] = useState('')
    let formatData = useCallback((data: DataItem) => {
        let formattedData: DataItem = { ...data }
        formattedData.conditions = formattedData.conditions.replace(/x/, '× ').replace(/,/, ', ')
        formattedData.roi = `${formattedData.roi} %`
        let volumeMatchResults = formattedData.volume.toString().split('').reverse().join('').match(/\d{3}/g)?? []
        formattedData.volume = `$ ${formattedData.volume.toString().slice(0, -3 * volumeMatchResults.length)} 
            ${volumeMatchResults.reverse().reduce((prev, cur) => `${prev} ${cur.split('').reverse().join('')}`, '')}`
        formattedData.hedge = `${formattedData.hedge} %`
        return formattedData
    }, [])
    let columns = getColumns()
    let dataRows = useMemo(() => data.map(({id, status, ...itemValues}, itemIndex) => (
            <Styled.TableRow key={itemIndex} status={status}>
                {Object.values(itemValues).map((value, valueIndex) => (
                    <Styled.TableCell key={valueIndex}>
                        <Styled.CellContent status={valueIndex === 0? status : null}>
                            {value}
                            {valueIndex === 6 &&
                                <Styled.BuyButton onClick={() => {
                                    onBuy(id)
                                }}>
                                    Buy
                                </Styled.BuyButton>
                            }
                        </Styled.CellContent>
                    </Styled.TableCell>
                ))}
            </Styled.TableRow>
    )), [data])

    useEffect(() => {
        setData(items.map((item) => formatData(item)))
    }, [items])
    useEffect(() => {
        setSortColumn(sortColumnName)
    }, [sortColumnName])
    return (
        <Styled.Table cellSpacing={0}>
            <Styled.TableHead>
                <Styled.TableRow>
                    {columns.map((col, index) => (
                        <Styled.TableCell key={index}>
                            <Styled.CellContent>
                                {col.filterable && 
                                <Styled.FilterSection>
                                    
                                </Styled.FilterSection>}
                                {col.name}
                                {col.sortable && 
                                <Styled.SortSection 
                                    sortMode={sortColumn === col.name? 'asc' :
                                        sortColumn === `-${col.name}`? 'desc' : 'none'}
                                />}
                            </Styled.CellContent>
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
