import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, ChevronRight, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';

interface Poem {
  id?: string;
  title: string;
  content: string;
  author?: string;
  time: any;
}

interface PoetryProps {
  currentUser: string;
}

export default function Poetry({ currentUser: _currentUser }: PoetryProps) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  // Get current user POV
  const storedUser = localStorage.getItem('bloom_current_user') || 'daksh';
  const authorName = storedUser === 'daksh' ? 'Daksh' : 'Mansi';

  // Real-time listener filtered strictly by the current user's author name
  useEffect(() => {
    const q = query(
      collection(db, 'poems'), 
      where('author', '==', authorName),
      orderBy('time', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedPoems: Poem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Poem[];
      setPoems(loadedPoems);
    }, (error) => {
      console.error("Error fetching poems:", error);
    });

    return () => unsubscribe();
  }, [authorName]);

  const handleAddPoem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await addDoc(collection(db, 'poems'), {
        title: newTitle,
        content: newContent,
        author: authorName,
        time: serverTimestamp()
      });
      setNewTitle('');
      setNewContent('');
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding poem:", error);
    }
  };

  // Format Firestore timestamp safely
  const formatTime = (timeField: any) => {
    if (!timeField) return 'Saved just now';
    if (timeField.toDate) {
      return timeField.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return 'Saved recently';
  };

  return (
    <div className="p-6 pt-12 pb-32 flex flex-col gap-6 max-w-2xl mx-auto relative">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] font-semibold tracking-wider text-purple-600 dark:text-lavender uppercase">
            Your words ({authorName}'s Journal)
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-0.5" style={{ color: 'var(--text-main)' }}>
            Poetry
          </h1>
          <p className="text-xs opacity-70 mt-0.5">A quiet, private place for the things you want to keep.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-purple-600 dark:bg-lavender text-white dark:text-darkBg px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
        >
          <Plus size={16} /> New
        </button>
      </div>

      {/* Saved Pieces List */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Saved pieces</h3>
        
        {poems.length === 0 ? (
          <div className="text-center py-10 opacity-60 text-sm">No saved poems yet. Click '+ New' to add one.</div>
        ) : (
          poems.map((poem) => (
            <div
              key={poem.id}
              onClick={() => setSelectedPoem(poem)}
              className="border rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:opacity-90"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-600/10 dark:bg-lavender/10 text-purple-600 dark:text-lavender flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{poem.title}</h4>
                  <p className="text-xs opacity-60 mt-0.5">{formatTime(poem.time)}</p>
                </div>
              </div>
              <ChevronRight size={18} className="opacity-40" />
            </div>
          ))
        )}
      </div>

      {/* Read Poem Modal */}
      {selectedPoem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="border rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 relative animate-in fade-in"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
          >
            <button 
              onClick={() => setSelectedPoem(null)}
              className="absolute top-4 right-4 p-2 opacity-70 hover:opacity-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">{selectedPoem.title}</h2>
            <p className="text-xs opacity-60">{formatTime(selectedPoem.time)}</p>
            <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed py-2">
              {selectedPoem.content}
            </div>
          </div>
        </div>
      )}

      {/* Create Poem Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddPoem}
            className="border rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 relative animate-in fade-in"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
          >
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 opacity-70 hover:opacity-100 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">New Poem / Note</h2>
            <input 
              type="text" 
              placeholder="Title..." 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border rounded-xl p-3 text-sm bg-transparent outline-none"
              style={{ borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
            />
            <textarea 
              placeholder="Write your thoughts..." 
              rows={6}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="border rounded-xl p-3 text-sm bg-transparent outline-none resize-none"
              style={{ borderColor: 'var(--card-border)', color: 'var(--text-main)' }}
            />
            <button 
              type="submit" 
              className="bg-purple-600 dark:bg-lavender text-white dark:text-darkBg py-3 rounded-xl font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
            >
              Save Poem
            </button>
          </form>
        </div>
      )}
    </div>
  );
}