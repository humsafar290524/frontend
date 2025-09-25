import React, { useState, useEffect } from 'react'

const initial = {
  serialNo: '',
  name: '',
  gender: '',
  dob: '',
  age: '',
  height: '',
  complexion: '',
  caste: '',
  residenceCountry: '',
  residence: '',
  education: '',
  profession: '',
  maritalStatus: '',
  familyDetails: '',
  contactNo: '',
  photoUrl: '',
  prefAge: '',
  prefHeight: '',
  prefResidence: '',
  prefEducation: '',
  prefMaritalStatus: '',
  prefCaste: '',
  biodataSubmittedDate: '',
  status: 'Active',
  forwardTo: '',
  biodataSubmittedBy: '',
}

export default function BiodataForm({ onSubmit, initialData }) {
  const [form, setForm] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [casteOther, setCasteOther] = useState('')
  const [prefCasteOther, setPrefCasteOther] = useState('')
  const [professionOther, setProfessionOther] = useState('')
  useEffect(() => {
    if (initialData) {
      // Format dates for the form inputs
      const formattedData = {
        ...initialData,
        dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : '',
        biodataSubmittedDate: initialData.biodataSubmittedDate ? new Date(initialData.biodataSubmittedDate).toISOString().split('T')[0] : '',
      }

      // Handle "Other" values for dropdowns
      setForm(formattedData)
      setCasteOther(initialData.caste && !['No Caste', 'Syed', 'Sayyid', 'Sheikh', 'Shaikh', 'Khan', 'Pathan', 'Mughal', 'Ansari', 'Qureshi', 'Farooqui', 'Siddiqui', 'Usmani', 'Abbasi', 'Alvi', 'Hashmi', 'Naqvi', 'Rizvi', 'Kazmi', 'Zaidi', 'Bukhari', 'Gilani', 'Jafri', 'Baig', 'Mirza', 'Butt', 'Malik', 'Bhat', 'Chaudhary', 'Memoni', 'Memon', 'Khoja', 'Bohra', 'Dawoodi Bohra', 'Cutchi Memon', 'Qasmi', 'Tamboli', 'Saifi', 'Mansoori', 'Faruqi', 'Qadri', 'Shah'].includes(initialData.caste) ? initialData.caste : '')
      setPrefCasteOther(initialData.prefCaste && !['No Caste', 'Syed', 'Sayyid', 'Sheikh', 'Shaikh', 'Khan', 'Pathan', 'Mughal', 'Ansari', 'Qureshi', 'Farooqui', 'Siddiqui', 'Usmani', 'Abbasi', 'Alvi', 'Hashmi', 'Naqvi', 'Rizvi', 'Kazmi', 'Zaidi', 'Bukhari', 'Gilani', 'Jafri', 'Baig', 'Mirza', 'Butt', 'Malik', 'Bhat', 'Chaudhary', 'Memoni', 'Memon', 'Khoja', 'Bohra', 'Dawoodi Bohra', 'Cutchi Memon', 'Qasmi', 'Tamboli', 'Saifi', 'Mansoori', 'Faruqi', 'Qadri', 'Shah'].includes(initialData.prefCaste) ? initialData.prefCaste : '')
      setProfessionOther(initialData.profession && !['Software Engineer','Doctor','Engineer','Teacher','Professor','Business','Entrepreneur','Accountant','Banker','Lawyer','Civil Services','Government Job','Defence','Police','Architect','Dentist','Pharmacist','Nurse','Consultant','Designer','Marketing','Sales','Operations','HR','Finance','Media/Journalism','Artist','Student','Not Working'].includes(initialData.profession) ? initialData.profession : '')
    } else {
      setForm(initial)
      setCasteOther('')
      setPrefCasteOther('')
      setProfessionOther('')
    }
  }, [initialData])

  const countries = [
    'India','Pakistan','Bangladesh','Sri Lanka','Nepal','Bhutan','Maldives','Afghanistan',
    'United Arab Emirates','Saudi Arabia','Qatar','Oman','Kuwait','Bahrain',
    'United States','Canada','United Kingdom','Australia','New Zealand',
    'Germany','France','Italy','Spain','Netherlands','Norway','Sweden','Denmark','Switzerland','Belgium','Ireland',
    'Malaysia','Singapore','Indonesia','Turkey','Egypt','South Africa',
    'Other'
  ]

  const professions = [
    'Software Engineer','Doctor','Engineer','Teacher','Professor','Business','Entrepreneur','Accountant','Banker','Lawyer',
    'Civil Services','Government Job','Defence','Police','Architect','Dentist','Pharmacist','Nurse','Consultant','Designer',
    'Marketing','Sales','Operations','HR','Finance','Media/Journalism','Artist','Student','Not Working','Other'
  ]

  function setField(k, v) {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        serialNo: form.serialNo ? Number(form.serialNo) : undefined,
        age: form.age ? Number(form.age) : undefined,
        dob: form.dob ? new Date(form.dob).toISOString() : undefined,
        biodataSubmittedDate: form.biodataSubmittedDate ? new Date(form.biodataSubmittedDate).toISOString() : undefined,
        caste: form.caste === 'Other' && casteOther ? casteOther : form.caste,
        prefCaste: form.prefCaste === 'Other' && prefCasteOther ? prefCasteOther : form.prefCaste,
        profession: form.profession === 'Other' && professionOther ? professionOther : form.profession,
      }
      await onSubmit?.(payload)
      setForm(initial)
      setCasteOther('')
      setPrefCasteOther('')
      setProfessionOther('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-4">
      <div>
        <label>S. No</label>
        <input value={form.serialNo} onChange={e => setField('serialNo', e.target.value)} />
      </div>
      <div>
        <label>Name</label>
        <input required value={form.name} onChange={e => setField('name', e.target.value)} />
      </div>
      <div>
        <label>Gender</label>
        <select required value={form.gender} onChange={e => setField('gender', e.target.value)}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label>DOB</label>
        <input type="date" value={form.dob} onChange={e => setField('dob', e.target.value)} />
      </div>
      <div>
        <label>Age</label>
        <input value={form.age} onChange={e => setField('age', e.target.value)} />
      </div>
      <div>
        <label>Height</label>
        <input value={form.height} onChange={e => setField('height', e.target.value)} />
      </div>
      <div>
        <label>Complexion</label>
        <select value={form.complexion} onChange={e => setField('complexion', e.target.value)}>
          <option value="">Select</option>
          <option>Very Fair</option>
          <option>Fair</option>
          <option>Wheatish</option>
          <option>Wheatish Brown</option>
          <option>Light Brown</option>
          <option>Medium</option>
          <option>Olive</option>
          <option>Tan</option>
          <option>Brown</option>
          <option>Dusky</option>
          <option>Dark</option>
          <option>Very Dark</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label>Caste</label>
        <select value={form.caste} onChange={e => setField('caste', e.target.value)}>
          <option value="">Select</option>
          <option>No Caste</option>
          <option>Syed</option>
          <option>Sayyid</option>
          <option>Sheikh</option>
          <option>Shaikh</option>
          <option>Khan</option>
          <option>Pathan</option>
          <option>Mughal</option>
          <option>Ansari</option>
          <option>Qureshi</option>
          <option>Farooqui</option>
          <option>Siddiqui</option>
          <option>Usmani</option>
          <option>Abbasi</option>
          <option>Alvi</option>
          <option>Hashmi</option>
          <option>Naqvi</option>
          <option>Rizvi</option>
          <option>Kazmi</option>
          <option>Zaidi</option>
          <option>Bukhari</option>
          <option>Gilani</option>
          <option>Jafri</option>
          <option>Baig</option>
          <option>Mirza</option>
          <option>Butt</option>
          <option>Malik</option>
          <option>Bhat</option>
          <option>Chaudhary</option>
          <option>Memoni</option>
          <option>Memon</option>
          <option>Khoja</option>
          <option>Bohra</option>
          <option>Dawoodi Bohra</option>
          <option>Cutchi Memon</option>
          <option>Qasmi</option>
          <option>Tamboli</option>
          <option>Saifi</option>
          <option>Mansoori</option>
          <option>Faruqi</option>
          <option>Qadri</option>
          <option>Shah</option>
          <option>Other</option>
        </select>
        {form.caste === 'Other' && (
          <div style={{ marginTop: 8 }}>
            <input placeholder="Enter caste" value={casteOther} onChange={e => setCasteOther(e.target.value)} />
          </div>
        )}
      </div>
      <div>
        <label>Residence Country</label>
        <select value={form.residenceCountry} onChange={e => setField('residenceCountry', e.target.value)}>
          <option value="">Select</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Residence</label>
        <input value={form.residence} onChange={e => setField('residence', e.target.value)} />
      </div>
      <div>
        <label>Education</label>
        <input value={form.education} onChange={e => setField('education', e.target.value)} />
      </div>
      <div>
        <label>Profession</label>
        <select value={form.profession} onChange={e => setField('profession', e.target.value)}>
          <option value="">Select</option>
          {professions.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {form.profession === 'Other' && (
          <div style={{ marginTop: 8 }}>
            <input placeholder="Enter profession" value={professionOther} onChange={e => setProfessionOther(e.target.value)} />
          </div>
        )}
      </div>
      <div>
        <label>Marital Status</label>
        <select value={form.maritalStatus} onChange={e => setField('maritalStatus', e.target.value)}>
          <option value="">Select</option>
          <option>Unmarried</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
          <option>Separated</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label>Family's Detail</label>
        <textarea rows={2} value={form.familyDetails} onChange={e => setField('familyDetails', e.target.value)} />
      </div>
      <div>
        <label>Contact No.</label>
        <input value={form.contactNo} onChange={e => setField('contactNo', e.target.value)} />
      </div>
      <div>
        <label>Photo URL</label>
        <input value={form.photoUrl} onChange={e => setField('photoUrl', e.target.value)} />
      </div>

      <div>
        <label>Preferred Age</label>
        <input value={form.prefAge} onChange={e => setField('prefAge', e.target.value)} />
      </div>
      <div>
        <label>Preferred Height</label>
        <input value={form.prefHeight} onChange={e => setField('prefHeight', e.target.value)} />
      </div>
      <div>
        <label>Preferred Residence</label>
        <input value={form.prefResidence} onChange={e => setField('prefResidence', e.target.value)} />
      </div>
      <div>
        <label>Preferred Education</label>
        <input value={form.prefEducation} onChange={e => setField('prefEducation', e.target.value)} />
      </div>
      <div>
        <label>Preferred Marital Status</label>
        <input value={form.prefMaritalStatus} onChange={e => setField('prefMaritalStatus', e.target.value)} />
      </div>
      <div>
        <label>Preferred Caste</label>
        <select value={form.prefCaste} onChange={e => setField('prefCaste', e.target.value)}>
          <option value="">Select</option>
          <option>No Caste</option>
          <option>Syed</option>
          <option>Sayyid</option>
          <option>Sheikh</option>
          <option>Shaikh</option>
          <option>Khan</option>
          <option>Pathan</option>
          <option>Mughal</option>
          <option>Ansari</option>
          <option>Qureshi</option>
          <option>Farooqui</option>
          <option>Siddiqui</option>
          <option>Usmani</option>
          <option>Abbasi</option>
          <option>Alvi</option>
          <option>Hashmi</option>
          <option>Naqvi</option>
          <option>Rizvi</option>
          <option>Kazmi</option>
          <option>Zaidi</option>
          <option>Bukhari</option>
          <option>Gilani</option>
          <option>Jafri</option>
          <option>Baig</option>
          <option>Mirza</option>
          <option>Butt</option>
          <option>Malik</option>
          <option>Bhat</option>
          <option>Chaudhary</option>
          <option>Memoni</option>
          <option>Memon</option>
          <option>Khoja</option>
          <option>Bohra</option>
          <option>Dawoodi Bohra</option>
          <option>Cutchi Memon</option>
          <option>Qasmi</option>
          <option>Tamboli</option>
          <option>Saifi</option>
          <option>Mansoori</option>
          <option>Faruqi</option>
          <option>Qadri</option>
          <option>Shah</option>
          <option>Other</option>
        </select>
        {form.prefCaste === 'Other' && (
          <div style={{ marginTop: 8 }}>
            <input placeholder="Enter preferred caste" value={prefCasteOther} onChange={e => setPrefCasteOther(e.target.value)} />
          </div>
        )}
      </div>

      <div>
        <label>Biodata Submitted Date</label>
        <input type="date" value={form.biodataSubmittedDate} onChange={e => setField('biodataSubmittedDate', e.target.value)} />
      </div>
      <div>
        <label>Status</label>
        <input value={form.status} onChange={e => setField('status', e.target.value)} />
      </div>
      <div>
        <label>Forward To</label>
        <input value={form.forwardTo} onChange={e => setField('forwardTo', e.target.value)} />
      </div>
      <div>
        <label>Biodata Submitted By</label>
        <input value={form.biodataSubmittedBy} onChange={e => setField('biodataSubmittedBy', e.target.value)} />
      </div>

      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
        <button type="button" className="secondary" onClick={() => {
          if (initialData) {
            const formattedData = {
              ...initialData,
              dob: initialData.dob ? new Date(initialData.dob).toISOString().split('T')[0] : '',
              biodataSubmittedDate: initialData.biodataSubmittedDate ? new Date(initialData.biodataSubmittedDate).toISOString().split('T')[0] : '',
            }
            setForm(formattedData)
            setCasteOther(initialData.caste && !['No Caste', 'Syed', 'Sayyid', 'Sheikh', 'Shaikh', 'Khan', 'Pathan', 'Mughal', 'Ansari', 'Qureshi', 'Farooqui', 'Siddiqui', 'Usmani', 'Abbasi', 'Alvi', 'Hashmi', 'Naqvi', 'Rizvi', 'Kazmi', 'Zaidi', 'Bukhari', 'Gilani', 'Jafri', 'Baig', 'Mirza', 'Butt', 'Malik', 'Bhat', 'Chaudhary', 'Memoni', 'Memon', 'Khoja', 'Bohra', 'Dawoodi Bohra', 'Cutchi Memon', 'Qasmi', 'Tamboli', 'Saifi', 'Mansoori', 'Faruqi', 'Qadri', 'Shah'].includes(initialData.caste) ? initialData.caste : '')
            setPrefCasteOther(initialData.prefCaste && !['No Caste', 'Syed', 'Sayyid', 'Sheikh', 'Shaikh', 'Khan', 'Pathan', 'Mughal', 'Ansari', 'Qureshi', 'Farooqui', 'Siddiqui', 'Usmani', 'Abbasi', 'Alvi', 'Hashmi', 'Naqvi', 'Rizvi', 'Kazmi', 'Zaidi', 'Bukhari', 'Gilani', 'Jafri', 'Baig', 'Mirza', 'Butt', 'Malik', 'Bhat', 'Chaudhary', 'Memoni', 'Memon', 'Khoja', 'Bohra', 'Dawoodi Bohra', 'Cutchi Memon', 'Qasmi', 'Tamboli', 'Saifi', 'Mansoori', 'Faruqi', 'Qadri', 'Shah'].includes(initialData.prefCaste) ? initialData.prefCaste : '')
            setProfessionOther(initialData.profession && !['Software Engineer','Doctor','Engineer','Teacher','Professor','Business','Entrepreneur','Accountant','Banker','Lawyer','Civil Services','Government Job','Defence','Police','Architect','Dentist','Pharmacist','Nurse','Consultant','Designer','Marketing','Sales','Operations','HR','Finance','Media/Journalism','Artist','Student','Not Working'].includes(initialData.profession) ? initialData.profession : '')
          } else {
            setForm(initial)
            setCasteOther('')
            setPrefCasteOther('')
            setProfessionOther('')
          }
        }} disabled={submitting}>Reset</button>
      </div>
    </form>
  )
}
