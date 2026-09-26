import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

// --- ABOUT ME (SERVICES) FORM ---
export const ServicesForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [services, setServices] = useState(data.services || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setServices(data.services); }, [data.services]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('services', services);
    setSaving(false);
  };

  const addService = () => setServices([...services, { title: '', description: '' }]);
  const removeService = (index: number) => setServices(services.filter((_, i) => i !== index));
  const updateService = (index: number, field: string, value: string) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {services.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative group">
          <button onClick={() => removeService(i)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-5 h-5" /></button>
          <input value={item.title} onChange={e => updateService(i, 'title', e.target.value)} placeholder="Service Title" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <textarea value={item.description} onChange={e => updateService(i, 'description', e.target.value)} placeholder="Description" rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={addService} className="flex items-center gap-2 text-orange-400 hover:text-orange-300"><Plus className="w-5 h-5"/> Add Service</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold shadow-lg disabled:opacity-50"><Save className="w-5 h-5"/> {saving ? 'Saving...' : 'Save Services'}</button>
      </div>
    </div>
  );
};

// --- COMPETENCIES / SKILLS FORM ---
export const SkillsForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [skills, setSkills] = useState(data.skills || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setSkills(data.skills); }, [data.skills]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('skills', skills);
    setSaving(false);
  };

  const addCategory = () => setSkills([...skills, { title: '', skills: [] }]);
  const removeCategory = (index: number) => setSkills(skills.filter((_, i) => i !== index));
  const updateCategory = (index: number, title: string) => {
    const updated = [...skills];
    updated[index].title = title;
    setSkills(updated);
  };
  const updateSkillsList = (index: number, val: string) => {
    const updated = [...skills];
    updated[index].skills = val.split(',').map(s => s.trim());
    setSkills(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {skills.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative group">
          <button onClick={() => removeCategory(i)} className="absolute top-4 right-4 text-red-500 hover:opacity-100 transition-opacity"><Trash2 className="w-5 h-5" /></button>
          <input value={item.title} onChange={e => updateCategory(i, e.target.value)} placeholder="Category Title (e.g. AI & Web)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <textarea value={item.skills.join(', ')} onChange={e => updateSkillsList(i, e.target.value)} placeholder="Skills (comma separated)" rows={3} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={addCategory} className="flex items-center gap-2 text-orange-400 hover:text-orange-300"><Plus className="w-5 h-5"/> Add Category</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"><Save className="w-5 h-5"/> {saving ? 'Saving...' : 'Save Skills'}</button>
      </div>
    </div>
  );
};

// --- PIPELINE / TACTICS FORM ---
export const PipelineForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [pipeline, setPipeline] = useState(data.pipeline || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setPipeline(data.pipeline); }, [data.pipeline]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('pipeline', pipeline);
    setSaving(false);
  };

  const addItem = () => setPipeline([...pipeline, { stage: '', description: '' }]);
  const removeItem = (index: number) => setPipeline(pipeline.filter((_, i) => i !== index));
  const updateItem = (index: number, field: string, value: string) => {
    const updated = [...pipeline];
    updated[index] = { ...updated[index], [field]: value };
    setPipeline(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {pipeline.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative">
          <button onClick={() => removeItem(i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5" /></button>
          <input value={item.stage} onChange={e => updateItem(i, 'stage', e.target.value)} placeholder="Stage (e.g. 01 IDEA)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Description" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={addItem} className="flex items-center gap-2 text-orange-400"><Plus className="w-5 h-5"/> Add Tactic</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"><Save className="w-5 h-5"/> Save Tactics</button>
      </div>
    </div>
  );
};
