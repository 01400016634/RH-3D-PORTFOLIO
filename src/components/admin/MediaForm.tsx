import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Save, FileVideo } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MediaForm: React.FC = () => {
  const { data, updateSection } = usePortfolio();
  const [videoUrl, setVideoUrl] = useState(data.media?.backgroundVideo || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data.media?.backgroundVideo) {
      setVideoUrl(data.media.backgroundVideo);
    }
  }, [data.media]);

  const handleSave = async () => {
    setSaving(true);
    await updateSection('media', { backgroundVideo: videoUrl });
    setSaving(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `media/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setVideoUrl(url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Note: Firebase Storage requires a Blaze plan or CORS configuration. See instructions or paste a direct URL instead.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-4">
        <h3 className="text-lg font-bold text-orange-400 flex items-center gap-2">
          <FileVideo className="w-5 h-5" />
          Background Video
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Upload a new background video for your portfolio, or simply paste a direct link to an `.mp4` file.
        </p>
        
        <div>
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Video URL</label>
          <input 
            type="text" 
            value={videoUrl} 
            onChange={e => setVideoUrl(e.target.value)}
            placeholder="https://example.com/video.mp4"
            className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 outline-none mb-4"
          />
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors border border-white/10">
              <FileVideo className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Video File'}
              <input 
                type="file" 
                accept="video/*"
                className="hidden" 
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
            {uploading && <span className="text-sm text-orange-400 animate-pulse">Uploading to Firebase Storage...</span>}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={saving || uploading}
        className="self-end flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50"
      >
        <Save className="w-5 h-5" />
        {saving ? 'Saving...' : 'Save Media Settings'}
      </button>
    </div>
  );
};

export default MediaForm;
