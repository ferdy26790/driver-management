import React from 'react';
import CardLabel from './CardLabel';
import styles from './card.module.css';

export default function Card({
  id,
  name,
  email,
  phone,
  dob,
  picture
}) {
  const column = [
    {
      label: 'Nama Driver',
      value: `${name.first}, ${name.last}`,
    },
    {
      label: 'Telepon',
      value: `${phone}`,
    },
    {
      label: 'Email',
      value: `${email}`,
    },
    {
      label: 'Tanggal Lahir',
      value: `${new Date(dob.date).toLocaleDateString()}`,
    }
  ]
  return (
    <div className={`${styles.root} card border-secondary mb-3`}>
      <div className="card-header">Header</div>
      <div className="card-body">
        <div className={styles.avatarThumbnail}>
          <img src={picture.thumbnail} alt="driver-pic"/>
        </div>
        <div className={styles.labelContainer}>
          {column.map((c, idx) => (
            <CardLabel
              key={Number(idx)}
              label={c.label}
              value={c.value}
            />
            )
          )}
        </div>
      </div>
    </div>
  )
}
