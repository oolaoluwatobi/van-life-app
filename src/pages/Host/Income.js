import React from 'react'

const Income = () => {

  const transanctionData = [
    {'value': 720, 'date': "De 1, '22", 'id': '1'},
    {'value': 560, 'date': "No 10, '22", 'id': '2'},
    {'value': 980, 'date': "No 23, '22", 'id': '3'}
  ]

  const transactionElements = transanctionData.map(transaction => (
    <div key={transaction.id} className='flex bg-white my-5 p-5 rounded'>
      <h3 className='text-2xl font-semibold'>${transaction.value}</h3>
      <p className='ml-auto'>{transaction.date} </p>
    </div>
  ))
  
  return (
    <div className='mb-40'>
      <h1 className='text-3xl font-bold'>Income</h1>
      <p className='mt-5'>Last <span className='font-medium underline underline-offset-2'>30 days</span></p>
      <h3 className='my-5 text-4xl font-bold'>$2,260</h3>
      <img src='/images/income-graph.png' alt="graph-img" className='rounded cursor-none select-none'/>
      <div className='mt-10 flex'>
        <h4 className='text-xl font-semibold'>Your transactions (3)</h4>
      <p className='my-auto ml-auto'>Last <span className='font-medium underline underline-offset-2'>30 days</span></p>
      </div>

      <div className='mt-5'>{transactionElements}</div>
    </div>
    
  )
}

export default Income