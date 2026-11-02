import React, { useState, useEffect } from 'react';
import { GALLERY_PHOTOS, GalleryPhoto } from '../data/restaurantData';
import {
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Check,
  Sparkles,
  MapPin,
  Utensils,
  Share2,
  Layers
} from 'lucide-react';

interface PhotoGallerySectionProps {
  onOpenReservation: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ onOpenReservation }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos (4)' },
    { id: 'seafood', label: 'Fresh Seafood' },
    { id: 'sushi', label: 'Master Sushi' },
    { id: 'fruits', label: 'Fruit & Salad Bar' },
    { id: 'exterior', label: 'Storefront & Exterior' },
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (activeCategory === 'all') return true;
    return photo.category === activeCategory;
  });

  const activePhoto: GalleryPhoto | null =
    selectedPhotoIndex !== null ? GALLERY_PHOTOS[selectedPhotoIndex] : null;

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setZoomLevel(1);
  };

  const navigatePhoto = (direction: number) => {
    if (selectedPhotoIndex === null) return;
    const total = GALLERY_PHOTOS.length;
    const nextIndex = (selectedPhotoIndex + direction + total) % total;
    setSelectedPhotoIndex(nextIndex);
    setZoomLevel(1);
  };

  // Trigger high-quality direct download
  const handleDownloadPhoto = async (photo: GalleryPhoto) => {
    try {
      const response = await fetch(photo.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = photo.downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloadSuccess(`Saved ${photo.title} in Ultra-HD!`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      // Direct fallback
      const link = document.createElement('a');
      link.href = photo.src;
      link.download = photo.downloadFilename;
      link.target = '_blank';
      link.click();
    }
  };

  // Download all photos in batch
  const handleDownloadAll = async () => {
    setDownloadSuccess('Saving all 4 Ultra-HD photos to your device...');
    for (let i = 0; i < GALLERY_PHOTOS.length; i++) {
      const photo = GALLERY_PHOTOS[i];
      await new Promise((resolve) => setTimeout(resolve, 350));
      const link = document.createElement('a');
      link.href = photo.src;
      link.download = photo.downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setTimeout(() => {
      setDownloadSuccess('All 4 Ultra-HD photos downloaded successfully!');
      setTimeout(() => setDownloadSuccess(null), 3500);
    }, 1200);
  };

  const handleCopyShare = (photo: GalleryPhoto) => {
    const fullUrl = window.location.origin + photo.src;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-950 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Authentic Culinary Gallery</span>
              <span aria-hidden="true">·</span>
              <span>Ultra-HD Quality</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Visual Feast & High-Res Photo Gallery
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Inspect our genuine buffet offerings in high resolution. Click any image to examine in full screen, zoom into details, or save the high-resolution photo.
            </p>
          </div>

          {/* Batch Download / Save All CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadAll}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 hover:border-cyan-500/50 shadow-md text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer group"
            >
              <Download className="w-4 h-4 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
              <span>Save All Photos (Ultra-HD)</span>
            </button>
          </div>
        </div>

        {/* Download Success Banner */}
        {downloadSuccess && (
          <div className="mb-6 p-3.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
            <button
              onClick={() => setDownloadSuccess(null)}
              className="text-emerald-400 hover:text-white text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid (Magazine-Grade Asymmetric Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredPhotos.map((photo) => {
            const originalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
            // Layout weights:
            // Storefront & Crabs: 7 cols or 6 cols for architectural balance
            const isWide = photo.category === 'exterior' || photo.category === 'seafood';
            const colSpanClass = isWide ? 'lg:col-span-6' : 'lg:col-span-6';

            return (
              <div
                key={photo.id}
                className={`${colSpanClass} group relative bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl`}
              >
                {/* Image Container with Hover Zoom */}
                <div
                  onClick={() => openLightbox(originalIndex)}
                  className="relative aspect-[16/11] overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
                    <span className="bg-slate-950/90 text-cyan-300 border border-cyan-800/60 text-[10px] font-semibold px-2.5 py-1 rounded-md shadow backdrop-blur-sm">
                      {photo.categoryLabel}
                    </span>
                    <span className="bg-slate-950/80 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                      {photo.fileSize}
                    </span>
                  </div>

                  {/* Center Hover Action Cue */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-slate-950/90 text-white px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold shadow-2xl backdrop-blur-md">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Ultra-HD Lightbox</span>
                    </div>
                  </div>
                </div>

                {/* Card Info & Quick Save Footer */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-display font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {photo.description}
                    </p>
                  </div>

                  {/* Unboxed Station Location & Chef Notes */}
                  <div className="text-[11px] text-cyan-400/90 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{photo.station}</span>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => openLightbox(originalIndex)}
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Inspect Details</span>
                    </button>

                    <button
                      onClick={() => handleDownloadPhoto(photo)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Save this photo to your device in original Ultra-HD"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save HD Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Ultra-HD Lightbox Modal */}
      {activePhoto && selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-6 animate-in fade-in duration-200">
          
          {/* Top Bar Controls */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-md">
                {selectedPhotoIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <span className="text-xs font-semibold text-white hidden sm:inline">
                {activePhoto.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom In / Zoom Out */}
              <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-1 gap-1">
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400 px-1">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                  className="p-1 text-slate-300 hover:text-white"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              {/* Share Photo Link */}
              <button
                onClick={() => handleCopyShare(activePhoto)}
                className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800"
                title="Copy Photo Link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Download Photo Button */}
              <button
                onClick={() => handleDownloadPhoto(activePhoto)}
                className="px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save HD Photo</span>
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="p-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 ml-1"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Left / Right Arrow Navigation */}
          <button
            onClick={() => navigatePhoto(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full border border-slate-800 shadow-xl"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigatePhoto(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full border border-slate-800 shadow-xl"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Photo Viewport */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col lg:flex-row items-center gap-6 overflow-hidden mt-10">
            
            {/* Image Canvas */}
            <div className="flex-1 w-full flex items-center justify-center overflow-auto max-h-[60vh] lg:max-h-[75vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                style={{ transform: `scale(${zoomLevel})` }}
                className="max-h-[58vh] lg:max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-2xl transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Side Information Panel */}
            <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4 shrink-0 text-left">
              <div>
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                  {activePhoto.categoryLabel}
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-0.5">
                  {activePhoto.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {activePhoto.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Station:</span>
                  <span className="text-white font-medium">{activePhoto.station}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Quality:</span>
                  <span className="text-cyan-300 font-medium">{activePhoto.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span className="text-slate-300 font-mono">{activePhoto.fileSize}</span>
                </div>
              </div>

              {/* Chef Notes */}
              <div className="text-[11px] text-slate-400 border-l-2 border-cyan-500 pl-2.5 italic">
                "{activePhoto.chefNotes}"
              </div>

              {/* Lightbox CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleDownloadPhoto(activePhoto)}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ultra-HD Photo</span>
                </button>

                <button
                  onClick={() => {
                    closeLightbox();
                    onOpenReservation();
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg font-medium"
                >
                  Reserve Table to Taste This
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="pt-2 flex items-center gap-2">
                {GALLERY_PHOTOS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPhotoIndex(idx);
                      setZoomLevel(1);
                    }}
                    className={`relative w-12 h-9 rounded overflow-hidden border transition-all cursor-pointer ${
                      idx === selectedPhotoIndex
                        ? 'border-cyan-400 ring-2 ring-cyan-400/30'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
