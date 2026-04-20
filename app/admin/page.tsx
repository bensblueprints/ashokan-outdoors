'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Download, RefreshCw, Eye, Trash2, LogIn, ChevronDown, X } from 'lucide-react'

interface Lead {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  preferred_date: string | null
  group_size: string | null
  message: string | null
  status: string
  notes: string | null
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  contacted: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  booked: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  completed: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const url = filter ? `/api/leads?status=${filter}` : '/api/leads'
    const res = await fetch(url, { headers: { 'x-admin-password': password } })
    if (res.ok) {
      setLeads(await res.json())
    }
    setLoading(false)
  }, [password, filter])

  useEffect(() => {
    if (!authenticated) return
    fetchLeads()
    const interval = setInterval(fetchLeads, 60000)
    return () => clearInterval(interval)
  }, [authenticated, fetchLeads])

  const handleLogin = async () => {
    const res = await fetch('/api/leads', { headers: { 'x-admin-password': password } })
    if (res.ok) {
      setAuthenticated(true)
      setLeads(await res.json())
    } else {
      alert('Invalid password')
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ status }),
    })
    fetchLeads()
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status })
  }

  const updateNotes = async (id: string) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ notes }),
    })
    fetchLeads()
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Delete this lead?')) return
    await fetch(`/api/leads/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password },
    })
    setSelectedLead(null)
    fetchLeads()
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Date', 'Group Size', 'Message', 'Status', 'Notes', 'Created']
    const rows = filteredLeads.map(l => [
      l.name, l.email, l.phone || '', l.service || '', l.preferred_date || '',
      l.group_size || '', l.message || '', l.status, l.notes || '', l.created_at,
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
  }

  const filteredLeads = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    (l.service || '').toLowerCase().includes(search.toLowerCase())
  )

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    booked: leads.filter(l => l.status === 'booked').length,
    conversion: leads.length ? Math.round((leads.filter(l => l.status === 'booked' || l.status === 'completed').length / leads.length) * 100) : 0,
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <h1 className="font-display text-2xl text-white mb-6 text-center">Admin Dashboard</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-forest-500 transition"
            />
            <button onClick={handleLogin} className="w-full btn-primary flex items-center justify-center gap-2">
              <LogIn size={18} /> <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-forest-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl md:text-3xl text-white">Ashokan Outdoors — Leads</h1>
          <div className="flex gap-2">
            <button onClick={fetchLeads} className="p-2 glass rounded-lg hover:bg-white/10 transition cursor-pointer">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={exportCSV} className="p-2 glass rounded-lg hover:bg-white/10 transition cursor-pointer">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: stats.total, color: 'text-white' },
            { label: 'New', value: stats.new, color: 'text-emerald-400' },
            { label: 'Booked', value: stats.booked, color: 'text-amber-400' },
            { label: 'Conversion', value: `${stats.conversion}%`, color: 'text-creek-400' },
          ].map(s => (
            <div key={s.label} className="glass rounded-xl p-4">
              <p className="text-sm text-white/50 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-forest-500 transition"
            />
          </div>
          <div className="relative">
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="booked">Booked</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>
        </div>

        {/* Table (desktop) / Cards (mobile) */}
        <div className="hidden md:block glass rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm text-white/50 font-medium">Name</th>
                <th className="text-left p-4 text-sm text-white/50 font-medium">Service</th>
                <th className="text-left p-4 text-sm text-white/50 font-medium">Date</th>
                <th className="text-left p-4 text-sm text-white/50 font-medium">Status</th>
                <th className="text-left p-4 text-sm text-white/50 font-medium">Created</th>
                <th className="text-right p-4 text-sm text-white/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-sm text-white/50">{lead.email}</p>
                  </td>
                  <td className="p-4 text-sm text-white/70">{lead.service || '—'}</td>
                  <td className="p-4 text-sm text-white/70">{lead.preferred_date || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${STATUS_COLORS[lead.status] || 'bg-white/10 text-white/50'}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white/50">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => { setSelectedLead(lead); setNotes(lead.notes || '') }} className="p-1.5 hover:bg-white/10 rounded transition cursor-pointer">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => deleteLead(lead.id)} className="p-1.5 hover:bg-red-500/20 rounded transition cursor-pointer text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <p className="text-center text-white/40 py-12">No leads found</p>
          )}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filteredLeads.map(lead => (
            <div key={lead.id} className="glass rounded-xl p-4" onClick={() => { setSelectedLead(lead); setNotes(lead.notes || '') }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-white">{lead.name}</p>
                  <p className="text-sm text-white/50">{lead.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${STATUS_COLORS[lead.status] || ''}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-sm text-white/70">{lead.service || 'No service specified'}</p>
              <p className="text-xs text-white/40 mt-1">{new Date(lead.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display text-xl text-white">{selectedLead.name}</h2>
                <button onClick={() => setSelectedLead(null)} className="p-1 hover:bg-white/10 rounded cursor-pointer"><X size={20} /></button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Email</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-creek-400 hover:underline">{selectedLead.email}</a>
                </div>
                {selectedLead.phone && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Phone</span>
                    <a href={`tel:${selectedLead.phone}`} className="text-creek-400 hover:underline">{selectedLead.phone}</a>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Service</span>
                  <span className="text-white">{selectedLead.service || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Preferred Date</span>
                  <span className="text-white">{selectedLead.preferred_date || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Group Size</span>
                  <span className="text-white">{selectedLead.group_size || '—'}</span>
                </div>
                {selectedLead.message && (
                  <div className="text-sm">
                    <span className="text-white/50 block mb-1">Message</span>
                    <p className="text-white/80 bg-white/5 rounded-lg p-3">{selectedLead.message}</p>
                  </div>
                )}
              </div>

              {/* Status update */}
              <div className="mb-4">
                <label className="text-sm text-white/50 block mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {['new', 'contacted', 'booked', 'completed', 'cancelled'].map(s => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition cursor-pointer ${
                        selectedLead.status === s ? STATUS_COLORS[s] : 'border-white/10 text-white/40 hover:bg-white/5'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label className="text-sm text-white/50 block mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-forest-500 transition resize-none"
                />
                <button onClick={() => updateNotes(selectedLead.id)} className="mt-2 px-4 py-2 bg-forest-600 text-white rounded-lg text-sm hover:bg-forest-500 transition cursor-pointer">
                  Save Notes
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="w-full mt-2 px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm hover:bg-red-500/10 transition cursor-pointer"
              >
                Delete Lead
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
