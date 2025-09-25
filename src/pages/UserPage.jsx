import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import Modal from '../components/Modal'

function Field({ label, value }) {
  if (!value && value !== 0) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 8 }}>
      <div style={{ color: '#666' }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  )
}

function Card({ item, onView }) {
  const hasPhoto = !!(item.photoUrl && item.photoUrl.trim().toLowerCase() !== 'na')
  return (
    <div className="card" style={{ padding: 12, borderRadius: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 88, flex: '0 0 auto' }}>
          {hasPhoto ? (
            <img src={item.photoUrl} alt="photo" style={{ width: 88, height: 88, objectFit: 'cover', borderRadius: 10 }} />
          ) : (
            <div style={{ width: 88, height: 88, borderRadius: 10, background: '#f0f0f0', display: 'grid', placeItems: 'center', color: '#888', textAlign: 'center', padding: 6 }}>Photo not added</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{item.name}</div>
          <div style={{ color: '#666', marginTop: 4 }}>
            {[item.gender, item.age ? `${item.age} yrs` : null, item.height].filter(Boolean).join(' · ')}
          </div>
          <div style={{ color: '#444', marginTop: 6 }}>
            {[item.education, item.profession].filter(Boolean).join(' · ')}
          </div>
          <div style={{ color: '#666', marginTop: 6 }}>
            {[item.residence, item.residenceCountry].filter(Boolean).join(', ')}
          </div>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => onView(item)}>View</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [filters, setFilters] = useState({ name: '', caste: '', residence: '', gender: '', status: 'Active' })
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 20

  async function fetchItems() {
    setLoading(true)
    setError('')
    try {
      const res = await api.listBiodata(filters, page, limit)
      setItems(res.items)
      setTotal(res.total)
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  function updateFilter(patch) {
    setFilters(prev => ({ ...prev, ...patch }))
    setPage(1)
  }

  return (
    <div>
      <header style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Matches</h1>
      </header>

      <div className="card" style={{ marginBottom: 12 }}>
        <h3 style={{ marginTop: 0 }}>Filters</h3>
        <div className="grid grid-3">
          <div>
            <label>Name</label>
            <input placeholder="Name" value={filters.name} onChange={e => updateFilter({ name: e.target.value })} />
          </div>
          <div>
            <label>Caste</label>
            <input placeholder="Caste" value={filters.caste} onChange={e => updateFilter({ caste: e.target.value })} />
          </div>
          <div>
            <label>Residence</label>
            <input placeholder="City/State" value={filters.residence} onChange={e => updateFilter({ residence: e.target.value })} />
          </div>
          <div>
            <label>Gender</label>
            <select value={filters.gender} onChange={e => updateFilter({ gender: e.target.value })}>
              <option value="">Any</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <input value={filters.status} onChange={e => updateFilter({ status: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => { setPage(1); fetchItems() }}>Apply</button>
        </div>
      </div>

      {error && (
        <div className="card" style={{ borderLeft: '4px solid #dc3545', marginBottom: 12 }}>{error}</div>
      )}

      {loading ? (
        <div className="card">Loading...</div>
      ) : (
        <>
          <div className="grid grid-3">
            {items.map((it) => (
              <Card key={it._id} item={it} onView={setSelected} />
            ))}
            {items.length === 0 && (
              <div className="card">No results</div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <div>Page {page} of {Math.max(1, Math.ceil(total / limit))} — Total {total}</div>
            <div className="actions">
              <button className="secondary" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
              <button onClick={() => setPage(p => (p * limit < total ? p + 1 : p))} disabled={page * limit >= total}>Next</button>
            </div>
          </div>
        </>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || 'Details'}>
        {selected && (
          <div className="grid" style={{ gap: 12 }}>
            <div style={{ display: 'flex', gap: 16 }}>
              {selected.photoUrl && selected.photoUrl.trim().toLowerCase() !== 'na' ? (
                <img src={selected.photoUrl} alt="photo" style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 10 }} />
              ) : (
                <div style={{ width: 140, height: 140, borderRadius: 10, background: '#f0f0f0', display: 'grid', placeItems: 'center', color: '#888', textAlign: 'center', padding: 8 }}>Photo not added</div>
              )}
              <div style={{ alignSelf: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{selected.name}</div>
                <div style={{ color: '#666' }}>{[selected.gender, selected.age ? `${selected.age} yrs` : null, selected.height].filter(Boolean).join(' · ')}</div>
              </div>
            </div>
            <div className="grid" style={{ gap: 8 }}>
              <Field label="S. No" value={selected.serialNo} />
              <Field label="Complexion" value={selected.complexion} />
              <Field label="Caste" value={selected.caste} />
              <Field label="Residence" value={[selected.residence, selected.residenceCountry].filter(Boolean).join(', ')} />
              <Field label="Education" value={selected.education} />
              <Field label="Profession" value={selected.profession} />
              <Field label="Marital Status" value={selected.maritalStatus} />
              <Field label="Family's Detail" value={selected.familyDetails} />
              <Field label="Contact No." value={selected.contactNo} />
              <Field label="Biodata Submitted" value={selected.biodataSubmittedDate ? new Date(selected.biodataSubmittedDate).toLocaleDateString() : ''} />
              <Field label="Status" value={selected.status} />
              <Field label="Forward To" value={selected.forwardTo} />
              <Field label="Biodata Submitted By" value={selected.biodataSubmittedBy} />
              <div style={{ height: 8 }} />
              <div style={{ fontWeight: 700 }}>Preferences</div>
              <Field label="Preferred Age" value={selected.prefAge} />
              <Field label="Preferred Height" value={selected.prefHeight} />
              <Field label="Preferred Residence" value={selected.prefResidence} />
              <Field label="Preferred Education" value={selected.prefEducation} />
              <Field label="Preferred Marital Status" value={selected.prefMaritalStatus} />
              <Field label="Preferred Caste" value={selected.prefCaste} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
