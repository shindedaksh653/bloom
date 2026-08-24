import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Heart, X } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface Message {
  id?: string;
  sender: 'daksh' | 'her';
  text?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  time: any;
}

interface ChatProps {
  currentUser: string;
}

export default function Chat({ currentUser }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDaksh = currentUser === 'daksh';

  // Names based on POV
  const chatPartnerName = isDaksh ? 'Mansi' : 'Daksh';

  // Real-time listener for live messages from Firestore database
  useEffect(() => {
    const q = query(collection(db, 'chats'), orderBy('time', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Send text message to Firebase with correct sender POV
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const textToSend = inputText;
    setInputText('');

    try {
      await addDoc(collection(db, 'chats'), {
        sender: isDaksh ? 'daksh' : 'her',
        text: textToSend,
        time: serverTimestamp()
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  // Handle uploading photos/videos and converting to Base64 for cloud sync
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video');

    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = reader.result as string;

      try {
        await addDoc(collection(db, 'chats'), {
          sender: isDaksh ? 'daksh' : 'her',
          mediaUrl: base64String,
          mediaType: isVideo ? 'video' : 'image',
          text: file.name,
          time: serverTimestamp()
        });
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    };

    reader.readAsDataURL(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Check if a message belongs to the currently logged-in user
  const isMyMessage = (sender: string) => {
    if (isDaksh) return sender === 'daksh';
    return sender === 'her';
  };

  return (
    <div className="p-4 pt-12 pb-20 flex flex-col h-[100dvh] max-w-2xl mx-auto relative overflow-hidden">
      
      {/* CHAT HEADER */}
      <div 
        className="border rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-3 transition-colors shrink-0"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="w-11 h-11 rounded-2xl bg-purple-100 dark:bg-lavender/15 text-purple-600 dark:text-lavender flex items-center justify-center shadow-inner">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>{chatPartnerName}</h2>
          <p className="text-[11px] text-green-500 font-medium flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
          </p>
        </div>
      </div>

      {/* MESSAGES LIST */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 mb-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
            <p className="text-sm">No messages yet. Say hello to {chatPartnerName}!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const mine = isMyMessage(msg.sender);
            return (
              <div 
                key={msg.id || index} 
                className={`flex flex-col max-w-[80%] ${mine ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div 
                  className={`p-3.5 rounded-2xl text-sm transition-colors ${
                    mine 
                      ? 'bg-purple-600 dark:bg-lavender text-white dark:text-darkBg rounded-br-sm shadow-md' 
                      : 'border rounded-bl-sm shadow-sm'
                  }`}
                  style={!mine ? { backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-main)' } : {}}
                >
                  {msg.mediaUrl && (
                    <div className="mb-2 overflow-hidden rounded-xl cursor-pointer">
                      {msg.mediaType === 'video' ? (
                        <video controls src={msg.mediaUrl} className="max-h-48 rounded-xl w-full object-cover" />
                      ) : (
                        <img 
                          src={msg.mediaUrl} 
                          alt="Shared media" 
                          className="max-h-48 rounded-xl w-full object-cover hover:opacity-95 transition-opacity"
                          onClick={() => setFullscreenImage(msg.mediaUrl || null)}
                        />
                      )}
                    </div>
                  )}
                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">Just now</span>
              </div>
            );
          })
        )}
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/*,video/*" 
        className="hidden" 
      />

      {/* INPUT BAR */}
      <form 
        onSubmit={handleSendMessage} 
        className="border rounded-2xl p-2 shadow-md flex items-center gap-2 transition-colors shrink-0"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-purple-600 dark:hover:text-lavender transition-colors rounded-xl"
          title="Upload photo or video"
        >
          <Paperclip size={20} />
        </button>

        <input 
          type="text" 
          placeholder={`Message ${chatPartnerName}...`} 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-transparent border-none text-sm placeholder-gray-400 focus:outline-none px-2"
          style={{ color: 'var(--text-main)' }}
        />

        <button 
          type="submit" 
          className="p-2.5 rounded-xl bg-purple-600 dark:bg-lavender text-white dark:text-darkBg hover:opacity-90 transition-opacity shadow-sm"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}