'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Link } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  password: string;
  type?: string;
}

export default function ImageUpload({ value, onChange, password, type = 'general' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${password}` },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Upload failed');
        return;
      }

      const data = await res.json();
      onChange(data.url);
    } catch {
      setError('Upload failed. Check your connection.');
    } finally {
      setUploading(false);
    }
  }, [password, type, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    } else {
      setError('Please drop an image file (JPEG, PNG, WebP, or GIF)');
    }
  }, [uploadFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  }, [uploadFile]);

  const handleRemove = useCallback(async () => {
    if (value && value.includes('blob.vercel-storage.com')) {
      try {
        await fetch('/api/admin/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${password}`,
          },
          body: JSON.stringify({ url: value }),
        });
      } catch { /* best effort cleanup */ }
    }
    onChange('');
  }, [value, password, onChange]);

  const handleUrlSubmit = useCallback(() => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setMode('upload');
    }
  }, [urlInput, onChange]);

  // If there's already an image, show preview
  if (value) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#4A4A5C]">Image</label>
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-40 h-28 object-cover rounded-lg border border-[#F3EFE8]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
              (e.target as HTMLImageElement).alt = 'Failed to load';
            }}
          />
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
            title="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-[#8E8E9F] truncate max-w-xs">{value}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-[#4A4A5C]">Image</label>
        <div className="flex gap-1 bg-[#FAF7F2] rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${mode === 'upload' ? 'bg-white text-[#7A3B5E] shadow-sm' : 'text-[#8E8E9F] hover:text-[#4A4A5C]'}`}
          >
            <Upload className="w-3 h-3 inline mr-1" />Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${mode === 'url' ? 'bg-white text-[#7A3B5E] shadow-sm' : 'text-[#8E8E9F] hover:text-[#4A4A5C]'}`}
          >
            <Link className="w-3 h-3 inline mr-1" />URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
            ${dragOver ? 'border-[#7A3B5E] bg-[#7A3B5E]/5' : 'border-[#E8E4DE] hover:border-[#C4878A] hover:bg-[#FAF7F2]/50'}
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-[#7A3B5E] animate-spin" />
              <p className="text-sm text-[#4A4A5C]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#8E8E9F]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#4A4A5C]">
                  Drop an image here or <span className="text-[#7A3B5E]">browse</span>
                </p>
                <p className="text-xs text-[#8E8E9F] mt-0.5">JPEG, PNG, WebP, GIF (max 5MB)</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2.5 rounded-lg border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#C4878A]"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlSubmit())}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="px-4 py-2.5 rounded-lg bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors disabled:opacity-50"
          >
            Add
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
