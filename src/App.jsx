import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, FileText, CheckSquare, ChevronRight, Plus, Search, Briefcase, 
  ArrowRight, Save, Clock, LayoutDashboard, Network, Edit3, UserPlus, 
  AlertCircle, CheckCircle2, Paperclip, ArrowRightLeft, MoreHorizontal, X, 
  History, Phone, Mail, Calendar, Sparkles, Loader2, Repeat, Timer, Target, 
  Link as LinkIcon, TrendingUp, Settings, CreditCard, Shield, Zap, BarChart3, 
  ChevronDown, Award, Star, MessageSquare, PieChart, LogOut, UserMinus, 
  Briefcase as DeptIcon, RefreshCw, Lock 
} from 'lucide-react';

// --- 프랜차이즈 시나리오 더미 데이터 (복구됨) ---

const initialUsers = [
  // 1. 대표이사
  { id: 'ceo', name: '김대표', team: '임원실', role: 'CEO', phone: '010-1111-0001', email: 'ceo@franchise.com', status: 'active', joinDate: '2015-03-01' },
  
  // 2. 영업팀 (3명)
  { id: 'sales1', name: '박영업', team: '영업팀', role: '팀장', phone: '010-2222-0001', email: 'park.sales@franchise.com', status: 'active', joinDate: '2018-05-10' },
  { id: 'sales2', name: '최매출', team: '영업팀', role: '과장', phone: '010-2222-0002', email: 'choi.sales@franchise.com', status: 'active', joinDate: '2020-01-15' },
  { id: 'sales3', name: '정개척', team: '영업팀', role: '대리', phone: '010-2222-0003', email: 'jung.sales@franchise.com', status: 'active', joinDate: '2022-08-20' },

  // 3. 운영팀 (10명)
  { id: 'ops1', name: '이운영', team: '운영팀', role: '팀장', phone: '010-3333-0001', email: 'lee.ops@franchise.com', status: 'active', joinDate: '2017-11-01' },
  { id: 'ops2', name: '김슈퍼', team: '운영팀', role: 'SV(슈퍼바이저)', phone: '010-3333-0002', email: 'kim.sv@franchise.com', status: 'active', joinDate: '2019-04-05' },
  { id: 'ops3', name: '박관리', team: '운영팀', role: 'SV(슈퍼바이저)', phone: '010-3333-0003', email: 'park.sv@franchise.com', status: 'active', joinDate: '2021-02-12' },
  { id: 'ops4', name: '최매장', team: '운영팀', role: 'SV(슈퍼바이저)', phone: '010-3333-0004', email: 'choi.sv@franchise.com', status: 'active', joinDate: '2021-06-30' },
  { id: 'ops5', name: '정품질', team: '운영팀', role: 'QSC 담당', phone: '010-3333-0005', email: 'jung.qsc@franchise.com', status: 'active', joinDate: '2020-09-15' },
  { id: 'ops6', name: '강교육', team: '운영팀', role: '교육 담당', phone: '010-3333-0006', email: 'kang.edu@franchise.com', status: 'active', joinDate: '2022-01-10' },
  { id: 'ops7', name: '조순회', team: '운영팀', role: 'SV(슈퍼바이저)', phone: '010-3333-0007', email: 'cho.sv@franchise.com', status: 'active', joinDate: '2023-03-01' },
  { id: 'ops8', name: '윤해결', team: '운영팀', role: 'SV(슈퍼바이저)', phone: '010-3333-0008', email: 'yoon.sv@franchise.com', status: 'active', joinDate: '2023-05-20' },
  { id: 'ops9', name: '장매뉴', team: '운영팀', role: '매뉴얼 담당', phone: '010-3333-0009', email: 'jang.manual@franchise.com', status: 'active', joinDate: '2024-01-02' },
  { id: 'ops10', name: '한신입', team: '운영팀', role: '사원', phone: '010-3333-0010', email: 'han.new@franchise.com', status: 'active', joinDate: '2025-01-01' },

  // 4. 마케팅팀 (2명)
  { id: 'mkt1', name: '임마케', team: '마케팅팀', role: '팀장', phone: '010-4444-0001', email: 'lim.mkt@franchise.com', status: 'active', joinDate: '2019-12-01' },
  { id: 'mkt2', name: '송홍보', team: '마케팅팀', role: '대리', phone: '010-4444-0002', email: 'song.pr@franchise.com', status: 'active', joinDate: '2023-07-01' },

  // 5. 상품개발팀 (3명)
  { id: 'rnd1', name: '최맛나', team: '상품개발팀', role: '팀장(셰프)', phone: '010-5555-0001', email: 'choi.chef@franchise.com', status: 'active', joinDate: '2016-08-20' },
  { id: 'rnd2', name: '김연구', team: '상품개발팀', role: '연구원', phone: '010-5555-0002', email: 'kim.rnd@franchise.com', status: 'active', joinDate: '2021-11-11' },
  { id: 'rnd3', name: '이소스', team: '상품개발팀', role: '연구원', phone: '010-5555-0003', email: 'lee.sauce@franchise.com', status: 'active', joinDate: '2024-02-15' },

  // 6. 경영지원팀 (4명)
  { id: 'fin1', name: '나재무', team: '경영지원팀', role: '팀장(CFO)', phone: '010-6666-0001', email: 'na.cfo@franchise.com', status: 'active', joinDate: '2017-01-05' },
  { id: 'fin2', name: '조회계', team: '경영지원팀', role: '재무 대리', phone: '010-6666-0002', email: 'cho.acct@franchise.com', status: 'active', joinDate: '2022-04-01' },
  { id: 'hr1', name: '박인사', team: '경영지원팀', role: '인사 과장', phone: '010-6666-0003', email: 'park.hr@franchise.com', status: 'active', joinDate: '2020-10-10' },
  { id: 'ga1', name: '이총무', team: '경영지원팀', role: '총무 사원', phone: '010-6666-0004', email: 'lee.ga@franchise.com', status: 'active', joinDate: '2024-09-01' },
];

const initialKPIs = [
  // 전사
  { id: 'KPI-CO-25', year: '2025', team: '전사', type: 'QUANT', title: '연 매출 300억 달성', target: 300, current: 185, unit: '억', status: 'warning', description: '기존점 매출 증대 및 신규 출점을 통한 외형 성장' },
  // 영업
  { id: 'KPI-SA-01', year: '2025', team: '영업팀', type: 'QUANT', title: '가맹점 200호점 돌파', target: 200, current: 142, unit: '개', status: 'warning', description: '지방 거점 도시 신규 출점 집중' },
  // 마케팅
  { id: 'KPI-MK-01', year: '2025', team: '마케팅팀', type: 'QUANT', title: '분기별 시즌 프로모션 실행', target: 4, current: 1, unit: '회', status: 'success', description: '신메뉴 출시 연계 및 브랜드 인지도 제고' },
  // 운영
  { id: 'KPI-OP-01', year: '2025', team: '운영팀', type: 'QUAL', title: '가맹점 관리 프로세스 표준화', target: '완료', current: '진행중', grade: 'B', status: 'warning', description: 'QSC 점검 기준 통일 및 리포트 시스템화' },
  { id: 'KPI-OP-02', year: '2025', team: '운영팀', type: 'QUANT', title: '평균 QSC 점수 90점 달성', target: 90, current: 84, unit: '점', status: 'warning', description: '위생 등급제 인증 확대' },
  // 상품개발
  { id: 'KPI-RD-01', year: '2025', team: '상품개발팀', type: 'QUANT', title: '시그니처 신메뉴 2종 출시', target: 2, current: 1, unit: '종', status: 'success', description: '매출 견인 핵심 메뉴 개발' },
  // 경영지원
  { id: 'KPI-MS-01', year: '2025', team: '경영지원팀', type: 'QUAL', title: '신규 ERP/그룹웨어 도입', target: '안정화', current: '선정 완료', grade: 'A', status: 'success', description: '수기 업무 자동화' },
  { id: 'KPI-MS-02', year: '2025', team: '경영지원팀', type: 'QUAL', title: '업무 효율화 캠페인', target: '회의 30% 절감', current: '기획 단계', grade: 'B', status: 'warning', description: '스마트워크 문화 정착' }
];

const initialTasks = [
  // 영업
  { id: 'T-SA-01', ownerId: 'sales1', kpiId: 'KPI-SA-01', title: '창업 박람회 부스 운영', description: '프랜차이즈 박람회 상담 및 DB 확보', docCount: 2, updatedAt: '2025.01.10', timeRequired: '20H', frequency: '분기 1회', history: [] },
  { id: 'T-SA-02', ownerId: 'sales2', kpiId: 'KPI-SA-01', title: '신규 가맹 상담', description: '일일 문의 고객 응대 및 상권 분석', docCount: 5, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '매일', history: [] },
  // 운영
  { id: 'T-OP-01', ownerId: 'ops1', kpiId: 'KPI-OP-01', title: '체크리스트 개편', description: '점검 항목 최적화 및 모바일화', docCount: 1, updatedAt: '2025.01.05', timeRequired: '10H', frequency: '일회성', history: [] },
  { id: 'T-OP-02', ownerId: 'ops2', kpiId: 'KPI-OP-02', title: '권역 순회 점검', description: '가맹점 QSC 점검 및 점주 면담', docCount: 12, updatedAt: '2025.01.22', timeRequired: '6H', frequency: '매일', history: [] },
  // 마케팅
  { id: 'T-MK-01', ownerId: 'mkt1', kpiId: 'KPI-MK-01', title: '봄 시즌 프로모션 기획', description: '체험단 운영 및 포스터 디자인 발주', docCount: 4, updatedAt: '2025.01.18', timeRequired: '15H', frequency: '시즌별', history: [] },
  // 개발
  { id: 'T-RD-01', ownerId: 'rnd1', kpiId: 'KPI-RD-01', title: '여름 한정 메뉴 테스트', description: '경쟁사 분석 및 블라인드 테스트', docCount: 2, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '주간', history: [] },
  // 지원
  { id: 'T-MS-01', ownerId: 'fin1', kpiId: 'KPI-CO-25', title: '월간 손익 마감', description: '전사 매출 집계 및 로열티 정산', docCount: 10, updatedAt: '2025.01.01', timeRequired: '8H', frequency: '월 1회', history: [] },
  { id: 'T-MS-02', ownerId: 'hr1', kpiId: 'KPI-MS-01', title: '그룹웨어 업체 미팅', description: '주요 솔루션 비교 및 견적 검토', docCount: 3, updatedAt: '2025.01.12', timeRequired: '2H', frequency: '수시', history: [] }
];

const initialOrgChart = {
  name: "김대표 CEO",
  role: "대표이사",
  hasRnR: true,
  children: [
    {
      name: "영업팀",
      type: "department",
      children: [
        { name: "박영업", role: "팀장", hasRnR: true, id: 'sales1' },
        { name: "최매출", role: "과장", hasRnR: true, id: 'sales2' },
        { name: "정개척", role: "대리", hasRnR: true, id: 'sales3' }
      ]
    },
    {
      name: "운영팀",
      type: "department",
      children: [
        { name: "이운영", role: "팀장", hasRnR: true, id: 'ops1' },
        { name: "김슈퍼", role: "SV", hasRnR: true, id: 'ops2' },
        { name: "...", role: "외 8명", hasRnR: true, id: 'ops_etc' }
      ]
    },
    {
      name: "마케팅팀",
      type: "department",
      children: [
        { name: "임마케", role: "팀장", hasRnR: true, id: 'mkt1' },
        { name: "송홍보", role: "대리", hasRnR: true, id: 'mkt2' }
      ]
    },
    {
      name: "상품개발팀",
      type: "department",
      children: [
        { name: "최맛나", role: "팀장", hasRnR: true, id: 'rnd1' },
        { name: "김연구", role: "연구원", hasRnR: true, id: 'rnd2' },
        { name: "이소스", role: "연구원", hasRnR: true, id: 'rnd3' }
      ]
    },
    {
      name: "경영지원팀",
      type: "department",
      children: [
        { name: "나재무", role: "팀장", hasRnR: true, id: 'fin1' },
        { name: "박인사", role: "과장", hasRnR: true, id: 'hr1' },
        { name: "조회계", role: "대리", hasRnR: true, id: 'fin2' },
        { name: "이총무", role: "사원", hasRnR: true, id: 'ga1' }
      ]
    }
  ]
};

const initialReviews = [
  { id: 'REV-24-4Q-01', period: '2024 4Q', userId: 'sales1', status: 'completed', overallGrade: 'A', selfComment: '목표 초과 달성', managerComment: '수고 많으셨습니다.' }
];

const subscriptionData = {
  plan: "Pro", // 초기값을 Pro로 설정하여 더미 데이터가 바로 보이게 함 (데모용)
  status: "active",
  price: "50,000원 / 월",
  nextBilling: "2025.02.15",
  paymentMethod: "법인카드 (**** 5678)",
  usage: { seats: { used: 23, total: 30 }, storage: { used: 120, total: 500, unit: "GB" }, aiCredits: { used: 4500, total: 10000 } },
  billingHistory: [ { date: "2025.01.15", amount: "50,000원", status: "결제완료" } ]
};

// --- Utils ---
const Badge = ({ children, color = 'blue' }) => {
  const colorClass = {
    blue: 'bg-blue-100 text-blue-800', green: 'bg-green-100 text-green-800', yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800', red: 'bg-red-100 text-red-800', purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800', orange: 'bg-orange-100 text-orange-800'
  }[color];
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{children}</span>;
};

const GradeBadge = ({ grade }) => {
  const color = { 'S': 'purple', 'A': 'green', 'B': 'blue', 'C': 'yellow', 'D': 'red' }[grade] || 'gray';
  return <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm bg-${color}-100 text-${color}-700 border border-${color}-200`}>{grade}</span>;
};

// Mock AI
const generateAIContent = async (prompt) => new Promise(r => setTimeout(() => r("[Pro 기능] AI가 작성한 스마트한 내용이 여기에 표시됩니다."), 1000));


export default function NextStepApp() {
  // --- Global State ---
  const [currentPlan, setCurrentPlan] = useState('PRO'); // 데모용 초기값 PRO
  const [activeTab, setActiveTab] = useState('rnr'); 
  
  // Data State
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('ns_users')) || initialUsers);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('ns_tasks')) || initialTasks);
  const [kpis, setKpis] = useState(() => JSON.parse(localStorage.getItem('ns_kpis')) || initialKPIs);
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('ns_reviews')) || initialReviews);
  const [orgData, setOrgData] = useState(() => JSON.parse(localStorage.getItem('ns_orgData')) || initialOrgChart);

  useEffect(() => { localStorage.setItem('ns_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ns_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('ns_kpis', JSON.stringify(kpis)); }, [kpis]);
  useEffect(() => { localStorage.setItem('ns_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ns_orgData', JSON.stringify(orgData)); }, [orgData]);

  // UI States
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); 
  const [rnrViewMode, setRnrViewMode] = useState('team'); 
  const [isOrgEditMode, setIsOrgEditMode] = useState(false);
  const [adminTab, setAdminTab] = useState('hr');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [targetDeptForAdd, setTargetDeptForAdd] = useState("");

  // Filters
  const [selectedKpiYear, setSelectedKpiYear] = useState('2025');
  const [selectedEvalPeriod, setSelectedEvalPeriod] = useState('2025 1Q');
  const [selectedEvalUser, setSelectedEvalUser] = useState('sales1'); 
  const [evalViewType, setEvalViewType] = useState('team');

  // Form States
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocContent, setNewDocContent] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");
  
  // Helpers
  const activeUsers = useMemo(() => users.filter(u => u.status !== 'resigned'), [users]);
  const teams = useMemo(() => [...new Set(activeUsers.map(u => u.team))], [activeUsers]);
  const years = useMemo(() => [...new Set(kpis.map(k => k.year))].sort().reverse(), [kpis]);

  const getUserInfo = (id) => users.find(u => u.id === id) || { name: '미정', role: '' };
  const calculateAchievement = (kpi) => {
    if (kpi.type === 'QUAL') return 0;
    const rate = kpi.unit === 'sec' ? (kpi.target >= kpi.current ? 100 : Math.round((kpi.target / kpi.current) * 100)) : Math.round((kpi.current / kpi.target) * 100);
    return Math.min(rate, 100);
  };
  const getYearlyKpiStats = () => years.map(year => {
      const yearKpis = kpis.filter(k => k.year === year && k.type === 'QUANT');
      const rate = yearKpis.length ? Math.round(yearKpis.reduce((acc, k) => acc + calculateAchievement(k), 0) / yearKpis.length) : 0;
      return { year, rate };
  }).sort((a,b) => a.year.localeCompare(b.year));

  // --- Handlers ---
  const handleProFeatureClick = () => { if (currentPlan === 'BASIC') setShowUpgradeModal(true); };
  const handleSaveTask = () => {
    const newTask = { id: `T-${Date.now()}`, ownerId: 'sales1', kpiId: null, title: newDocTitle, description: newDocContent, docCount: 0, updatedAt: '2025.01.25', timeRequired: '1H', frequency: '수시', history: [] };
    setTasks([newTask, ...tasks]); setShowWriteModal(false); alert("저장됨");
  };
  const handleAddMember = () => {
      if (!newMemberName || !newMemberRole || !targetDeptForAdd) return alert("정보 입력 필요");
      const newId = `u-${Date.now()}`;
      setUsers([...users, { id: newId, name: newMemberName, role: newMemberRole, team: targetDeptForAdd, status: 'active', joinDate: '2025-01-25', email: 'new@nextstep.com' }]);
      setShowAddMemberModal(false); alert("추가됨");
  };

  // --- Views ---

  const NavigationBar = () => {
    const menuItems = [
      { id: 'dashboard', label: '대시보드', icon: LayoutDashboard, proOnly: true },
      { id: 'rnr', label: '팀 R&R', icon: Users, proOnly: false },
      { id: 'org', label: '조직도', icon: Network, proOnly: false },
      { id: 'kpi', label: 'KPI 관리', icon: Target, proOnly: true },
      { id: 'eval', label: '성과 평가', icon: Award, proOnly: true },
      { id: 'admin', label: '관리자', icon: Settings, proOnly: false },
    ];
    return (
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 overflow-x-auto no-scrollbar">
          {menuItems.map((item) => {
            const isLocked = item.proOnly && currentPlan === 'BASIC';
            return (
              <button key={item.id} onClick={() => isLocked ? handleProFeatureClick() : setActiveTab(item.id)} className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition font-medium text-sm whitespace-nowrap ${activeTab === item.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'} ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <item.icon size={18} /><span>{item.label}</span>{isLocked && <Lock size={12} className="text-gray-400 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const RnRView = () => {
    const teamGroups = {};
    teams.forEach(team => {
      const members = activeUsers.filter(u => u.team === team);
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
             <button onClick={() => { setNewDocTitle(""); setShowWriteModal(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center shadow-md"><Plus size={18} className="mr-2"/> 업무 추가</button>
          </div>
        </div>

        {rnrViewMode === 'team' ? (
          <div className="grid gap-6">
            {Object.entries(teamGroups).map(([teamName, data]) => (
              <div key={teamName} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-gray-800 flex items-center text-lg"><Briefcase size={20} className="mr-2 text-gray-500"/> {teamName}</h3>
                  <Badge color="blue">{data.members.length}명 / {data.tasks.length}개 업무</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.tasks.map(task => {
                    const owner = activeUsers.find(u => u.id === task.ownerId);
                    return (
                      <div key={task.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition bg-gray-50/50 hover:bg-white cursor-pointer group">
                        <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-gray-500">{owner?.name} {owner?.role}</span>{task.kpiId && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">KPI</span>}</div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">{task.title}</h4>
                        <div className="mt-2 flex gap-2 text-[10px] text-gray-400"><Timer size={10}/> {task.timeRequired} <span className="text-gray-300">|</span> <Repeat size={10}/> {task.frequency}</div>
                      </div>
                    );
                  })}
                  {data.tasks.length === 0 && <div className="col-span-3 py-6 text-center text-gray-400 text-sm">등록된 업무가 없습니다.</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {activeUsers.map(u => (
               <div key={u.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                     <div><div className="font-bold text-gray-800">{u.name}</div><div className="text-xs text-gray-500">{u.team} {u.role}</div></div>
                     <div className="text-xs bg-gray-100 px-2 py-1 rounded">{tasks.filter(t => t.ownerId === u.id).length}건</div>
                  </div>
                  <div className="space-y-2">
                     {tasks.filter(t => t.ownerId === u.id).map(t => (
                        <div key={t.id} className="bg-gray-50 p-2 rounded border border-gray-100 text-sm flex justify-between"><span className="truncate">{t.title}</span></div>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    );
  };

  const OrgChartView = () => (
    <div className="space-y-4 animate-fade-in">
       <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm overflow-x-auto flex justify-center min-h-[600px]">
          <div className="flex flex-col items-center">
             <div className="w-48 bg-indigo-600 text-white p-3 rounded-lg text-center font-bold shadow-md relative z-10">{orgData.name} <span className="text-indigo-200 text-xs">{orgData.role}</span><div className="absolute h-8 w-0.5 bg-gray-300 -bottom-8 left-1/2"></div></div>
             <div className="flex gap-6 mt-8 border-t-2 border-gray-300 pt-8 relative">
                {orgData.children.map((dept, idx) => (
                   <div key={idx} className="flex flex-col items-center relative">
                      <div className="absolute h-8 w-0.5 bg-gray-300 -top-8"></div>
                      <div className="bg-gray-100 px-4 py-2 rounded-lg font-bold text-gray-700 mb-4 border border-gray-200 shadow-sm">{dept.name}</div>
                      <div className="space-y-2">
                         {dept.children.map((m, mi) => (
                            <div key={mi} className="bg-white border border-gray-200 p-2 rounded w-40 text-center text-sm shadow-sm"><span className="font-bold">{m.name}</span> <span className="text-gray-500 text-xs">{m.role}</span></div>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  const AdminView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg flex justify-between items-center">
            <div><h2 className="text-xl font-bold flex items-center"><Settings className="mr-2"/> 관리자 설정 (Demo)</h2><p className="text-gray-400 text-sm">요금제를 변경하여 기능을 테스트해보세요.</p></div>
            <div className="bg-white/20 p-1 rounded-lg flex text-sm"><button onClick={() => setCurrentPlan('BASIC')} className={`px-4 py-2 rounded transition ${currentPlan === 'BASIC' ? 'bg-white text-gray-900 font-bold' : 'text-gray-300'}`}>Basic</button><button onClick={() => setCurrentPlan('PRO')} className={`px-4 py-2 rounded transition ${currentPlan === 'PRO' ? 'bg-indigo-500 text-white font-bold' : 'text-gray-300'}`}>Pro</button></div>
        </div>
        
        <div className="flex space-x-4 border-b border-gray-200 pb-1">
            <button onClick={() => setAdminTab('hr')} className={`pb-2 px-1 text-sm font-medium ${adminTab === 'hr' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>인사 관리</button>
            <button onClick={() => setAdminTab('subscription')} className={`pb-2 px-1 text-sm font-medium ${adminTab === 'subscription' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}>구독 정보</button>
        </div>

        {adminTab === 'hr' ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center"><h3 className="font-bold text-gray-700">임직원 리스트 ({activeUsers.length}명)</h3><button onClick={() => { setTargetDeptForAdd(teams[0]); setShowAddMemberModal(true); }} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700">입사자 등록</button></div>
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="w-full text-sm text-left"><thead className="bg-white text-gray-500 border-b border-gray-100 sticky top-0"><tr><th className="px-4 py-2">이름</th><th className="px-4 py-2">부서/직책</th><th className="px-4 py-2">상태</th><th className="px-4 py-2 text-right">관리</th></tr></thead><tbody className="divide-y divide-gray-50">{users.map(u => (<tr key={u.id}><td className="px-4 py-3 font-medium">{u.name}</td><td className="px-4 py-3 text-gray-500">{u.team} {u.role}</td><td className="px-4 py-3">{u.status === 'active' ? <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">재직</span> : <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded text-xs">퇴사</span>}</td><td className="px-4 py-3 text-right"><button className="text-gray-400 hover:text-red-500 text-xs underline">수정</button></td></tr>))}</tbody></table>
                </div>
            </div>
        ) : (
            <div className="bg-white p-10 text-center text-gray-500 rounded-xl border border-gray-200 border-dashed">현재 {currentPlan} 플랜 이용 중입니다.</div>
        )}
    </div>
  );

  const ProFeatureLocked = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-[500px] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-center p-6 animate-fade-in">
        <div className="bg-indigo-100 p-4 rounded-full mb-4"><Lock size={48} className="text-indigo-600"/></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title} 기능은 Pro 플랜 전용입니다.</h2>
        <button onClick={() => { setAdminTab('subscription'); setActiveTab('admin'); setCurrentPlan('PRO'); }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg mt-4 flex items-center"><Zap size={20} className="mr-2 fill-current"/> Pro 플랜 체험하기</button>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-2">2025년 프랜차이즈 목표 달성 현황</h2>
            <p className="text-indigo-100 mb-6">가맹점 200호점, 매출 300억 달성을 위해!</p>
            <div className="flex justify-center gap-8"><div className="bg-white/20 p-4 rounded-lg min-w-[150px]"><div className="text-3xl font-bold">185억</div><div className="text-sm opacity-80">현재 매출</div></div><div className="bg-white/20 p-4 rounded-lg min-w-[150px]"><div className="text-3xl font-bold">142개</div><div className="text-sm opacity-80">가맹점 수</div></div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><h3 className="font-bold text-gray-700 mb-4">주요 KPI 달성도</h3>{kpis.slice(0, 5).map(kpi => (<div key={kpi.id} className="mb-4 last:mb-0"><div className="flex justify-between text-sm mb-1"><span className="text-gray-600">{kpi.title}</span><span className="font-bold text-indigo-600">{calculateAchievement(kpi)}%</span></div><div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full" style={{width: `${calculateAchievement(kpi)}%`}}></div></div></div>))}</div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center"><Sparkles size={48} className="text-yellow-400 mb-4"/><h3 className="font-bold text-gray-800 text-lg mb-2">AI 인사이트</h3><p className="text-gray-500 text-sm mb-4">현재 영업팀의 신규 출점 속도가 목표 대비 10% 지연되고 있습니다.<br/>마케팅 프로모션과 연계하여 가맹 문의를 늘려보세요.</p><button className="text-indigo-600 font-bold text-sm hover:underline">상세 분석 보기</button></div>
        </div>
    </div>
  );

  const KPIView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-gray-800">전사 KPI 관리</h2><button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm">새 목표 설정</button></div>
        <div className="grid gap-4">{kpis.map(kpi => (<div key={kpi.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center"><div><div className="flex items-center gap-2 mb-1"><Badge color="purple">{kpi.team}</Badge><span className="text-xs text-gray-400">{kpi.type}</span></div><h3 className="font-bold text-lg text-gray-800">{kpi.title}</h3><p className="text-sm text-gray-500">{kpi.description}</p></div><div className="text-right"><div className="text-2xl font-bold text-gray-900">{kpi.current} <span className="text-sm font-normal text-gray-400">/ {kpi.target} {kpi.unit}</span></div><Badge color={kpi.status === 'success' ? 'green' : 'yellow'}>{kpi.status === 'success' ? '달성중' : '진행중'}</Badge></div></div>))}</div>
    </div>
  );

  const EvalView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">2025년 1분기 정기 평가</h2>
            <p className="text-gray-500 mb-6">평가 마감까지 D-10</p>
            <div className="flex justify-center gap-4"><div className="p-4 border rounded-lg w-32"><div className="text-2xl font-bold text-indigo-600">{activeUsers.length}명</div><div className="text-xs text-gray-400">대상</div></div><div className="p-4 border rounded-lg w-32"><div className="text-2xl font-bold text-green-600">5명</div><div className="text-xs text-gray-400">완료</div></div></div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6"><h3 className="font-bold mb-4">팀별 현황</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{teams.map(t => (<div key={t} className="flex justify-between p-3 bg-gray-50 rounded"><span>{t}</span><span className="text-gray-500 text-sm">진행률 20%</span></div>))}</div></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2"><div className="bg-indigo-600 text-white p-1.5 rounded-lg"><CheckSquare size={20} /></div><h1 className="text-xl font-bold text-gray-900 tracking-tight">Next Step</h1><span className={`text-[10px] px-1.5 py-0.5 rounded border ${currentPlan === 'PRO' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-green-100 text-green-700 border-green-200'}`}>{currentPlan === 'PRO' ? 'PRO' : 'BASIC'}</span></div>
          <div className="flex items-center space-x-4"><div className="text-right hidden sm:block"><div className="text-sm font-bold">김대표 님</div><div className="text-xs text-gray-500">CEO</div></div><div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">김</div></div>
        </div>
      </header>

      <NavigationBar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'rnr' && <RnRView />}
        {activeTab === 'org' && <OrgChartView />}
        {activeTab === 'admin' && <AdminView />}
        {activeTab === 'dashboard' && (currentPlan === 'PRO' ? <DashboardView /> : <ProFeatureLocked title="대시보드" />)}
        {activeTab === 'kpi' && (currentPlan === 'PRO' ? <KPIView /> : <ProFeatureLocked title="KPI 목표 관리" />)}
        {activeTab === 'eval' && (currentPlan === 'PRO' ? <EvalView /> : <ProFeatureLocked title="성과 평가" />)}
      </main>

      {/* Modals */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 animate-fade-in">
            <h3 className="text-lg font-bold mb-4">새 업무 등록</h3>
            <input className="w-full border p-2 rounded mb-2" placeholder="업무 제목" value={newDocTitle} onChange={e=>setNewDocTitle(e.target.value)} />
            <textarea className="w-full border p-2 rounded h-32 mb-4" placeholder="업무 내용" value={newDocContent} onChange={e=>setNewDocContent(e.target.value)} />
            <div className="flex justify-end gap-2"><button onClick={() => setShowWriteModal(false)} className="px-4 py-2 text-gray-500">취소</button><button onClick={handleSaveTask} className="px-4 py-2 bg-indigo-600 text-white rounded">저장</button></div>
          </div>
        </div>
      )}
      
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 animate-fade-in">
            <h3 className="text-lg font-bold mb-4">신규 입사자 등록</h3>
            <div className="bg-gray-50 p-2 mb-4 text-center text-sm font-bold text-indigo-600">{targetDeptForAdd}</div>
            <input className="w-full border p-2 rounded mb-2" placeholder="이름" value={newMemberName} onChange={e=>setNewMemberName(e.target.value)} />
            <input className="w-full border p-2 rounded mb-4" placeholder="직책" value={newMemberRole} onChange={e=>setNewMemberRole(e.target.value)} />
            <div className="flex justify-end gap-2"><button onClick={() => setShowAddMemberModal(false)} className="px-4 py-2 text-gray-500">취소</button><button onClick={handleAddMember} className="px-4 py-2 bg-indigo-600 text-white rounded">등록</button></div>
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8 text-center animate-fade-in relative">
               <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24}/></button>
               <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Zap size={32} className="text-indigo-600 fill-current"/></div>
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro 플랜으로 업그레이드</h2>
               <p className="text-gray-500 mb-6">KPI 관리, 성과 평가, AI 분석 등 회사의 성장을 위한 모든 기능을 잠금 해제하세요.</p>
               <button onClick={() => { setCurrentPlan('PRO'); setShowUpgradeModal(false); alert("Pro 플랜이 활성화되었습니다! (Demo)"); }} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg">월 50,000원에 시작하기</button>
           </div>
        </div>
      )}
    </div>
  );
}
