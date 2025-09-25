import React, { useEffect, useState } from 'react'
import { api } from '../services/api'
import BiodataTable from '../components/BiodataTable'
import BiodataForm from '../components/BiodataForm'
import Modal from '../components/Modal'

export default function AdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ name: '', caste: '', residence: '', gender: '', status: '' })
  const [openEdit, setOpenEdit] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 15

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
  }, [])

  // When filters change via inputs, update state and reset to page 1
  function updateFilter(patch) {
    setFilters(prev => ({ ...prev, ...patch }))
    setPage(1)
    fetchItems()
  }

  async function handleCreate(payload) {
    setError('')
    try {
      await api.createBiodata(payload)
      await fetchItems()
      setOpenAdd(false)
    } catch (e) {
      setError(e.message || 'Failed to create')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this record?')) return
    try {
      await api.deleteBiodata(id)
      await fetchItems()
    } catch (e) {
      setError(e.message || 'Failed to delete')
    }
  }

  async function handleEdit(item) {
    setEditingItem(item)
    setOpenEdit(true)
  }

  async function handleUpdate(payload) {
    setError('')
    try {
      await api.updateBiodata(editingItem._id, payload)
      await fetchItems()
      setOpenEdit(false)
      setEditingItem(null)
    } catch (e) {
      setError(e.message || 'Failed to update biodata record')
    }
  }

  return (
    <div>
      <header style={{ marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0 }}>Admin</h1>
        <button onClick={() => setOpenAdd(true)}>Add New</button>
      </header>

      {error && (
        <div className="card" style={{ borderLeft: '4px solid #dc3545', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>Filters</h3>
        <div className="inline-filters">
          <div className="filter-item">
            <label>Name</label>
            <input value={filters.name} onChange={e => updateFilter({ name: e.target.value })} />
          </div>
          <div className="filter-item">
            <label>Caste</label>
            <input value={filters.caste} onChange={e => updateFilter({ caste: e.target.value })} />
          </div>
          <div className="filter-item">
            <label>Residence</label>
            <input value={filters.residence} onChange={e => updateFilter({ residence: e.target.value })} />
          </div>
          <div className="filter-item gender">
            <label>Gender</label>
            <select value={filters.gender} onChange={e => updateFilter({ gender: e.target.value })}>
              <option value="">Any</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="filter-item status">
            <label>Status</label>
            <input value={filters.status} onChange={e => updateFilter({ status: e.target.value })} />
          </div>
          <div className="filter-item apply">
            <button onClick={fetchItems}>Apply</button>
          </div>
        </div>
      </div>

      <Modal open={openEdit} onClose={() => { setOpenEdit(false); setEditingItem(null); }} title="Edit Biodata">
        <BiodataForm onSubmit={handleUpdate} initialData={editingItem} />
      </Modal>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Biodata List ({items.length})</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <BiodataTable items={items} onDelete={handleDelete} onEdit={handleEdit} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
              <div>Showing {items.length} of {total} biodata records</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
