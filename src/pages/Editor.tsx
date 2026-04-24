import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import TopBar from '../components/Editor/TopBar';
import LeftPanel from '../components/Editor/LeftPanel';
import RightPanel from '../components/Editor/RightPanel';
import MainCanvas from '../components/Editor/MainCanvas';
import AddPanel from '../components/Editor/AddPanel';
import { HONDA_TEMPLATES, LOGO_URL } from '../constants';
import { EditableElement } from '../types';
import { getInitialElements } from '../utils/templateUtils';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = HONDA_TEMPLATES.find(t => t.id === id) || HONDA_TEMPLATES[0];

  const [elements, setElements] = useState<Record<string, EditableElement>>({});
  const [history, setHistory] = useState<Record<string, EditableElement>[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mediaLibrary, setMediaLibrary] = useState<string[]>([
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800'
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [activeTool, setActiveTool] = useState('Add');

  useEffect(() => {
    const initial = getInitialElements(id || '');
    setElements(initial);
    setHistory([initial]);
    setHistoryIndex(0);
  }, [id, template.name]);

  const addToHistory = (newElements: Record<string, EditableElement>) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setElements(prev);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setElements(next);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const updateElement = (id: string, updates: Partial<EditableElement>) => {
    const newElements = {
      ...elements,
      [id]: { ...elements[id], ...updates }
    };
    setElements(newElements);
    addToHistory(newElements);
  };

  const addElement = (type: EditableElement['type'], content: string, style: React.CSSProperties = {}) => {
    const elId = `${type}-${Date.now()}`;
    const defaultStyles: Record<string, React.CSSProperties> = {
      image: { maxWidth: '100%', height: 'auto', margin: '20px auto', borderRadius: '12px' },
      video: { margin: '20px auto' },
      text: { fontSize: '18px', color: '#ffffff', margin: '10px 0', width: '100%' },
      button: { padding: '12px 24px', backgroundColor: '#7047eb', color: '#ffffff', borderRadius: '8px', border: 'none', cursor: 'pointer', margin: '10px 0' },
      icon: { width: '48px', height: '48px', color: '#7047eb', margin: '10px' },
      code: { margin: '20px 0', width: '100%' },
      map: { width: '100%', height: '400px', borderRadius: '12px', margin: '20px 0' },
      shape: { width: '100px', height: '100px', backgroundColor: '#7047eb', borderRadius: '0px' }
    };

    const newElement: EditableElement = {
      id: elId,
      type,
      content,
      style: { ...(defaultStyles[type] || {}), ...style },
    };

    const root = selectedId ? (elements[selectedId]?.type === 'container' ? elements[selectedId] : null) : null;
    const parent = root || elements['root'] || elements['hero-section'] || (Object.values(elements) as EditableElement[]).find(e => e.type === 'container');
    
    if (!parent) return;
    
    const newElements = {
      ...elements,
      [elId]: newElement,
      [parent.id]: {
        ...parent,
        children: [...(parent.children || []), elId]
      }
    };

    setElements(newElements);
    addToHistory(newElements);
    if (type === 'image') {
      setMediaLibrary(prev => Array.from(new Set([...prev, content])));
    }
    setSelectedId(elId);
  };

  const handlePreview = () => {
    localStorage.setItem(`preview_data_${id}`, JSON.stringify(elements));
    window.open(`/preview/${id}`, '_blank');
  };

  const handleDashboard = () => {
    navigate('/');
  };

  const handlePublish = () => {
    alert('Site published successfully! Access link generated.');
  };

  const deleteElement = (id: string) => {
    if (id === 'root') return;
    setElements(prev => {
      const newElements = { ...prev };
      delete newElements[id];
      // Remove from parents
      Object.keys(newElements).forEach(key => {
        if (newElements[key].children) {
          newElements[key].children = newElements[key].children!.filter(childId => childId !== id);
        }
      });
      addToHistory(newElements);
      return newElements;
    });
    setSelectedId(null);
  };

  const handleDragEnd = (id: string, deltaX: number, deltaY: number) => {
    // Basic position update simulation
    const el = elements[id];
    setElements(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        style: {
          ...prev[id].style,
          transform: `translate(${deltaX}px, ${deltaY}px)`
        }
      }
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-aces-black text-white overflow-hidden font-sans select-none antialiased">
      <TopBar 
        templateName={template.name} 
        device={device} 
        setDevice={setDevice} 
        onUndo={undo}
        onRedo={redo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onPreview={handlePreview}
        onPublish={handlePublish}
        onDashboard={handleDashboard}
      />
      
      <div className="flex-1 flex overflow-hidden relative">
        <LeftPanel onAddMedia={addElement} activeTool={activeTool} onToolChange={setActiveTool} />
        
        <AddPanel 
          isOpen={activeTool === 'Add'} 
          onClose={() => setActiveTool('')} 
          onAdd={addElement}
          mediaLibrary={mediaLibrary}
        />
        
        <div className="flex-1 overflow-auto bg-[#050507] flex flex-col items-center p-12 scrollbar-hide relative transition-colors duration-700">
          {/* Landio Aura - Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] landio-aura pointer-events-none"></div>
          
          <MainCanvas 
            elements={elements} 
            selectedId={selectedId} 
            setSelectedId={setSelectedId} 
            device={device}
            updateElement={updateElement}
            deleteElement={deleteElement}
            mediaLibrary={mediaLibrary}
            onAddMedia={addElement}
          />
        </div>
        
        <RightPanel 
          selectedId={selectedId} 
          elements={elements} 
          activeTool={activeTool}
          updateElement={updateElement}
          deleteElement={deleteElement}
          isAIPanelOpen={isAIPanelOpen}
          setIsAIPanelOpen={setIsAIPanelOpen}
          mediaLibrary={mediaLibrary}
          onAddMedia={addElement}
        />
      </div>
    </div>
  );
}
