import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TokenTable from './components/TokenTable/TokenTable';
import { getInputData } from './data/data';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import { DataItem, Filter } from './types/types';

function App() {
  const onSort = (fieldName: string, data: DataItem[]) => {
    let factor = 1
    if (fieldName.split(/-/).length > 1) {
      factor = -1
      fieldName = fieldName.slice(1)
    } if (fieldName === 'Project') {
      return data.sort((a, b) => //sorted by proj name
        factor * (a.name > b.name ? 1 : -1)
      )
    } if (fieldName === 'Volume') {
      return data.sort((a, b) => {
        let numbA = parseInt(a.volume.toString().replaceAll('$', '').replaceAll(new RegExp(/\s/, 'g'), ''))
        let numbB = parseInt(b.volume.toString().replaceAll('$', '').replaceAll(new RegExp(/\s/, 'g'), ''))
        return factor * (
          numbA > numbB ? 1 : -1)
      })
    }
    return data
  }

  const onFilter = (filter: Filter, data: DataItem[]) => {
    let filteredData = data
      .filter((item) => filter.status === '' || item.status === filter.status)
      .filter((item) => filter.type === '' || item.type === filter.type)
    return filteredData
  }

  const onBuy = (id: number) => {
    alert(`Project №${id}`)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path='/'
              element={
                <TokenTable 
                  items={getInputData()} 
                  sortColumnName='' 
                  filters={{
                    status: '',
                    type: ''
                  }}
                  onSort={onSort}
                  onFilter={onFilter}
                  onBuy={onBuy}
                />
              }
            />
            

            <Route path='/project/:id'
              element={<ProjectPage/>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
