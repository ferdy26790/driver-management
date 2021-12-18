import React from 'react'
import styles from './cardLabel.module.css'

export default function CardLabel({
  label,
  value,
}) {
  return (
    <div className={styles.container}>
      <p className="text-secondary">{label}</p>
      <p className={`card-text ${styles.labelValue}`}><strong>{value}</strong></p>
    </div>
  )
}
