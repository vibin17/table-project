import { Column, DataItem } from "../types/types"

export const getInputData: () => DataItem[] = () => [
    {
      id: 1, name: 'Pyshky.net', 
      status: 'green', type: 'TRST', 
      conditions: 'x2,6 months', 
      volume: 120000, roi: 4, 
      free: 20, hedge: 20
    },
    {
      id: 2, name: 'NFT-Flowershop', 
      status: 'yellow', type: 'THT', 
      conditions: 'x4,2 years', 
      volume: 80000, roi: 23, 
      free: 12, hedge: 0
    },
    {
      id: 4, name: 'Web3 P2P University', 
      status: 'red', type: 'TRST', 
      conditions: 'x2,1 years', 
      volume: 200000, roi: 6, 
      free: 1, hedge: 0
    }
  ]

export const getColumns: () => Column[] = () => [
    {
        name: 'Project',
        sortable: true,
        filterable: true
    },
    {
        name: 'Token type',
        filterable: true
    },
    {
        name: 'Conditions',
    },
    {
        name: 'Volume',
        sortable: true
    },
    {
        name: 'ROI'
    },
    {
        name: 'Free float'
    },
    {
        name: 'Insurance hedge'
    }
]

export const formatData = (data: DataItem) => {
    let formattedData: DataItem = { ...data }
    formattedData.conditions = formattedData.conditions.replace(/x/, '× ').replace(/,/, ', ')
    formattedData.roi = `${formattedData.roi} %`
    let volumeMatchResults = formattedData.volume.toString().split('').reverse().join('').match(/\d{3}/g)?? []
    formattedData.volume = `$ ${formattedData.volume.toString().slice(0, -3 * volumeMatchResults.length)} 
        ${volumeMatchResults.reverse().reduce((prev, cur) => `${prev} ${cur.split('').reverse().join('')}`, '')}`
    formattedData.hedge = `${formattedData.hedge} %`
    return formattedData
}