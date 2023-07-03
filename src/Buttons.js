import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { state: { page, totalPages, loading }, setPage } = useGlobalContext();

  return (
    <div className='btn-container'>
      <button disabled={loading} onClick={() => setPage(page - 1)}>
        prev
      </button>
      <p>{page + 1} of {totalPages}</p>
      <button disabled={loading} onClick={() => setPage(page + 1)}>
        next
      </button>
    </div>
  )
}

export default Buttons
