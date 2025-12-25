import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Wand2, 
  Loader2, 
  ChevronRight,
  Save,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

// --- Types ---
interface Step {
  id: string;
  text: string;
  completed: boolean;
}

// --- Firebase Configuration ---
// 대표님이 제공해주신 설정값입니다.
const firebaseConfig = {
  apiKey: "AIzaSyBW7PWXA3a0SsHBs9XvdscAwCrbhlpYoGI",
  authDomain: "next-step-app-f7295.firebaseapp.com",
  projectId: "next-step-app-f7295",
  storageBucket: "next-step-app-f7295.firebasestorage.app",
  messagingSenderId: "1045900060970",
  appId: "1:1045900060970:web:ee32a1f45663c92960d653"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- API Helper ---
const generateStepsFromAI = async (goal: string, currentSteps: Step[], apiKey: string): Promise<string[]> => {
  if (!goal.trim()) return [];

  const existingStepsText = currentSteps.map(s => `- ${s.text}`).join('\n');
  const prompt = `
    I have a goal: "${goal}".
    
    ${existingStepsText ? `I already have these steps:\n${existingStepsText}` : ''}
    
    Please suggest 3 to 5 concrete, actionable next steps to achieve this goal. 
    Return ONLY the steps as a plain text list, one per line. Do not number them or use bullet points, just the text.
    Keep them concise.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) {
        console.warn("API Call failed, using fallback.");
        return [
            "Break the goal down into smaller tasks",
            "Research necessary resources",
            "Set a deadline for the first milestone"
        ];
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return text.split('\n')
      .map(line => line.replace(/^[\d\-\.\*]+\s*/, '').trim())
      .filter(line => line.length > 0);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return [];
  }
};

export default function NextStepApp() {
  // --- State ---
  const [goal, setGoal] = useState(''); // Goal은 로컬 상태로 유지 (DB연동 필요시 확장 가능)
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(false); // AI 로딩
  const [dbLoading, setDbLoading] = useState(true); // DB 로딩
  const [error, setError] = useState<string | null>(null);
  
  // --- Firebase Data Sync ---
  useEffect(() => {
    // steps 컬렉션 실시간 구독
    const q = query(collection(db, "steps"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedSteps = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Step[];
      setSteps(loadedSteps);
      setDbLoading(false);
    }, (err) => {
      console.error("DB Error:", err);
      setError("Failed to load data from Firebase.");
      setDbLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Actions (Firebase Connected) ---

  const addStep = async (text: string) => {
    try {
      await addDoc(collection(db, "steps"), {
        text,
        completed: false,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding step:", err);
      setError("Failed to add step.");
    }
  };

  const toggleStep = async (id: string, currentStatus: boolean) => {
    try {
      const stepRef = doc(db, "steps", id);
      await updateDoc(stepRef, {
        completed: !currentStatus
      });
    } catch (err) {
      console.error("Error toggling step:", err);
    }
  };

  const deleteStep = async (id: string) => {
    try {
      await deleteDoc(doc(db, "steps", id));
    } catch (err) {
      console.error("Error deleting step:", err);
    }
  };

  const updateStepText = async (id: string, newText: string) => {
    // Optimistic update for smoother typing, actual update on blur or debounce could be better
    // For simplicity, we just update local state here to avoid cursor jumping, 
    // but a real app would need a save button or debounce for text fields connected to DB.
    // Here we will update the local state for immediate feedback and fire an update.
    // Note: Frequent updates might hit limits. Consider debouncing in production.
    
    try {
        const stepRef = doc(db, "steps", id);
        await updateDoc(stepRef, { text: newText });
    } catch (err) {
        console.error("Error updating text:", err);
    }
  };

  const handleAiDraft = async () => {
    if (!goal.trim()) {
      setError("Please enter a goal first.");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const apiKey = ""; // API Key injected by environment
      const newStepTexts = await generateStepsFromAI(goal, steps, apiKey);
      
      // Add generated steps to Firebase
      if (newStepTexts.length === 0) {
        await addStep("Plan the first phase");
      } else {
        // Add sequentially
        for (const text of newStepTexts) {
            await addStep(text);
        }
      }
      
    } catch (err: any) {
      setError(err.message || "Something went wrong generating steps.");
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">NextStep</h1>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">DB연동됨</span>
          </div>
          <p className="text-slate-500">Break your big goals into actionable pieces.</p>
        </header>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Goal Input Section */}
          <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100">
            <label htmlFor="goal-input" className="block text-sm font-semibold text-slate-700 mb-2">
              What is your main goal?
            </label>
            <div className="flex flex-col gap-3">
              <textarea
                id="goal-input"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Launch a personal website, Learn to play guitar..."
                className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-lg"
                rows={2}
              />
              
              <div className="flex justify-end">
                <button
                  onClick={handleAiDraft}
                  disabled={loading || !goal.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg font-medium transition-all transform active:scale-95 shadow-md shadow-indigo-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      Generate Next Steps
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Steps List */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                Action Plan <span className="text-slate-400 font-normal text-sm">({steps.filter(s => s.completed).length}/{steps.length})</span>
              </h2>
            </div>

            {dbLoading ? (
               <div className="py-12 flex justify-center text-indigo-500">
                  <Loader2 className="w-8 h-8 animate-spin" />
               </div>
            ) : (
                <div className="space-y-3">
                  {steps.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                      <p>No steps in database yet.</p>
                      <p className="text-sm mt-1">Add one manually or use the AI magic above.</p>
                    </div>
                  ) : (
                    steps.map((step) => (
                      <div 
                        key={step.id} 
                        className={`group flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                          step.completed 
                            ? 'bg-slate-50 border-slate-100' 
                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                        }`}
                      >
                        <button
                          onClick={() => toggleStep(step.id, step.completed)}
                          className={`mt-1 flex-shrink-0 transition-colors ${
                            step.completed ? 'text-green-500' : 'text-slate-300 hover:text-indigo-500'
                          }`}
                        >
                          {step.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </button>
                        
                        {/* Note: In a real DB app, direct editing on keypress like this is aggressive. 
                            Ideally use onBlur or a specific edit mode. For simplicity here, we keep it simple. */}
                        <input
                          type="text"
                          defaultValue={step.text}
                          onBlur={(e) => updateStepText(step.id, e.target.value)}
                          className={`flex-1 bg-transparent border-none focus:ring-0 p-0 text-base ${
                            step.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                          }`} 
                        />

                        <button
                          onClick={() => deleteStep(step.id)}
                          className="mt-1 opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                          aria-label="Delete step"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}

                  {/* Add Manual Step Input */}
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Plus className="w-5 h-5 text-slate-300" />
                    </div>
                    <input
                      type="text"
                      placeholder="Add a step manually..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          if (target.value.trim()) {
                            addStep(target.value.trim());
                            target.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                </div>
            )}
          </div>
          
          {/* Progress Bar */}
          {steps.length > 0 && (
            <div className="h-2 bg-slate-100 w-full">
              <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-8">
          Powered by Gemini • Firebase Enabled
        </p>

      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
