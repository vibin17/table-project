import { useMemo } from 'react';
import { TableItemData } from '../../types/types';
import * as Styled from './TokenTable.styled';

type props = {
    items: TableItemData[],
    sortColumn?: string,
    filters?: {},
    onSort?: () => void,
    onFilter?: () => void,
    onBuy?: () => void
}

const TokenTable = ({ items }: props) => {
    let dataRows = useMemo(() => 
        items.map(({id, status, ...itemValues}, itemIndex) => (
            <Styled.TableRow key={itemIndex} status={status}>
                {Object.values(itemValues).map((value, valueIndex) => (
                    <Styled.TableCell key={valueIndex}>
                        <Styled.CellContent status={valueIndex === 0? status : null}>
                            {value}
                            {valueIndex == 6 &&
                                <Styled.BuyButton>
                                    Buy
                                </Styled.BuyButton>
                            }
                        </Styled.CellContent>
                    </Styled.TableCell>
                ))}
            </Styled.TableRow>
        )), 
    [items])
    
    return (
        <Styled.Table cellSpacing={0}>
            <Styled.TableHead>
                <Styled.TableRow>
                    <Styled.TableCell>
                        Project
                    </Styled.TableCell>
                    <Styled.TableCell>
                        Token type
                    </Styled.TableCell>
                    <Styled.TableCell>
                        Conditions
                    </Styled.TableCell>
                    <Styled.TableCell>
                        Volume
                    </Styled.TableCell>
                    <Styled.TableCell>
                        ROI
                    </Styled.TableCell>
                    <Styled.TableCell>
                        Free float
                    </Styled.TableCell>
                    <Styled.TableCell>
                        Insurance hedge
                    </Styled.TableCell>
                </Styled.TableRow>
            </Styled.TableHead>
            <Styled.TableBody>
                {dataRows}
            </Styled.TableBody>    
        </Styled.Table>
    )
}

export default TokenTable
