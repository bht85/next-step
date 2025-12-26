import React, { useState } from 'react';
import { X, Save, Edit, Timer, Repeat, Target, ArrowRightLeft, History, AlignLeft } from 'lucide-react';

export const WriteModal = ({ onClose, onSave, teams, users }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [time, setTime] = useState("");
    const [freq, setFreq] = useState("");
    const [owner, setOwner] = useState("");

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-gray-900">새 업무 등록</h3><button onClick={onClose}><X size={24} className="text-gray-400"/></button></div>
            <div className="space-y-4">
               <div><label className="block text-sm font-medium text-gray-700 mb-1">담당자</label><select value={owner} onChange={e=>setOwner(e.target.value)} className="w-full border rounded-lg p-2"><option value="">선택</option>{teams.map(t=><optgroup key={t} label={t}>{users.filter(u=>u.team===t).map(u=><option key={u.id} value={u.id}>{u.name}</option>)}</optgroup>)}</select></div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">제목</label><input className="w-full border rounded-lg p-2" value={title} onChange={e=>setTitle(e.target.value)} /></div>
               <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm text-gray-700">시간</label><input className="w-full border rounded-lg p-2" value={time} onChange={e=>setTime(e.target.value)} placeholder="2H"/></div><div><label className="block text-sm text-gray-700">빈도</label><input className="w-full border rounded-lg p-2" value={freq} onChange={e=>setFreq(e.target.value)} placeholder="매주"/></div></div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">내용</label><textarea className="w-full border rounded-lg p-2 h-24" value={content} onChange={e=>setContent(e.target.value)} /></div>
            </div>
            <div className="flex justify-end gap-2 mt-6"><button onClick={onClose} className="px-4 py-2 text-gray-500">취소</button><button onClick={()=>onSave({title, content, time, freq, owner})} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold">저장</button></div>
          </div>
        </div>
    );
};

export const DetailModal = ({ task, onClose, onEdit, onTransfer, users }) => {
    if (!task) return null;
    const owner = users.find(u => u.id === task.ownerId) || { name: '미정', team: '-' };
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ title: task.title, description: task.description, timeRequired: task.timeRequired, frequency: task.frequency });

    const handleSaveEdit = () => {
        onEdit({ ...task, ...editData });
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex justify-between items-start">
              <div className="flex-1"><span className="text-xs font-bold text-indigo-600 mb-1 block">업무 상세</span>
                {isEditing ? <input className="w-full border-b text-xl font-bold" value={editData.title} onChange={e=>setEditData({...editData, title:e.target.value})}/> : <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>}
              </div>
              <div className="flex gap-2">
                  {!isEditing && <button onClick={()=>setIsEditing(true)}><Edit size={20} className="text-gray-400 hover:text-indigo-600"/></button>}
                  <button onClick={onClose}><X size={24} className="text-gray-400"/></button>
              </div>
            </div>
            <div className="p-6 space-y-6">
               <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border font-bold text-gray-600">{owner.name[0]}</div><div><div className="font-bold text-sm">{owner.name}</div><div className="text-xs text-gray-500">{owner.team}</div></div></div><div className="text-xs font-mono bg-white px-2 py-1 rounded border">{task.id}</div></div>
               <div><h4 className="text-sm font-bold text-gray-700 mb-2 flex items-center"><AlignLeft size={16} className="mr-2"/>내용</h4>
               {isEditing ? <textarea className="w-full border rounded p-2 h-24" value={editData.description} onChange={e=>setEditData({...editData, description:e.target.value})}/> : <div className="text-sm text-gray-600 p-3 border rounded-lg bg-white whitespace-pre-wrap">{task.description}</div>}
               </div>
               <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-50 p-3 rounded-lg border"><div className="text-xs text-gray-500 mb-1 flex items-center"><Timer size={12} className="mr-1"/> 시간</div>
                       {isEditing ? <input className="w-full bg-white border rounded px-1" value={editData.timeRequired} onChange={e=>setEditData({...editData, timeRequired:e.target.value})}/> : <div className="font-bold text-sm">{task.timeRequired}</div>}
                   </div>
                   <div className="bg-gray-50 p-3 rounded-lg border"><div className="text-xs text-gray-500 mb-1 flex items-center"><Repeat size={12} className="mr-1"/> 빈도</div>
                       {isEditing ? <input className="w-full bg-white border rounded px-1" value={editData.frequency} onChange={e=>setEditData({...editData, frequency:e.target.value})}/> : <div className="font-bold text-sm">{task.frequency}</div>}
                   </div>
               </div>
               <div className="flex justify-end pt-2 border-t space-x-2">
                   {isEditing ? (
                       <><button onClick={()=>setIsEditing(false)} className="px-3 py-1 text-sm text-gray-500">취소</button><button onClick={handleSaveEdit} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">저장</button></>
                   ) : (
                       <button onClick={onTransfer} className="flex items-center text-xs font-bold text-gray-500 hover:text-indigo-600 px-3 py-2 rounded hover:bg-gray-100"><ArrowRightLeft size={14} className="mr-1"/> 업무 이관</button>
                   )}
               </div>
            </div>
          </div>
        </div>
    );
};

export const KPIModal = ({ kpi, onClose, onSave, teams }) => {
    const [form, setForm] = useState(kpi || { title: "", team: teams[0], type: "QUANT", target: "", current: "", unit: "", description: "" });
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <h3 className="text-lg font-bold mb-4">{kpi ? 'KPI 수정' : '새 KPI 등록'}</h3>
            <div className="space-y-4">
               <div><label className="text-sm font-bold block mb-1">제목</label><input className="w-full border rounded p-2" value={form.title} onChange={e=>setForm({...form, title: e.target.value})}/></div>
               <div className="grid grid-cols-2 gap-4">
                   <div><label className="text-sm font-bold block mb-1">팀</label><select className="w-full border rounded p-2" value={form.team} onChange={e=>setForm({...form, team: e.target.value})}>{teams.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                   <div><label className="text-sm font-bold block mb-1">유형</label><select className="w-full border rounded p-2" value={form.type} onChange={e=>setForm({...form, type: e.target.value})}><option value="QUANT">정량</option><option value="QUAL">정성</option></select></div>
               </div>
               <div className="grid grid-cols-3 gap-4">
                   <div><label className="text-sm font-bold block mb-1">목표</label><input className="w-full border rounded p-2" value={form.target} onChange={e=>setForm({...form, target: e.target.value})}/></div>
                   <div><label className="text-sm font-bold block mb-1">현재</label><input className="w-full border rounded p-2" value={form.current} onChange={e=>setForm({...form, current: e.target.value})}/></div>
                   <div><label className="text-sm font-bold block mb-1">단위</label><input className="w-full border rounded p-2" value={form.unit} onChange={e=>setForm({...form, unit: e.target.value})}/></div>
               </div>
               <div><label className="text-sm font-bold block mb-1">설명</label><textarea className="w-full border rounded p-2 h-20" value={form.description} onChange={e=>setForm({...form, description: e.target.value})}/></div>
            </div>
            <div className="flex justify-end gap-2 mt-6"><button onClick={onClose} className="px-4 py-2 text-gray-500">취소</button><button onClick={()=>onSave(form)} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">저장</button></div>
          </div>
        </div>
    );
};

export const AddMemberModal = ({ onClose, onSave, targetDept }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <h3 className="text-lg font-bold mb-4">신규 입사자</h3>
            <div className="bg-gray-50 p-2 mb-4 text-center font-bold text-indigo-600">{targetDept}</div>
            <input className="w-full border p-2 rounded mb-2" placeholder="이름" value={name} onChange={e=>setName(e.target.value)}/>
            <input className="w-full border p-2 rounded mb-4" placeholder="직책" value={role} onChange={e=>setRole(e.target.value)}/>
            <div className="flex justify-end gap-2"><button onClick={onClose} className="px-4 py-2 text-gray-500">취소</button><button onClick={()=>onSave(name, role)} className="px-4 py-2 bg-indigo-600 text-white rounded font-bold">등록</button></div>
          </div>
        </div>
    );
};
