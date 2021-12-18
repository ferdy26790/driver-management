import React from 'react'
import styles from './pagination.module.css'

export default function index({page, totalPage, onHandlePagination}) {
  const disablePrev = page === 1
  const disableNext = page >= totalPage
  return (
    <div className={styles.root}>
      <button
        type="button"
        className={`btn btn-primary ${disablePrev ? 'disabled' : ''}`}
        onClick={() => onHandlePagination('prev')}
      >
        Prev Page
      </button>
      <button
        type="button"
        className={`btn btn-primary ${disableNext ? 'disabled' : ''}`}
        onClick={() => onHandlePagination('next')}
      >
        Next Page
      </button>
    </div>
  )
}
