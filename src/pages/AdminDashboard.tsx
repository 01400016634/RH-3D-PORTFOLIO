import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePortfolio } from '../contexts/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, LayoutDashboard, UserCircle, Briefcase, 
   Target, FolderGit2, GraduationCap, Link2, FileVideo, Save
} from 'lucide-react';
import { ServicesForm, SkillsForm, PipelineForm } from '../components/admin/AdminForms';
import { ProjectsForm, ExperienceForm } from '../components/admin/AdminForms2';
import { EducationForm } from '../components/admin/AdminForms3';
import MediaForm from '../components/admin/MediaForm';

const TABS = [
  { id: 'homepage', label: 'Homepage', icon: LayoutDashboard },
  { id: 'about', label: 'About Me (Services)', icon: UserCircle },
  { id: 'competencies', label: 'Competencies', icon: Briefcase },
  { id: 'tactics', label: 'Personal Tactics', icon: Target },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education & Credentials', icon: GraduationCap },
  { id: 'media', label: 'Media (Video)', icon: FileVideo },
];

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { data, loading, updateSection, initializeData } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('homepage');
  const [saving, setSaving] = useState(false);

  // Local state for Homepage form
  const [heroForm, setHeroForm] = useState(data.hero);

  // Sync local state when context data loads
  React.useEffect(() => {
    if (data.hero) setHeroForm(data.hero);
  }, [data.hero]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSaveHomepage = async () => {
    setSaving(true);
    await updateSection('hero', heroForm);
    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans selection:bg-orange-500/30">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-black tracking-widest text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">RH. ADMIN</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col gap-1 px-3">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    isActive 
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <button 
            onClick={initializeData}
            className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-xs font-bold border border-white/10"
          >
            Initialize Database
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors text-sm font-bold border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none"></div>
        
        <header className="px-10 py-8 border-b border-white/5 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{TABS.find(t => t.id === activeTab)?.label} Settings</h2>
            <p className="text-slate-400 text-sm mt-1">Manage and update your portfolio content dynamically.</p>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            View Live Site
          </a>
        </header>

        <div className="p-10 relative z-10 max-w-5xl pb-32">
          {activeTab === 'homepage' && (
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-4">
                <h3 className="text-lg font-bold text-orange-400">Header Texts</h3>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Status Badge</label>
                  <input 
                    type="text" 
                    value={heroForm?.statusBadge || ''} 
                    onChange={e => setHeroForm({...heroForm, statusBadge: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Name</label>
                  <input 
                    type="text" 
                    value={heroForm?.name || ''} 
                    onChange={e => setHeroForm({...heroForm, name: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Title</label>
                  <input 
                    type="text" 
                    value={heroForm?.title || ''} 
                    onChange={e => setHeroForm({...heroForm, title: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Bio</label>
                  <textarea 
                    rows={4}
                    value={heroForm?.bio || ''} 
                    onChange={e => setHeroForm({...heroForm, bio: e.target.value})}
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveHomepage}
                disabled={saving}
                className="self-end flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Homepage'}
              </button>
            </div>
          )}

          {activeTab === 'about' && <ServicesForm />}
          {activeTab === 'competencies' && <SkillsForm />}
          {activeTab === 'tactics' && <PipelineForm />}
          {activeTab === 'projects' && <ProjectsForm />}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'media' && <MediaForm />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
