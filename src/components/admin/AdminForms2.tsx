import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// --- PROJECTS FORM ---
export const ProjectsForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [projects, setProjects] = useState(data.projects || []);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  useEffect(() => { setProjects(data.projects); }, [data.projects]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('projects', projects);
    setSaving(false);
  };

  const addProject = () => setProjects([...projects, { title: '', tech: '', url: '', image: '', bullets: [] }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));
  const updateProject = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };
  const updateBullets = (index: number, val: string) => {
    const updated = [...projects];
    updated[index].bullets = val.split('\n').filter(s => s.trim() !== '');
    setProjects(updated);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(index);
    try {
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      updateProject(index, 'image', url);
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {projects.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative">
          <button onClick={() => removeProject(i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5" /></button>
          <input value={item.title} onChange={e => updateProject(i, 'title', e.target.value)} placeholder="Project Title" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.tech} onChange={e => updateProject(i, 'tech', e.target.value)} placeholder="Tech Stack (comma separated)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.url} onChange={e => updateProject(i, 'url', e.target.value)} placeholder="Live URL" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          
          <div className="flex gap-4 items-center">
            <input value={item.image} onChange={e => updateProject(i, 'image', e.target.value)} placeholder="Image URL (Or upload using button)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white flex-1" />
            <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-3 rounded-lg cursor-pointer border border-white/10 transition-colors">
              {uploadingIdx === i ? <span className="animate-spin text-orange-500">⏳</span> : <Upload className="w-5 h-5 text-orange-400" />}
              <span className="whitespace-nowrap">{uploadingIdx === i ? 'Uploading...' : 'Upload Image'}</span>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} className="hidden" />
            </label>
          </div>
          {item.image && (
             <div className="w-full h-32 rounded-lg bg-black/50 overflow-hidden relative">
               <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
             </div>
          )}

          <textarea value={item.bullets.join('\n')} onChange={e => updateBullets(i, e.target.value)} placeholder="Bullet Points (one per line)" rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={addProject} className="flex items-center gap-2 text-orange-400"><Plus className="w-5 h-5"/> Add Project</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"><Save className="w-5 h-5"/> Save Projects</button>
      </div>
    </div>
  );
};

// --- EXPERIENCE FORM ---
export const ExperienceForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [exp, setExp] = useState(data.experience || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setExp(data.experience); }, [data.experience]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('experience', exp);
    setSaving(false);
  };

  const addExp = () => setExp([...exp, { title: '', company: '', period: '', bullets: [] }]);
  const removeExp = (index: number) => setExp(exp.filter((_, i) => i !== index));
  const updateExp = (index: number, field: string, value: string) => {
    const updated = [...exp];
    updated[index] = { ...updated[index], [field]: value };
    setExp(updated);
  };
  const updateBullets = (index: number, val: string) => {
    const updated = [...exp];
    updated[index].bullets = val.split('\n').filter(s => s.trim() !== '');
    setExp(updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {exp.map((item, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 relative">
          <button onClick={() => removeExp(i)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-5 h-5" /></button>
          <input value={item.title} onChange={e => updateExp(i, 'title', e.target.value)} placeholder="Job Title" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.company} onChange={e => updateExp(i, 'company', e.target.value)} placeholder="Company" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <input value={item.period} onChange={e => updateExp(i, 'period', e.target.value)} placeholder="Period (e.g. 2020 - Present)" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
          <textarea value={item.bullets.join('\n')} onChange={e => updateBullets(i, e.target.value)} placeholder="Bullet Points (one per line)" rows={4} className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white" />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={addExp} className="flex items-center gap-2 text-orange-400"><Plus className="w-5 h-5"/> Add Experience</button>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-orange-500 px-6 py-3 rounded-lg font-bold"><Save className="w-5 h-5"/> Save Experience</button>
      </div>
    </div>
  );
};
