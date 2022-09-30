import React from 'react';
import './App.css';
import TokenTable from './components/TokenTable/TokenTable';
import { Container } from './shared-styles/shared';
import { FieldStatuses, DataItem, } from './types/types';

const data: DataItem[] = [
  {
    id: 1, name: 'Pyshky.net', 
    status: FieldStatuses.GREEN, type: 'TRST', 
    conditions: 'x2,6 months', 
    volume: 120000, roi: 4, 
    free: 20, hedge: 20
  },
  {
    id: 2, name: 'NFT-Flowershop', 
    status: FieldStatuses.YELLOW, type: 'THT', 
    conditions: 'x4,2 years', 
    volume: 80000, roi: 23, 
    free: 12, hedge: 0
  },
  {
    id: 4, name: 'Web3 P2P University', 
    status: FieldStatuses.RED, type: 'TRST', 
    conditions: 'x2,1 years', 
    volume: 200000, roi: 6, 
    free: 1, hedge: 0
  }
]

function App() {
  return (
    <div className="App">
      <Container>
        <TokenTable 
          items={data} 
          sortColumnName='' 
          filters={null}
          onSort={(fieldName: string) => {

          }}
          onFilter={() => {}}
          onBuy={(id: number) => {
            alert(id)
          }}/>
      </Container>
    </div>
  );
}

export default App;
