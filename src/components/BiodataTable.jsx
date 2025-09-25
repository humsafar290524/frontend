import React from 'react'

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return ''
  return dt.toLocaleDateString()
}

export default function BiodataTable({ items, onDelete }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Height</th>
            <th>Complexion</th>
            <th>Caste</th>
            <th>Residence/Country</th>
            <th>Education</th>
            <th>Profession</th>
            <th>Marital Status</th>
            <th>Contact No.</th>
            <th>Status</th>
            <th>Submitted Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={15} style={{ textAlign: 'center', padding: 20 }}>No records</td>
            </tr>
          )}
          {items.map((it, idx) => (
            <tr key={it._id || idx}>
              <td>{it.serialNo ?? idx + 1}</td>
              <td style={{ minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {it.photoUrl && it.photoUrl.trim().toLowerCase() !== 'na' ? (
                    <img src={it.photoUrl} alt="photo" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: 6, background: '#f0f0f0', display: 'grid', placeItems: 'center', color: '#888', fontSize: 9, textAlign: 'center', padding: 2 }}>Photo not added</div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{it.residence}</div>
                  </div>
                </div>
              </td>
              <td>{it.gender}</td>
              <td>{it.age}</td>
              <td>{it.height}</td>
              <td>{it.complexion}</td>
              <td>{it.caste}</td>
              <td>{[it.residence, it.residenceCountry].filter(Boolean).join(', ')}</td>
              <td>{it.education}</td>
              <td>{it.profession}</td>
              <td>{it.maritalStatus}</td>
              <td>{it.contactNo}</td>
              <td>{it.status}</td>
              <td>{fmtDate(it.biodataSubmittedDate)}</td>
              <td className="actions">
                <button className="danger" onClick={() => onDelete?.(it._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
