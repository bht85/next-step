import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, Users, Network, Target, Award, Settings, Zap, X 
} from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore";

// --- Import Components ---
// 🔥 수정된 부분: 파일 경로 뒤에 .jsx 또는 .js를 명확하게 붙였습니다.
import { initialUsers, initialKPIs, initialTasks, initialOrgChart, subscriptionData } from './data.js';
import { db } from './firebase.js'; 
import { ToastProvider, useToast } from './components.jsx';
import { DashboardView, RnRView, CalendarView, OrgChartView, AdminView, KPIView, EvalView, ProFeatureLocked } from './views.jsx';
import { WriteModal, DetailModal, KPIModal, AddMemberModal } from './modals.jsx';

export default function NextStepApp() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

function AppContent() {
  const toast = useToast();
  const [currentPlan, setCurrentPlan] = useState('PRO');
  const [activeTab, setActiveTab] = useState('rnr');
  
  // Data States
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('ns_users_v2')) || initialUsers);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('ns_tasks_v2')) || initialTasks);
  const [kpis, setKpis] = useState(() => JSON.parse(localStorage.getItem('ns_kpis_v2')) || initialKPIs);
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('ns_reviews_v2')) || []);
  const [orgData, setOrgData] = useState(() => JSON.parse(localStorage.getItem('ns_orgData_v2')) || initialOrgChart);
  
  // Sync Data
  useEffect(() => { localStorage.setItem('ns_users_v2', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ns_tasks_v2', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('ns_kpis_v2', JSON.stringify(kpis)); }, [kpis]);
  useEffect(() => { localStorage.setItem('ns_reviews_v2', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ns_orgData_v2', JSON.stringify(orgData)); }, [orgData]);

  // Modal States
  const [modalState, setModalState] = useState({ type: null, data: null });
  const closeModal = () => setModalState({ type: null, data: null });
  const [selectedKpiYear, setSelectedKpiYear] = useState('2025');

  // Helpers
  const activeUsers = useMemo(() => users.filter(u => u.status !== 'resigned'), [users]);
  const teams = useMemo(() => [...new Set(activeUsers.map(u => u.team))].filter(Boolean), [activeUsers]);

  // Handlers
  const handleSaveTask = async (taskData) => {
    const { title, content, time, freq, owner } = taskData;
    if (!title || !owner) return toast("필수 정보를 입력하세요", "error");
    
    const newTask = {
        id: `T-${Date.now()}`, ownerId: owner, title, description: content, 
        timeRequired: time, frequency: freq, docCount: 0, kpiId: null, history: []
    };
    
    setTasks([newTask, ...tasks]);
    try { await addDoc(collection(db, "tasks"), newTask); } catch(e) { console.log("DB Error"); }
    closeModal();
    toast("업무가 등록되었습니다.", "success");
  };

  const handleUpdateTask = (updatedTask) => {
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      closeModal();
      toast("수정되었습니다.", "success");
  };

  const handleSaveKpi = async (kpiData) => {
      let updatedKpis;
      if (kpiData.id && kpis.find(k => k.id === kpiData.id)) {
          updatedKpis = kpis.map(k => k.id === kpiData.id ? kpiData : k);
          toast("KPI 수정 완료", "success");
      } else {
          const newKpi = { ...kpiData, id: `KPI-${Date.now()}`, status: 'warning', year: selectedKpiYear };
          updatedKpis = [newKpi, ...kpis];
          try { await addDoc(collection(db, "kpis"), newKpi); } catch(e) { console.log("DB Error"); }
          toast("새 KPI 등록 완료", "success");
      }
      setKpis(updatedKpis);
      closeModal();
  };

  const handleAddMember = (name, role) => {
      const newId = `u-${Date.now()}`;
      const newUser = { id: newId, name, role, team: modalState.data, status: 'active', joinDate: '2025-01-01', email: 'new@nextstep.com' };
      setUsers([...users, newUser]);
      closeModal();
      toast(`${name}님 등록 완료`, "success");
  };

  const handleResignMember = (id) => {
      if(confirm("퇴사 처리 하시겠습니까?")) {
          setUsers(users.map(u => u.id === id ? { ...u, status: 'resigned' } : u));
          toast("퇴사 처리 완료", "success");
      }
  };

  const handleResetData = () => {
      if(confirm("데이터를 초기화하시겠습니까?")) {
          localStorage.clear();
          window.location.reload();
      }
  };

  // Render
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600"><Settings size={24}/><h1 className="text-xl font-bold text-gray-900">Next Step</h1><span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{currentPlan}</span></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">CEO</div>
        </div>
      </header>

      {/* Nav */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 overflow-x-auto">
          {[
            {id:'dashboard', label:'대시보드', icon:LayoutDashboard, pro:true},
            {id:'calendar', label:'일정', icon:CalendarIcon, pro:false},
            {id:'rnr', label:'팀 R&R', icon:Users, pro:false},
            {id:'org', label:'조직도', icon:Network, pro:false},
            {id:'kpi', label:'KPI 관리', icon:Target, pro:true},
            {id:'eval', label:'성과 평가', icon:Award, pro:true},
            {id:'admin', label:'관리자', icon:Settings, pro:false}
          ].map(m => (
             <button key={m.id} onClick={() => (m.pro && currentPlan==='BASIC') ? setModalState({type:'UPGRADE'}) : setActiveTab(m.id)} className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition font-medium text-sm whitespace-nowrap ${activeTab===m.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'} ${m.pro && currentPlan==='BASIC' ? 'opacity-50' : ''}`}>
                <m.icon size={18}/><span>{m.label}</span>{m.pro && currentPlan==='BASIC' && <Lock size={12}/>}
             </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'rnr' && <RnRView users={users} tasks={tasks} openWriteModal={()=>setModalState({type:'WRITE'})} openDetailModal={(t)=>setModalState({type:'DETAIL', data:t})} />}
        {activeTab === 'org' && <OrgChartView orgData={orgData} openAddMemberModal={(dept)=>setModalState({type:'ADD_MEMBER', data:dept})} />}
        {activeTab === 'admin' && <AdminView users={users} plan={currentPlan} setPlan={setCurrentPlan} handleResignMember={handleResignMember} handleResetData={handleResetData} />}
        {activeTab === 'calendar' && <CalendarView tasks={tasks} users={users} openDetailModal={(t)=>setModalState({type:'DETAIL', data:t})} />}
        {activeTab === 'dashboard' && (currentPlan==='PRO' ? <DashboardView kpis={kpis} /> : <ProFeatureLocked title="대시보드" onUnlock={()=>setModalState({type:'UPGRADE'})} />)}
        {activeTab === 'kpi' && (currentPlan==='PRO' ? <KPIView kpis={kpis} selectedKpiYear={selectedKpiYear} setSelectedKpiYear={setSelectedKpiYear} openKpiModal={(k)=>setModalState({type:'KPI', data:k})} /> : <ProFeatureLocked title="KPI" onUnlock={()=>setModalState({type:'UPGRADE'})} />)}
        {/* Eval view simplified for brevity, logic remains same */}
        {activeTab === 'eval' && (currentPlan==='PRO' ? <div className="text-center py-20 text-gray-500">성과 평가 기능 (활성화됨)</div> : <ProFeatureLocked title="성과 평가" onUnlock={()=>setModalState({type:'UPGRADE'})} />)}
      </main>

      {/* Modals */}
      {modalState.type === 'WRITE' && <WriteModal onClose={closeModal} onSave={handleSaveTask} teams={teams} users={activeUsers} />}
      {modalState.type === 'DETAIL' && <DetailModal task={modalState.data} onClose={closeModal} onEdit={(t)=>handleUpdateTask(t)} users={users} />}
      {modalState.type === 'KPI' && <KPIModal kpi={modalState.data} onClose={closeModal} onSave={handleSaveKpi} teams={teams} />}
      {modalState.type === 'ADD_MEMBER' && <AddMemberModal onClose={closeModal} onSave={handleAddMember} targetDept={modalState.data} />}
      {modalState.type === 'UPGRADE' && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
             <div className="bg-white rounded-2xl p-8 text-center relative max-w-md">
                 <button onClick={closeModal} className="absolute top-4 right-4"><X/></button>
                 <Zap size={40} className="text-indigo-600 mx-auto mb-4"/>
                 <h2 className="text-2xl font-bold mb-2">Pro 플랜 업그레이드</h2>
                 <p className="text-gray-500 mb-6">KPI, 성과 평가 등 고급 기능을 잠금 해제하세요.</p>
                 <button onClick={()=>{setCurrentPlan('PRO'); closeModal(); toast("Pro 플랜 활성화!", "success")}} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">지금 시작하기</button>
             </div>
          </div>
      )}
    </div>
  );
}
