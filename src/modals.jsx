import React, { useState } from 'react';
import { 
  Users, Briefcase, FileText, PieChart, Target, Award, Settings, 
  Sparkles, BarChart3, Lock, Zap, CheckCircle2, UserMinus, Plus,
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Repeat, Timer
} from 'lucide-react';
import { Badge, GradeBadge } from './components';

export const DashboardView = ({ kpis, tasks, users }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-2">2025년 프랜차이즈 목표 달성 현황</h2>
            <p className="text-indigo-100 mb-6">가맹점 200호점, 매출 300억 달성을 위해!</p>
            <div className="flex justify-center gap-8">
               <div className="bg-white/20 p-4 rounded-lg min-w-[150px]"><div className="text-3xl font-bold">185억</div><div className="text-sm opacity-80">현재 매출</div></div>
               <div className="bg-white/20 p-4 rounded-lg min-w-[150px]"><div className="text-3xl font-bold">142개</div><div className="text-sm opacity-80">가맹점 수</div></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-700 mb-4">주요 KPI 달성도</h3>
               {kpis.slice(0, 5).map(kpi => {
                  const rate = kpi.unit === 'sec' ? (kpi.target >= kpi.current ? 100 : Math.round((kpi.target / kpi.current) * 100)) : Math.round((kpi.current / kpi.target) * 100);
                  const safeRate = Math.min(rate, 100);
                  return (
                    <div key={kpi.id} className="mb-4 last:mb-0">
                        <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{kpi.title}</span><span className="font-bold text-indigo-600">{safeRate}%</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full" style={{width: `${safeRate}%`}}></div></div>
                    </div>
                  );
               })}
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
               <BarChart3 size={48} className="text-gray-300 mb-4"/><h3 className="font-bold text-gray-800 text-lg mb-2">성과 분석 대시보드</h3><p className="text-gray-500 text-sm mb-4">영업팀 신규 출점 속도: 목표 대비 10% 지연</p>
            </div>
        </div>
    </div>
);

export const RnRView = ({ users, tasks, rnrViewMode, setRnrViewMode, openWriteModal, openDetailModal }) => {
    const teams = [...new Set(users.map(u => u.team))].filter(Boolean);
    const teamGroups = {};
    teams.forEach(team => { 
        const members = users.filter(u => u.team === team); 
        const teamTasks = tasks.filter(t => members.some(m => m.id === t.ownerId)); 
        teamGroups[team] = { members, tasks: teamTasks }; 
    });

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <div><h2 className="text-xl font-bold text-indigo-900 mb-1">팀 업무(R&R) 관리</h2><p className="text-sm text-indigo-700">팀별 업무 분장과 진행 상황을 한눈에 파악하세요.</p></div>
          <div className="flex gap-2">
             <div className="bg-white p-1 rounded-lg flex text-sm shadow-sm">
                <button onClick={() => setRnrViewMode('team')} className={`px-3 py-1.5 rounded transition ${rnrViewMode === 'team' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-500'}`}>팀별</button>
                <button onClick={() => setRnrViewMode('user')} className={`px-3 py-1.5 rounded transition ${rnrViewMode === 'user' ? 'bg-indigo-100 text-indigo-700 font-bold' : 'text-gray-500'}`}>인원별</button>
             </div>
             <button onClick={openWriteModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center shadow-md"><Plus size={18} className="mr-2"/> 업무 추가</button>
          </div>
        </div>
        {rnrViewMode === 'team' ? (
          <div className="grid gap-6">{Object.entries(teamGroups).map(([teamName, data]) => (
            <div key={teamName} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3"><h3 className="font-bold text-gray-800 flex items-center text-lg"><Briefcase size={20} className="mr-2 text-gray-500"/> {teamName}</h3><Badge color="blue">{data.members.length}명 / {data.tasks.length}개 업무</Badge></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.tasks.map(task => { 
                      const owner = users.find(u => u.id === task.ownerId); 
                      return (
                        <div key={task.id} onClick={() => openDetailModal(task)} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition bg-gray-50/50 hover:bg-white cursor-pointer group">
                           <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-gray-500">{owner?.name} {owner?.role}</span>{task.kpiId && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">KPI</span>}</div>
                           <div className="text-[10px] text-gray-400 mb-1 font-mono">{task.id}</div>
                           <h4 className="font-bold text-gray-800 text-sm mb-1">{task.title}</h4>
                           <div className="mt-2 flex gap-2 text-[10px] text-gray-400"><Timer size={10}/> {task.timeRequired} <span className="text-gray-300">|</span> <Repeat size={10}/> {task.frequency}</div>
                        </div>
                      ); 
                  })}
               </div>
            </div>
          ))}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{users.map(u => (
            <div key={u.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100"><div><div className="font-bold text-gray-800">{u.name}</div><div className="text-xs text-gray-500">{u.team} {u.role}</div></div><div className="text-xs bg-gray-100 px-2 py-1 rounded">{tasks.filter(t => t.ownerId === u.id).length}건</div></div>
               <div className="space-y-2">{tasks.filter(t => t.ownerId === u.id).map(t => (<div key={t.id} onClick={() => openDetailModal(t)} className="bg-gray-50 p-2 rounded border border-gray-100 text-sm flex justify-between cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition"><span className="truncate">{t.title}</span><span className="text-xs text-gray-400 ml-2">{t.id}</span></div>))}</div>
            </div>
          ))}</div>
        )}
      </div>
    );
};

export const CalendarView = ({ tasks, users, openDetailModal }) => {
    const today = new Date();
    const [filterTeam, setFilterTeam] = useState('ALL');
    const teams = [...new Set(users.map(u => u.team))].filter(Boolean);
    const filteredTasks = tasks.filter(task => {
        if (filterTeam === 'ALL') return true;
        const owner = users.find(u => u.id === task.ownerId);
        return owner?.team === filterTeam;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm gap-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center"><CalendarIcon className="mr-2 text-indigo-600"/> {today.getFullYear()}년 {today.getMonth()+1}월</h2>
                <div className="flex items-center gap-3">
                    <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none"><option value="ALL">전체 조직</option>{teams.map(t => <option key={t} value={t}>{t}</option>)}</select>
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg"><button className="p-1 rounded hover:bg-gray-200"><ChevronLeft size={16}/></button><span className="font-bold text-gray-700 px-2 flex items-center text-sm">Today</span><button className="p-1 rounded hover:bg-gray-200"><ChevronRight size={16}/></button></div>
                </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-7 text-center bg-gray-50 border-b border-gray-200">{['일', '월', '화', '수', '목', '금', '토'].map(d => <div key={d} className="py-2 text-sm font-bold text-gray-500">{d}</div>)}</div>
                <div className="grid grid-cols-7 h-[600px] overflow-y-auto">
                    {Array.from({length: 31}).map((_, i) => {
                        const day = i + 1;
                        const dayTasks = filteredTasks.filter((t, idx) => (idx + day) % 7 === 0 || (t.frequency === '매일' && day % 2 === 0)).slice(0, 3);
                        const isToday = day === today.getDate();
                        return (
                            <div key={day} className="border-b border-r border-gray-100 p-2 min-h-[80px] relative hover:bg-gray-50 transition flex flex-col gap-1">
                                <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-gray-700'}`}>{day}</span>
                                <div className="space-y-1">
                                    {dayTasks.map(t => {
                                        const owner = users.find(u => u.id === t.ownerId);
                                        const color = owner?.team.includes('영업')?'bg-blue-50 text-blue-700':owner?.team.includes('운영')?'bg-green-50 text-green-700':'bg-indigo-50 text-indigo-700';
                                        return <div key={t.id} className={`text-[10px] px-1.5 py-1 rounded truncate cursor-pointer hover:opacity-80 ${color}`} onClick={(e) => { e.stopPropagation(); openDetailModal(t); }}>{t.title}</div>;
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const KPIView = ({ kpis, openKpiModal, selectedKpiYear, setSelectedKpiYear }) => {
    const filteredKpis = kpis.filter(k => k.year === selectedKpiYear);
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <div><h2 className="text-xl font-bold text-gray-800">전사 KPI 관리</h2><p className="text-sm text-gray-500">정량(Quant) 및 정성(Qual) 지표를 모두 관리합니다.</p></div>
                <div className="flex space-x-3">
                     <div className="relative"><select value={selectedKpiYear} onChange={(e) => setSelectedKpiYear(e.target.value)} className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg font-bold"><option value="2025">2025년</option><option value="2024">2024년</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDown size={16} /></div></div>
                     <button onClick={() => openKpiModal()} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"><Plus size={18} /><span>새 KPI</span></button>
                </div>
            </div>
            <div className="grid gap-6">
                {filteredKpis.length > 0 ? filteredKpis.map((kpi) => (
                    <div 
                        key={kpi.id} 
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-indigo-300 transition cursor-pointer"
                        onClick={() => openKpiModal(kpi)}
                    >
                        <div className="flex justify-between">
                            <div>
                                <Badge color={kpi.type === 'QUANT' ? 'indigo' : 'orange'}>{kpi.type}</Badge>
                                <h3 className="text-lg font-bold mt-2">{kpi.title}</h3>
                                <p className="text-sm text-gray-500">{kpi.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">{kpi.current}</div>
                                <div className="text-xs text-gray-400">목표: {kpi.target}</div>
                            </div>
                        </div>
                    </div>
                )) : <div className="text-center py-12 text-gray-500">등록된 KPI가 없습니다.</div>}
            </div>
        </div>
    );
};

export const AdminView = ({ users, plan, setPlan, setAdminTab, adminTab, teams, openAddMemberModal, handleResignMember, handleResetData }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg flex justify-between items-center">
            <div><h2 className="text-xl font-bold flex items-center"><Settings className="mr-2"/> 관리자 설정 (Demo)</h2><p className="text-gray-400 text-sm">요금제를 변경하여 기능을 테스트해보세요.</p></div>
            <div className="bg-white/20 p-1 rounded-lg flex text-sm"><button onClick={() => setPlan('BASIC')} className={`px-4 py-2 rounded transition ${plan === 'BASIC' ? 'bg-white text-gray-900 font-bold' : 'text-gray-300'}`}>Basic</button><button onClick={() => setPlan('PRO')} className={`px-4 py-2 rounded transition ${plan === 'PRO' ? 'bg-indigo-500 text-white font-bold' : 'text-gray-300'}`}>Pro</button></div>
        </div>
        <div className="flex space-x-4 border-b border-gray-200 pb-1"><button onClick={() => setAdminTab('hr')} className={`pb-2 px-1 text-sm font-medium ${adminTab === 'hr' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>인사 관리</button><button onClick={() => setAdminTab('subscription')} className={`pb-2 px-1 text-sm font-medium ${adminTab === 'subscription' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>구독 정보</button></div>
        {adminTab === 'hr' ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-700">임직원 리스트 ({users.filter(u=>u.status!=='resigned').length}명)</h3><button onClick={openAddMemberModal} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">입사자 등록</button></div>
                <div className="max-h-[400px] overflow-y-auto"><table className="w-full text-sm text-left"><thead className="bg-white text-gray-500 border-b border-gray-100 sticky top-0"><tr><th className="px-4 py-2">이름</th><th className="px-4 py-2">부서/직책</th><th className="px-4 py-2">상태</th><th className="px-4 py-2 text-right">관리</th></tr></thead><tbody className="divide-y divide-gray-50">{users.map(u => (<tr key={u.id}><td className="px-4 py-3">{u.name}</td><td className="px-4 py-3 text-gray-500">{u.team} {u.role}</td><td className="px-4 py-3">{u.status === 'active' ? <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">재직</span> : <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs">퇴사</span>}</td><td className="px-4 py-3 text-right"><button onClick={() => handleResignMember(u.id)} className="text-red-500 text-xs underline">퇴사</button></td></tr>))}</tbody></table></div>
            </div>
        ) : (
            <div className="bg-white p-10 text-center text-gray-500 rounded-xl border border-gray-200 border-dashed">
                <p className="mb-4">현재 {plan} 플랜 이용 중</p>
                <button onClick={handleResetData} className="flex items-center mx-auto text-red-500 hover:text-red-700 text-sm font-bold bg-red-50 px-4 py-2 rounded-lg border border-red-200"><Trash2 size={16} className="mr-2"/> 데이터 초기화</button>
            </div>
        )}
    </div>
);

export const OrgChartView = ({ orgData, isOrgEditMode, setIsOrgEditMode, openAddMemberModal }) => (
    <div className="space-y-4 animate-fade-in">
        <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm overflow-x-auto flex justify-center min-h-[600px]">
           <div className="flex flex-col items-center">
              <div className="w-48 bg-indigo-600 text-white p-3 rounded-lg text-center font-bold shadow-md relative z-10">{orgData.name} <span className="text-indigo-200 text-xs">{orgData.role}</span><div className="absolute h-8 w-0.5 bg-gray-300 -bottom-8 left-1/2"></div></div>
              <div className="flex gap-6 mt-8 border-t-2 border-gray-300 pt-8 relative">
                 {orgData.children.map((dept, idx) => (
                    <div key={idx} className="flex flex-col items-center relative">
                       <div className="absolute h-8 w-0.5 bg-gray-300 -top-8"></div>
                       <div className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-gray-700 mb-4 border border-gray-200 shadow-sm">{dept.name}</div>
                       <div className="space-y-2">{dept.children.map((m, mi) => (<div key={mi} className="bg-white border border-gray-200 p-2 rounded w-40 text-center text-sm shadow-sm"><span className="font-bold">{m.name}</span> <span className="text-gray-500 text-xs">{m.role}</span></div>))}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
    </div>
);

export const ProFeatureLocked = ({ title, onUnlock }) => (
    <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center p-6 animate-fade-in">
        <div className="bg-indigo-100 p-4 rounded-full mb-4"><Lock size={48} className="text-indigo-600"/></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title} 기능은 Pro 플랜 전용입니다.</h2>
        <button onClick={onUnlock} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg mt-4 flex items-center"><Zap size={20} className="mr-2 fill-current"/> Pro 플랜 체험하기</button>
    </div>
);
