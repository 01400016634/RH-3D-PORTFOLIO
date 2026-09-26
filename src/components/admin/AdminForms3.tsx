import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

// --- EDUCATION & CREDENTIALS FORM ---
export const EducationForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [edu, setEdu] = useState(data.education || []);
  const [certs, setCerts] = useState(data.certifications || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { 
    setEdu(data.education);
    setCerts(data.certifications);
  }, [data.education, data.certifications]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('education', edu);
    await updateSection('certifications', certs);
    setSaving(false);
  };

  const updateEdu = (index: number, field: string, value: string) => {
    const updated = [...edu];
    updated[index] = { ...updated[index], [field]: value };
    setEdu(updated);
  };

  const updateCert = (index: number, field: string, value: string) => {
    const updated = [...certs];
    updated[index] = { ...updated[index], [field]: value };
    setCerts(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold text-orange-400">Education</h3>
      {edu.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative">
          <button onClick={() => setEdu(edu.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5" /></button>
          <input value={item.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} placeholder="Degree" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.institution} onChange={e => updateEdu(i, 'institution', e.target.value)} placeholder="Institution" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.period} onChange={e => updateEdu(i, 'period', e.target.value)} placeholder="Period" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.details || ''} onChange={e => updateEdu(i, 'details', e.target.value)} placeholder="Details (e.g. GPA)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <button onClick={() => setEdu([...edu, { degree: '', institution: '', period: '' }])} className="flex items-center gap-2 text-orange-400"><Plus className="w-5 h-5"/> Add Education</button>

      <h3 className="text-xl font-bold text-orange-400 mt-6">Certifications</h3>
      {certs.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative">
          <button onClick={() => setCerts(certs.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5" /></button>
          <input value={item.title} onChange={e => updateCert(i, 'title', e.target.value)} placeholder="Title" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <textarea value={item.details} onChange={e => updateCert(i, 'details', e.target.value)} placeholder="Details" rows={2} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={() => setCerts([...certs, { title: '', details: '' }])} className="flex items-center gap-2 text-orange-400"><Plus className="w-5 h-5"/> Add Certification</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"><Save className="w-5 h-5"/> Save All Education</button>
      </div>
    </div>
  );
};
