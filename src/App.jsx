import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, FileText, CheckSquare, ChevronRight, Plus, Search, Briefcase, 
  ArrowRight, Save, Clock, LayoutDashboard, Network, Edit3, UserPlus, 
  AlertCircle, CheckCircle2, Paperclip, ArrowRightLeft, MoreHorizontal, X, 
  History, Phone, Mail, Calendar, Sparkles, Loader2, Repeat, Timer, Target, 
  Link as LinkIcon, TrendingUp, Settings, CreditCard, Shield, Zap, BarChart3, 
  ChevronDown, Award, Star, MessageSquare, PieChart, LogOut, UserMinus, Briefcase as DeptIcon, RefreshCw
} from 'lucide-react';

// --- 프랜차이즈 시나리오 더미 데이터 ---

const initialUsers = [
  // 1. 대표이사
  { id: 'ceo', name: '김대표', team: '임원실', role: 'CEO', phone: '010-1111-0001', email: 'ceo@franchise.com', status: 'active', joinDate: '2015-03-01' },
  
  // 2. 영업팀 (3명) - 가맹점 200개 목표
  { id: 'sales1', name: '박영업', team: '영업팀', role: '팀장', phone: '010-2222-0001', email: 'park.sales@franchise.com', status: 'active', joinDate: '2018-05-10' },
  { id: 'sales2', name: '최매출', team: '영업팀', role: '과장', phone: '010-2222-0002', email: 'choi.sales@franchise.com', status: 'active', joinDate: '2020-01-15' },
  { id: 'sales3', name: '정개척', team: '영업팀', role: '대리', phone: '010-2222-0003', email: 'jung.sales@franchise.com', status: 'active', joinDate: '2022-08-20' },

  // 3. 운영팀 (10명) - 가맹점 관리 프로세스 정형화
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

  // 4. 마케팅팀 (2명) - 프로모션 분기별 1개
  { id: 'mkt1', name: '임마케', team: '마케팅팀', role: '팀장', phone: '010-4444-0001', email: 'lim.mkt@franchise.com', status: 'active', joinDate: '2019-12-01' },
  { id: 'mkt2', name: '송홍보', team: '마케팅팀', role: '대리', phone: '010-4444-0002', email: 'song.pr@franchise.com', status: 'active', joinDate: '2023-07-01' },

  // 5. 상품개발팀 (3명)
  { id: 'rnd1', name: '최맛나', team: '상품개발팀', role: '팀장(셰프)', phone: '010-5555-0001', email: 'choi.chef@franchise.com', status: 'active', joinDate: '2016-08-20' },
  { id: 'rnd2', name: '김연구', team: '상품개발팀', role: '연구원', phone: '010-5555-0002', email: 'kim.rnd@franchise.com', status: 'active', joinDate: '2021-11-11' },
  { id: 'rnd3', name: '이소스', team: '상품개발팀', role: '연구원', phone: '010-5555-0003', email: 'lee.sauce@franchise.com', status: 'active', joinDate: '2024-02-15' },

  // 6. 경영지원팀 (4명: 재무2, 인사총무2) - 시스템 빌드업, 효율화
  { id: 'fin1', name: '나재무', team: '경영지원팀', role: '팀장(CFO)', phone: '010-6666-0001', email: 'na.cfo@franchise.com', status: 'active', joinDate: '2017-01-05' },
  { id: 'fin2', name: '조회계', team: '경영지원팀', role: '재무 대리', phone: '010-6666-0002', email: 'cho.acct@franchise.com', status: 'active', joinDate: '2022-04-01' },
  { id: 'hr1', name: '박인사', team: '경영지원팀', role: '인사 과장', phone: '010-6666-0003', email: 'park.hr@franchise.com', status: 'active', joinDate: '2020-10-10' },
  { id: 'ga1', name: '이총무', team: '경영지원팀', role: '총무 사원', phone: '010-6666-0004', email: 'lee.ga@franchise.com', status: 'active', joinDate: '2024-09-01' },
];

const initialKPIs = [
  // 1. 전사 목표
  {
    id: 'KPI-CO-25', year: '2025', team: '전사', type: 'QUANT', 
    title: '연 매출 300억 달성', 
    target: 300, current: 185, unit: '억', status: 'warning', 
    description: '기존점 매출 증대 및 신규 출점을 통한 외형 성장'
  },
  // 2. 영업팀
  {
    id: 'KPI-SA-01', year: '2025', team: '영업팀', type: 'QUANT', 
    title: '가맹점 200호점 돌파', 
    target: 200, current: 142, unit: '개', status: 'warning', 
    description: '수도권 외 지방 거점 도시 신규 출점 집중'
  },
  // 3. 마케팅팀
  {
    id: 'KPI-MK-01', year: '2025', team: '마케팅팀', type: 'QUANT', 
    title: '분기별 시즌 프로모션 실행', 
    target: 4, current: 1, unit: '회', status: 'success', 
    description: '신메뉴 출시 연계 및 브랜드 인지도 제고 프로모션'
  },
  // 4. 운영팀
  {
    id: 'KPI-OP-01', year: '2025', team: '운영팀', type: 'QUAL', 
    title: '가맹점 관리 프로세스 표준화(Standardization)', 
    target: '매뉴얼 100% 배포', current: '매뉴얼 제작 중', grade: 'B', status: 'warning', 
    description: 'QSC 점검 기준 통일 및 슈퍼바이징 리포트 시스템화'
  },
  {
    id: 'KPI-OP-02', year: '2025', team: '운영팀', type: 'QUANT', 
    title: '가맹점 평균 QSC 점수 90점 달성', 
    target: 90, current: 84, unit: '점', status: 'warning', 
    description: '위생 등급제 인증 확대 및 불시 점검 강화'
  },
  // 5. 상품개발팀
  {
    id: 'KPI-RD-01', year: '2025', team: '상품개발팀', type: 'QUANT', 
    title: '시그니처 신메뉴 2종 출시', 
    target: 2, current: 1, unit: '종', status: 'success', 
    description: '매출을 견인할 수 있는 핵심 메뉴 개발'
  },
  // 6. 경영지원팀
  {
    id: 'KPI-MS-01', year: '2025', team: '경영지원팀', type: 'QUAL', 
    title: '신규 ERP/그룹웨어 도입', 
    target: '시스템 안정화', current: '업체 선정 완료', grade: 'A', status: 'success', 
    description: '수기 업무 자동화 및 결재 라인 전산화 빌드업'
  },
  {
    id: 'KPI-MS-02', year: '2025', team: '경영지원팀', type: 'QUAL', 
    title: '사내 업무 효율화 캠페인', 
    target: '불필요 회의 30% 절감', current: '캠페인 기획', grade: 'B', status: 'warning', 
    description: '보고 간소화 및 스마트워크 문화 정착'
  }
];

const initialTasks = [
  // --- 영업팀 ---
  { id: 'T-SA-01', ownerId: 'sales1', kpiId: 'KPI-SA-01', title: '신규 창업 박람회 참가 기획', description: '코엑스/킨텍스 프랜차이즈 박람회 부스 운영 계획 수립', docCount: 2, updatedAt: '2025.01.10', timeRequired: '20H', frequency: '분기 1회', history: [] },
  { id: 'T-SA-02', ownerId: 'sales2', kpiId: 'KPI-SA-01', title: '가맹 상담 및 상권 분석', description: '일일 문의 고객 상담 및 후보지 유동인구 분석 보고서 작성', docCount: 5, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '매일', history: [] },
  
  // --- 운영팀 ---
  { id: 'T-OP-01', ownerId: 'ops1', kpiId: 'KPI-OP-01', title: '슈퍼바이징 체크리스트 개편', description: '기존 50개 항목 -> 핵심 30개 항목으로 최적화 및 모바일 앱 연동', docCount: 1, updatedAt: '2025.01.05', timeRequired: '10H', frequency: '일회성', history: [] },
  { id: 'T-OP-02', ownerId: 'ops2', kpiId: 'KPI-OP-02', title: '담당 권역(강남/서초) 순회 점검', description: '가맹점 QSC 점검 및 점주 면담, 애로사항 청취', docCount: 12, updatedAt: '2025.01.22', timeRequired: '6H', frequency: '매일', history: [] },
  { id: 'T-OP-03', ownerId: 'ops6', kpiId: 'KPI-OP-01', title: '신규 점주 입문 교육 진행', description: '본사 조리 교육 및 CS 이론 교육 (3박 4일 과정)', docCount: 3, updatedAt: '2025.01.15', timeRequired: '32H', frequency: '월 1회', history: [] },
  
  // --- 마케팅팀 ---
  { id: 'T-MK-01', ownerId: 'mkt1', kpiId: 'KPI-MK-01', title: '봄 시즌 딸기 프로모션 기획', description: 'SNS 체험단 운영 및 포스터/X배너 디자인 발주', docCount: 4, updatedAt: '2025.01.18', timeRequired: '15H', frequency: '시즌별', history: [] },
  
  // --- 상품개발팀 ---
  { id: 'T-RD-01', ownerId: 'rnd1', kpiId: 'KPI-RD-01', title: '여름 한정 메뉴 레시피 테스트', description: '경쟁사 메뉴 분석 및 블라인드 테스트 진행', docCount: 2, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '주간', history: [] },
  
  // --- 경영지원팀 ---
  { id: 'T-MS-01', ownerId: 'fin1', kpiId: 'KPI-CO-25', title: '월간 손익 보고서(PL) 마감', description: '전사 매출/비용 집계 및 직영점/가맹점 로열티 정산', docCount: 10, updatedAt: '2025.01.01', timeRequired: '8H', frequency: '월 1회', history: [] },
  { id: 'T-MS-02', ownerId: 'hr1', kpiId: 'KPI-MS-01', title: '그룹웨어 도입 업체 미팅', description: '더존/다우기술 등 주요 솔루션 기능 비교 및 견적서 검토', docCount: 3, updatedAt: '2025.01.12', timeRequired: '2H', frequency: '수시', history: [] },
  { id: 'T-MS-03', ownerId: 'ga1', kpiId: 'KPI-MS-02', title: '사무용품 구매 프로세스 개선', description: '법인카드 결제 -> 전용몰 일괄 구매로 변경하여 비용 10% 절감', docCount: 1, updatedAt: '2025.01.05', timeRequired: '5H', frequency: '일회성', history: [] }
];

const initialReviews = [
  // 지난 분기 평가 예시
  {
    id: 'REV-24-4Q-01', period: '2024 4Q', userId: 'sales1', status: 'completed', overallGrade: 'A',
    selfComment: '연말 목표 달성을 위해 무리하게 영업했으나, 결과적으로 목표 초과 달성함.',
    managerComment: '수고 많으셨습니다. 다만 가맹점 오픈 후 관리에 조금 더 신경 써주세요.'
  }
];

const initialOrgChart = {
  name: "김대표 CEO",
  role: "대표이사",
  hasRnR: true,
  email: "ceo@nextstep.com",
  phone: "010-1111-0001",
  children: [
    {
      name: "영업팀 (Sales)",
      type: "department",
      children: [
        { name: "박영업", role: "팀장", hasRnR: true, id: 'sales1' },
        { name: "최매출", role: "과장", hasRnR: true, id: 'sales2' },
        { name: "정개척", role: "대리", hasRnR: true, id: 'sales3' }
      ]
    },
    {
      name: "운영팀 (Ops)",
      type: "department",
      children: [
        { name: "이운영", role: "팀장", hasRnR: true, id: 'ops1' },
        { name: "김슈퍼", role: "SV", hasRnR: true, id: 'ops2' },
        { name: "박관리", role: "SV", hasRnR: true, id: 'ops3' },
        { name: "최매장", role: "SV", hasRnR: true, id: 'ops4' },
        { name: "정품질", role: "QSC", hasRnR: true, id: 'ops5' },
        { name: "강교육", role: "교육", hasRnR: true, id: 'ops6' },
        { name: "...", role: "외 4명", hasRnR: false, id: 'ops_etc' } // 공간상 축약 (실제 데이터엔 다 있음)
      ]
    },
    {
      name: "마케팅/R&D",
      type: "department",
      children: [
        { name: "임마케", role: "MKT 팀장", hasRnR: true, id: 'mkt1' },
        { name: "최맛나", role: "R&D 팀장", hasRnR: true, id: 'rnd1' },
      ]
    },
    {
      name: "경영지원",
      type: "department",
      children: [
        { name: "나재무", role: "CFO", hasRnR: true, id: 'fin1' },
        { name: "박인사", role: "HR 과장", hasRnR: true, id: 'hr1' }
      ]
    }
  ]
};

const subscriptionData = {
  plan: "Enterprise",
  status: "active",
  price: "99,000원 / 월",
  nextBilling: "2025.02.15",
  paymentMethod: "법인카드 (**** 5678)",
  usage: { seats: { used: 23, total: 30 }, storage: { used: 120, total: 500, unit: "GB" }, aiCredits: { used: 4500, total: 10000 } },
  billingHistory: [ { date: "2025.01.15", amount: "99,000원", status: "결제완료" } ]
};

// --- Utils ---

const Badge = ({ children, color = 'blue' }) => {
  const colorClass = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    orange: 'bg-orange-100 text-orange-800'
  }[color];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {children}
    </span>
  );
};

const GradeBadge = ({ grade }) => {
  const color = { 'S': 'purple', 'A': 'green', 'B': 'blue', 'C': 'yellow', 'D': 'red' }[grade] || 'gray';
  return (
    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm bg-${color}-100 text-${color}-700 border border-${color}-200`}>
      {grade}
    </span>
  );
};

// --- Gemini API Helper (Stub) ---
const generateAIContent = async (prompt) => {
  const apiKey = ""; 
  if (!apiKey) {
      return new Promise(resolve => setTimeout(() => resolve("[데모 모드] AI API 키가 설정되지 않았습니다. 관리자 페이지에서 설정해주세요. \n\n(실제라면 여기에 AI가 작성한 인수인계 초안이나 KPI 분석 결과가 표시됩니다.)"), 1500));
  }
  
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI 응답 오류";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 서비스 연결 실패";
  }
};


export default function NextStepApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // --- Data State (with LocalStorage) ---
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('ns_users')) || initialUsers);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('ns_tasks')) || initialTasks);
  const [kpis, setKpis] = useState(() => JSON.parse(localStorage.getItem('ns_kpis')) || initialKPIs);
  const [reviews, setReviews] = useState(() => JSON.parse(localStorage.getItem('ns_reviews')) || initialReviews);
  const [orgData, setOrgData] = useState(() => JSON.parse(localStorage.getItem('ns_orgData')) || initialOrgChart);

  // Save to LocalStorage whenever data changes
  useEffect(() => { localStorage.setItem('ns_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ns_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('ns_kpis', JSON.stringify(kpis)); }, [kpis]);
  useEffect(() => { localStorage.setItem('ns_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ns_orgData', JSON.stringify(orgData)); }, [orgData]);

  // Filters & UI States
  const [selectedKpiYear, setSelectedKpiYear] = useState('2025');
  const [selectedEvalPeriod, setSelectedEvalPeriod] = useState('2025 1Q');
  const [selectedEvalUser, setSelectedEvalUser] = useState('sales1'); // Default to Sales Team Lead
  const [evalViewType, setEvalViewType] = useState('individual');
  const [rnrViewMode, setRnrViewMode] = useState('team'); 
  const [isOrgEditMode, setIsOrgEditMode] = useState(false);
  const [adminTab, setAdminTab] = useState('hr'); 
  
  // Modals
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false); 
  const [selectedTask, setSelectedTask] = useState(null);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [targetDeptForAdd, setTargetDeptForAdd] = useState(""); 
  
  // AI States
  const [aiInsightOpen, setAiInsightOpen] = useState(false);
  const [aiInsightResult, setAiInsightResult] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Forms
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocContent, setNewDocContent] = useState("");
  const [newDocTime, setNewDocTime] = useState(""); 
  const [newDocFreq, setNewDocFreq] = useState("");
  const [selectedKpi, setSelectedKpi] = useState(""); 
  const [isAiWriting, setIsAiWriting] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  // --- Helpers ---
  const activeUsers = useMemo(() => users.filter(u => u.status !== 'resigned'), [users]);
  const years = useMemo(() => [...new Set(kpis.map(k => k.year))].sort().reverse(), [kpis]);
  const teams = useMemo(() => {
      const teamSet = new Set(kpis.map(k => k.team));
      activeUsers.forEach(u => teamSet.add(u.team));
      return [...teamSet].filter(Boolean);
  }, [kpis, activeUsers]);
  
  const getUserInfo = (id, name) => {
    const found = users.find(u => u.id === id);
    if (found) return found;
    return users.find(u => u.name === name) || { phone: '-', email: '-' };
  };

  const calculateAchievement = (kpi) => {
    if (kpi.type === 'QUAL') return 0; 
    let rate = 0;
    if (kpi.unit === 'sec') {
        rate = kpi.target >= kpi.current ? 100 : Math.round((kpi.target / kpi.current) * 100); 
    } else {
        rate = Math.round((kpi.current / kpi.target) * 100);
    }
    return rate;
  };

  const getYearlyKpiStats = () => {
      const stats = years.map(year => {
          const yearKpis = kpis.filter(k => k.year === year && k.type === 'QUANT'); 
          if (yearKpis.length === 0) return { year, rate: 0 };
          const totalRate = yearKpis.reduce((acc, k) => acc + calculateAchievement(k), 0);
          return { year, rate: Math.round(totalRate / yearKpis.length) };
      }).sort((a, b) => a.year.localeCompare(b.year));
      return stats;
  };

  // --- Handlers ---
  const handleTransfer = (targetUserId) => {
    if (!selectedTask) return;
    const currentUser = users.find(u => u.id === selectedTask.ownerId);
    const targetUser = users.find(u => u.id === targetUserId);
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');

    const updatedTasks = tasks.map(t => {
      if (t.id === selectedTask.id) {
        const newHistory = {
            date: today,
            type: 'transfer',
            from: currentUser.name,
            to: targetUser.name,
            details: '담당자 변경으로 인한 업무 이관'
        };
        return { 
            ...t, 
            ownerId: targetUserId,
            history: [newHistory, ...t.history] 
        };
      }
      return t;
    });
    setTasks(updatedTasks);
    setTransferModalOpen(false);
    setSelectedTask(null);
    alert('업무 카드가 이관되었습니다.');
  };

  const handleAiDraft = async () => {
    if (!newDocTitle) {
      alert("문서 제목이 필요합니다.");
      return;
    }
    setIsAiWriting(true);
    const kpiContext = selectedKpi ? `관련 KPI: "${kpis.find(k=>k.id===selectedKpi)?.title}" 달성 목표` : "";
    const prompt = `
      당신은 기업의 인수인계 전문가입니다.
      다음 주제에 대한 체계적인 인수인계 문서 초안을 한국어로 작성해주세요.
      문서 제목: "${newDocTitle}"
      예상 소요시간: "${newDocTime}"
      업무 빈도: "${newDocFreq}"
      ${kpiContext}
      
      [필수 포함 항목]
      1. 개요 (Overview) - KPI와의 연관성 포함
      2. 주요 업무 절차 (Step-by-Step)
      3. 관련 파일 위치 및 접근 권한
      4. 주요 유의사항 및 노하우
      5. 비상 연락망
    `;
    const result = await generateAIContent(prompt);
    setNewDocContent(result);
    setIsAiWriting(false);
  };

  const handleAiInsight = async () => {
    setAiInsightOpen(true);
    setAiInsightResult("");
    setIsAiLoading(true);

    const tasksSummary = tasks.map(t => ({
        title: t.title,
        owner: users.find(u => u.id === t.ownerId)?.name,
        docs: t.docCount,
        kpi: t.kpiId ? kpis.find(k=>k.id===t.kpiId)?.title : "None"
    }));

    const prompt = `
      다음은 우리 회사의 KPI 및 업무(Task) 분장 현황입니다.
      데이터를 분석하여 KPI 달성을 위한 리소스 배분이 적절한지 한국어로 진단해주세요.
      데이터: ${JSON.stringify(tasksSummary)}
    `;
    const result = await generateAIContent(prompt);
    setAiInsightResult(result);
    setIsAiLoading(false);
  };
  
  const handleSaveNewTask = () => {
      if (!newDocTitle) { alert('제목을 입력해주세요.'); return; }
      
      const newTask = {
          id: `TASK-${Date.now().toString().slice(-4)}`,
          ownerId: 'sales1', // Default to sales team lead for demo
          title: newDocTitle,
          description: newDocContent.slice(0, 50) + "...",
          docCount: 0,
          updatedAt: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
          timeRequired: newDocTime || '미정',
          frequency: newDocFreq || '미정',
          kpiId: selectedKpi || null,
          history: [{ date: new Date().toISOString().split('T')[0].replace(/-/g, '.'), type: 'create', user: '관리자', details: '신규 업무 생성' }]
      };
      
      setTasks([newTask, ...tasks]);
      setShowWriteModal(false);
      alert('새 업무가 등록되었습니다.');
  };

  const handleAddMember = () => {
      if (!newMemberName || !newMemberRole || !targetDeptForAdd) { alert("모든 정보를 입력해주세요."); return; }
      
      const newId = `user${Date.now()}`;
      const newUser = {
          id: newId,
          name: newMemberName,
          role: newMemberRole,
          team: targetDeptForAdd,
          email: `${newId}@nextstep.com`,
          phone: "010-0000-0000",
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0]
      };

      setUsers([...users, newUser]);

      const newOrgData = { ...orgData };
      const deptNode = newOrgData.children.find(c => c.name.includes(targetDeptForAdd));
      if (deptNode) {
          if (!deptNode.children) deptNode.children = [];
          deptNode.children.push({ name: newMemberName, role: newMemberRole, hasRnR: false, id: newId });
      }
      setOrgData(newOrgData);

      setShowAddMemberModal(false);
      setNewMemberName("");
      setNewMemberRole("");
      alert(`${newMemberName}님이 등록되었습니다.`);
  };

  const handleResignMember = (userId) => {
      if (!window.confirm("정말 퇴사 처리하시겠습니까?")) return;
      
      const updatedUsers = users.map(u => u.id === userId ? { ...u, status: 'resigned', leaveDate: new Date().toISOString().split('T')[0] } : u);
      setUsers(updatedUsers);

      const newOrgData = { ...orgData };
      newOrgData.children.forEach(dept => {
          if (dept.children) {
              dept.children = dept.children.filter(member => member.id !== userId);
          }
      });
      setOrgData(newOrgData);
      
      alert("퇴사 처리가 완료되었습니다.");
  };

  // --- Views ---

  const AdminView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-xl font-bold text-gray-800">관리자 센터</h2>
               <p className="text-sm text-gray-500">인사 관리 및 시스템 설정을 총괄합니다.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-lg text-sm font-medium">
                <button onClick={() => setAdminTab('hr')} className={`px-4 py-2 rounded-md transition ${adminTab === 'hr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>조직/인사 관리</button>
                <button onClick={() => setAdminTab('subscription')} className={`px-4 py-2 rounded-md transition ${adminTab === 'subscription' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>구독/결제</button>
            </div>
        </div>

        {adminTab === 'hr' ? (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div><p className="text-xs text-gray-500 font-bold uppercase">총 재직 인원</p><p className="text-2xl font-bold text-gray-900">{activeUsers.length}명</p></div>
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><Users size={20}/></div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div><p className="text-xs text-gray-500 font-bold uppercase">등록된 부서</p><p className="text-2xl font-bold text-gray-900">{teams.length}개</p></div>
                        <div className="bg-indigo-50 p-3 rounded-lg text-indigo-600"><Briefcase size={20}/></div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div><p className="text-xs text-gray-500 font-bold uppercase">퇴사자 (누적)</p><p className="text-2xl font-bold text-gray-900">{users.filter(u=>u.status==='resigned').length}명</p></div>
                        <div className="bg-orange-50 p-3 rounded-lg text-orange-600"><UserMinus size={20}/></div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="font-bold text-gray-800 flex items-center"><Users size={18} className="mr-2 text-indigo-600"/>임직원 통합 관리</h3>
                        <button 
                            onClick={() => { setTargetDeptForAdd(""); setShowAddMemberModal(true); }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition flex items-center"
                        >
                            <Plus size={16} className="mr-2"/> 신규 입사자 등록
                        </button>
                    </div>
                    <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold sticky top-0">
                                <tr>
                                    <th className="px-6 py-3">이름 / 연락처</th>
                                    <th className="px-6 py-3">부서 / 직책</th>
                                    <th className="px-6 py-3">상태</th>
                                    <th className="px-6 py-3">입사일</th>
                                    <th className="px-6 py-3 text-right">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{u.name}</div>
                                            <div className="text-xs text-gray-400">{u.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge color="blue">{u.team}</Badge>
                                            <div className="mt-1 text-xs">{u.role}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.status === 'resigned' ? 
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">퇴사</span> : 
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">재직중</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4">{u.joinDate}</td>
                                        <td className="px-6 py-4 text-right">
                                            {u.status !== 'resigned' && (
                                                <button 
                                                    onClick={() => handleResignMember(u.id)}
                                                    className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded border border-red-200 text-xs font-medium transition"
                                                >
                                                    퇴사 처리
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                 <h3 className="text-lg font-bold mb-2">Current Plan: {subscriptionData.plan}</h3>
                 <p className="text-gray-500 mb-4">다음 결제일: {subscriptionData.nextBilling}</p>
                 <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                     * 현재 데모 버전에서는 브라우저 저장소(LocalStorage)를 사용하여 데이터를 저장합니다.
                 </div>
            </div>
        )}
    </div>
  );

  const EvaluationView = () => {
    const EvalHeader = () => (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div><h2 className="text-xl font-bold text-gray-800">성과 평가 (Performance Review)</h2><p className="text-sm text-gray-500">R&R 및 KPI 달성도를 기반으로 성과를 리뷰합니다.</p></div>
          <div className="flex space-x-3">
              <div className="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
                <button onClick={() => setEvalViewType('team')} className={`px-3 py-1.5 rounded-md transition ${evalViewType === 'team' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>팀별 평가</button>
                <button onClick={() => setEvalViewType('individual')} className={`px-3 py-1.5 rounded-md transition ${evalViewType === 'individual' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>인원별 평가</button>
              </div>
              <select value={selectedEvalPeriod} onChange={(e) => setSelectedEvalPeriod(e.target.value)} className="bg-white border border-gray-300 rounded-lg px-3 py-2 font-bold text-gray-700 text-sm"><option value="2025 1Q">2025년 1분기</option><option value="2024 4Q">2024년 4분기</option></select>
          </div>
      </div>
    );

    if (evalViewType === 'team') {
        return (
            <div className="space-y-6 animate-fade-in">
              <EvalHeader />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map(team => {
                   const teamKpis = kpis.filter(k => k.team === team && k.year === '2025');
                   const quantKpis = teamKpis.filter(k => k.type === 'QUANT');
                   const teamMembers = activeUsers.filter(u => u.team === team); 
                   const avgAchievement = quantKpis.length > 0 ? Math.round(quantKpis.reduce((acc, k) => acc + calculateAchievement(k), 0) / quantKpis.length) : 0;
                   return (
                     <div key={team} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4"><h3 className="text-lg font-bold text-gray-800 flex items-center"><PieChart size={20} className="mr-2 text-indigo-600"/> {team}</h3><Badge color="blue">{teamMembers.length}명</Badge></div>
                        <div className="mb-6"><div className="flex justify-between text-sm mb-1 text-gray-600"><span>정량 KPI 평균 달성률</span><span className="font-bold text-indigo-600">{avgAchievement}%</span></div><div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min(avgAchievement, 100)}%` }}></div></div></div>
                        <div className="space-y-3"><h4 className="text-xs font-bold text-gray-400 uppercase">팀원별 성과 등급 현황 (잠정)</h4>{teamMembers.map(member => { const review = reviews.find(r => r.userId === member.id && r.period === selectedEvalPeriod); return (<div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"><div className="flex items-center space-x-2"><div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold">{member.name[0]}</div><span className="text-sm font-medium text-gray-700">{member.name}</span></div><GradeBadge grade={review?.overallGrade || '-'} /></div>); })}</div>
                     </div>
                   );
                })}
              </div>
            </div>
        );
    }
    
    const targetUser = activeUsers.find(u => u.id === selectedEvalUser) || activeUsers[0];
    if (!targetUser) return <div className="p-10 text-center">평가할 대상이 없습니다.</div>;

    const userKpis = kpis.filter(k => k.year === '2025' && (k.team === targetUser.team || k.team === '전사'));
    const userReview = reviews.find(r => r.userId === targetUser.id && r.period === selectedEvalPeriod);

    return (
        <div className="space-y-6 animate-fade-in">
            <EvalHeader />
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-fit">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">평가 대상자</h3>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {activeUsers.map(u => (
                            <button key={u.id} onClick={() => setSelectedEvalUser(u.id)} className={`w-full flex items-center space-x-3 p-2 rounded-lg transition ${targetUser.id === u.id ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'hover:bg-gray-50 text-gray-700'}`}>
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">{u.name[0]}</div>
                                <div className="text-left"><div className="text-sm font-bold">{u.name}</div><div className="text-xs opacity-70">{u.team}</div></div>
                                {targetUser.id === u.id && <ChevronRight size={16} className="ml-auto"/>}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                         <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">{targetUser.name[0]}</div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{targetUser.name} <span className="text-sm text-gray-500 font-normal">| {targetUser.role}</span></h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1"><Badge color="blue">{targetUser.team}</Badge></div>
                            </div>
                         </div>
                         <div className="text-right"><div className="text-sm text-gray-500 mb-1">현재 등급 (잠정)</div><div className="text-3xl font-bold text-indigo-600">{userReview?.overallGrade || '-'}</div></div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 flex justify-between items-center">
                            <span>KPI 및 R&R 달성도 평가</span><span className="text-xs font-normal text-gray-500">* 정량/정성 지표 포함</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {userKpis.map(kpi => {
                                const evalDetail = userReview?.details?.find(d => d.kpiId === kpi.id);
                                const isQuant = kpi.type === 'QUANT';
                                const progress = calculateAchievement(kpi);
                                return (
                                    <div key={kpi.id} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1"><Badge color={isQuant ? "indigo" : "orange"}>{isQuant ? "정량" : "정성"}</Badge><span className="text-xs text-gray-400">{kpi.id}</span></div>
                                                <h4 className="text-lg font-bold text-gray-800">{kpi.title}</h4>
                                            </div>
                                            <div className="text-right">
                                                {isQuant ? (<div><div className="text-2xl font-bold text-gray-900">{progress}%</div><div className="text-xs text-gray-500">달성률</div></div>) : 
                                                (<div className="flex flex-col items-end"><span className="text-sm font-bold text-gray-700 mb-1">상태</span><Badge color="green">{kpi.current}</Badge></div>)}
                                            </div>
                                        </div>
                                        {isQuant && (<div className="w-full bg-gray-100 rounded-full h-2 mb-4"><div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div></div>)}
                                        <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div><label className="block text-xs font-bold text-gray-500 mb-2">자기 평가</label><div className="flex items-center space-x-3"><select className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-bold" defaultValue={evalDetail?.selfGrade || "B"}><option value="S">S</option><option value="A">A</option><option value="B">B</option></select><input type="text" className="flex-1 border-b border-gray-300 bg-transparent text-sm py-1 outline-none" placeholder="코멘트..." defaultValue={evalDetail?.comment} /></div></div>
                                            <div><label className="block text-xs font-bold text-indigo-500 mb-2">리더 평가</label><div className="flex items-center space-x-3"><select className="bg-white border border-indigo-200 rounded px-2 py-1 text-sm font-bold text-indigo-700" defaultValue={evalDetail?.managerGrade || "B"}><option value="S">S</option><option value="A">A</option><option value="B">B</option></select></div></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const KPIView = () => {
    const filteredKpis = kpis.filter(k => k.year === selectedKpiYear);
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center"><div><h2 className="text-xl font-bold text-gray-800">조직 KPI 및 업무 연동</h2><p className="text-sm text-gray-500">정량(Quant) 및 정성(Qual) 지표를 모두 관리합니다.</p></div><div className="flex space-x-3"><div className="relative"><select value={selectedKpiYear} onChange={(e) => setSelectedKpiYear(e.target.value)} className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg font-bold"><option value="2025">2025년</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDown size={16} /></div></div><button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"><Plus size={18} /><span>새 KPI</span></button></div></div>
            <div className="grid gap-6">{filteredKpis.length > 0 ? filteredKpis.map((kpi) => { return <div key={kpi.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div className="flex justify-between"><div><Badge color={kpi.type === 'QUANT' ? 'indigo' : 'orange'}>{kpi.type}</Badge><h3 className="text-lg font-bold mt-2">{kpi.title}</h3><p className="text-sm text-gray-500">{kpi.description}</p></div><div className="text-right"><div className="text-2xl font-bold">{kpi.current}</div><div className="text-xs text-gray-400">목표: {kpi.target}</div></div></div></div> }) : <div className="text-center py-12 text-gray-500">등록된 KPI가 없습니다.</div>}</div>
        </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div><h2 className="text-2xl font-bold flex items-center mb-2"><Sparkles className="mr-2 text-yellow-300 animate-pulse" /> AI Team Insight</h2><p className="text-indigo-100 opacity-90 max-w-xl">AI가 현재 R&R 데이터와 KPI 연동 현황을 분석하여 조직의 목표 정렬(Alignment) 상태를 진단합니다.</p></div>
               <button onClick={handleAiInsight} className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition shadow-md flex items-center whitespace-nowrap">{isAiLoading ? <Loader2 className="animate-spin mr-2"/> : <Sparkles size={18} className="mr-2"/>} AI 분석 실행</button>
            </div>
            <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10"><Network size={200} /></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div className="flex items-center space-x-3 text-blue-600 mb-2"><Target size={24} /><h3 className="font-semibold text-gray-700">올해 KPI</h3></div><p className="text-3xl font-bold text-gray-900">{kpis.filter(k=>k.year==='2025').length}개</p></div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div className="flex items-center space-x-3 text-indigo-600 mb-2"><Briefcase size={24} /><h3 className="font-semibold text-gray-700">전체 업무 카드</h3></div><p className="text-3xl font-bold text-gray-900">{tasks.length}개</p></div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div className="flex items-center space-x-3 text-emerald-600 mb-2"><FileText size={24} /><h3 className="font-semibold text-gray-700">연결된 자료</h3></div><p className="text-3xl font-bold text-gray-900">{tasks.reduce((acc, curr) => acc + curr.docCount, 0)}건</p></div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"><div className="flex items-center space-x-3 text-purple-600 mb-2"><Users size={24} /><h3 className="font-semibold text-gray-700">재직 인원</h3></div><p className="text-3xl font-bold text-gray-900">{activeUsers.length}명</p></div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 flex items-center mb-6"><BarChart3 className="mr-2 text-indigo-600"/> 연도별 KPI 평균 달성률 (정량 지표)</h3>
            <div className="flex items-end space-x-8 h-48 mt-4 pl-4 border-b border-gray-200 pb-2 relative">
                {getYearlyKpiStats().map((stat) => (
                    <div key={stat.year} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div className="relative w-full max-w-[80px] flex items-end h-full">
                            <div className={`w-full rounded-t-lg flex items-center justify-center ${stat.year === '2025' ? 'bg-indigo-600' : 'bg-gray-300'}`} style={{ height: `${stat.rate}%` }}><span className="text-white font-bold text-sm">{stat.rate}%</span></div>
                        </div>
                        <span className="text-sm mt-3 font-bold text-gray-500">{stat.year}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const RnRView = () => {
    const teamGroups = useMemo(() => {
        const groups = {};
        teams.forEach(team => {
            const teamMembers = activeUsers.filter(u => u.team === team); 
            const teamTasks = tasks.filter(t => teamMembers.some(u => u.id === t.ownerId));
            groups[team] = { members: teamMembers, tasks: teamTasks };
        });
        return groups;
    }, [activeUsers, tasks, teams]);

    return (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div><h2 className="text-xl font-bold text-gray-800">팀별 업무 카드 (R&R Modules)</h2><p className="text-sm text-gray-500">모든 업무는 독립적인 카드로 관리되며, KPI와 연동될 수 있습니다.</p></div>
            <div className="flex space-x-3">
                <div className="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
                    <button onClick={() => setRnrViewMode('team')} className={`px-3 py-1.5 rounded-md transition ${rnrViewMode === 'team' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>팀별 보기</button>
                    <button onClick={() => setRnrViewMode('user')} className={`px-3 py-1.5 rounded-md transition ${rnrViewMode === 'user' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>인원별 보기</button>
                </div>
                <button onClick={() => { setNewDocTitle(""); setNewDocContent(""); setShowWriteModal(true); }} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"><Plus size={18} /><span>새 업무</span></button>
            </div>
          </div>

          {rnrViewMode === 'user' ? (
              <div className="grid gap-6">
                 {activeUsers.map(user => {
                    const userTasks = tasks.filter(t => t.ownerId === user.id);
                    if (userTasks.length === 0) return null;
                    return (
                       <div key={user.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                             <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">{user.name[0]}</div><div><h3 className="font-bold text-gray-900">{user.name}</h3><div className="text-xs text-gray-500">{user.team} | {user.role}</div></div></div>
                             <div className="text-sm text-gray-400">총 {userTasks.length}개의 업무</div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {userTasks.map(task => (
                                <div key={task.id} className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-white hover:shadow-md transition">
                                   <div className="flex justify-between mb-2"><Badge color="purple">{task.id}</Badge><div className="flex space-x-1"><button onClick={() => {setSelectedTask(task); setHistoryModalOpen(true);}} className="p-1 bg-white rounded border"><History size={12}/></button><button onClick={() => {setSelectedTask(task); setTransferModalOpen(true);}} className="p-1 bg-white rounded border text-indigo-600"><ArrowRightLeft size={12}/></button></div></div>
                                   <h4 className="font-bold text-gray-800">{task.title}</h4>
                                   <p className="text-xs text-gray-500 mt-1 line-clamp-1">{task.description}</p>
                                </div>
                             ))}
                          </div>
                       </div>
                    )
                 })}
              </div>
          ) : (
              <div className="space-y-8">
                  {Object.entries(teamGroups).map(([teamName, data]) => (
                      <div key={teamName} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                              <h3 className="text-xl font-bold text-gray-800 flex items-center"><PieChart size={24} className="mr-2 text-indigo-600"/> {teamName}</h3>
                              <div className="flex gap-2">
                                  <Badge color="blue">{data.members.length}명</Badge>
                                  <Badge color="green">{data.tasks.length}개 업무</Badge>
                              </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {data.tasks.map(task => {
                                  const owner = activeUsers.find(u => u.id === task.ownerId);
                                  return (
                                    <div key={task.id} className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 bg-gray-50 hover:bg-white hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">{owner?.name || '미정'}</span>
                                            <Badge color="purple">{task.id}</Badge>
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-1">{task.title}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                            <Timer size={12}/> {task.timeRequired} <span className="text-gray-300">|</span> <Repeat size={12}/> {task.frequency}
                                        </div>
                                    </div>
                                  );
                              })}
                              {data.tasks.length === 0 && <div className="col-span-3 text-center py-4 text-gray-400 text-sm">등록된 업무가 없습니다.</div>}
                          </div>
                      </div>
                  ))}
              </div>
          )}
        </div>
    );
  };
  
  const OrgChartView = () => ( 
     <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 overflow-x-auto min-h-[600px] flex flex-col items-center">
        <div className="w-full flex justify-end mb-4">
            <button onClick={() => setIsOrgEditMode(!isOrgEditMode)} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-bold text-sm ${isOrgEditMode ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{isOrgEditMode ? <><CheckCircle2 size={16}/><span>수정 완료</span></> : <><Edit3 size={16}/><span>조직도 수정</span></>}</button>
        </div>
        <div className="w-48 bg-indigo-600 text-white p-4 rounded-lg text-center mb-12 font-bold relative shadow-lg">
           {orgData.name} <div className="text-xs font-normal opacity-80">{orgData.role}</div>
           <div className="absolute h-12 w-0.5 bg-gray-300 -bottom-12 left-1/2"></div>
        </div>
        <div className="flex gap-12 border-t-2 border-gray-300 pt-8 relative">
           {orgData.children.map((dept, idx) => (
              <div key={idx} className="flex flex-col items-center relative">
                  <div className="absolute h-8 w-0.5 bg-gray-300 -top-8"></div>
                  <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-gray-800 mb-6 border border-gray-200 shadow-sm flex items-center gap-2">
                      {dept.name}
                      {isOrgEditMode && (<button onClick={() => { setTargetDeptForAdd(dept.name); setShowAddMemberModal(true); }} className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition" title="팀원 추가"><Plus size={14} /></button>)}
                  </div>
                  <div className="flex flex-col gap-3">
                     {dept.children && dept.children.map((m, midx) => (
                        <div key={midx} className="bg-white border border-gray-200 p-3 rounded-lg w-48 text-center shadow-sm hover:border-indigo-300 transition group relative">
                            <div className="font-bold text-gray-800 text-sm">{m.name}</div>
                            <div className="text-xs text-gray-500">{m.role}</div>
                            {isOrgEditMode && <div className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition"><X size={10}/></div>}
                        </div>
                     ))}
                     {(!dept.children || dept.children.length === 0) && <div className="text-xs text-gray-400 text-center py-2">팀원 없음</div>}
                  </div>
              </div>
           ))}
        </div>
     </div> 
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2"><div className="bg-indigo-600 text-white p-1.5 rounded-lg"><CheckSquare size={20} /></div><h1 className="text-xl font-bold text-gray-900 tracking-tight">Next Step</h1></div>
          <div className="flex items-center space-x-4"><div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">나</div></div>
        </div>
      </header>

      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex space-x-6 overflow-x-auto">
          {['dashboard', 'kpi', 'rnr', 'org', 'eval', 'admin'].map(tab => {
             const labels = { dashboard: '대시보드', kpi: 'KPI 관리', rnr: '팀 R&R', org: '조직도', eval: '성과 평가', admin: '관리자' };
             const Icons = { dashboard: LayoutDashboard, kpi: Target, rnr: Users, org: Network, eval: Award, admin: Settings };
             const Icon = Icons[tab];
             return (
               <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition font-medium text-sm whitespace-nowrap ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  <Icon size={18} /><span>{labels[tab]}</span>
               </button>
             )
          })}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'kpi' && <KPIView />}
        {activeTab === 'rnr' && <RnRView />}
        {activeTab === 'org' && <OrgChartView />}
        {activeTab === 'eval' && <EvaluationView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Write Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center"><h3 className="text-lg font-bold text-gray-900">새 업무/문서 작성</h3><button onClick={() => setShowWriteModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button></div>
            <div className="p-6 space-y-4">
               <div><label className="block text-sm font-medium text-gray-700 mb-1">관련 KPI</label><select value={selectedKpi} onChange={(e) => setSelectedKpi(e.target.value)} className="w-full border rounded-lg px-3 py-2"><option value="">선택 안함</option>{kpis.filter(k=>k.year==='2025').map(k=><option key={k.id} value={k.id}>[{k.team}] {k.title}</option>)}</select></div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">제목</label><input type="text" value={newDocTitle} onChange={(e) => setNewDocTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2" /></div>
               <div className="grid grid-cols-2 gap-4">
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">시간</label><input type="text" value={newDocTime} onChange={(e) => setNewDocTime(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="2H" /></div>
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">빈도</label><input type="text" value={newDocFreq} onChange={(e) => setNewDocFreq(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="매주" /></div>
               </div>
               <div>
                  <div className="flex justify-between items-center mb-1"><label className="block text-sm font-medium text-gray-700">내용</label><button onClick={handleAiDraft} disabled={isAiWriting} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-bold">{isAiWriting ? "작성 중..." : "AI 초안 작성"}</button></div>
                  <textarea value={newDocContent} onChange={(e) => setNewDocContent(e.target.value)} className="w-full border rounded-lg px-3 py-2 h-32 resize-none" />
               </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button onClick={() => setShowWriteModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">취소</button>
              <button onClick={handleSaveNewTask} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"><Save size={18} /><span>저장</span></button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-600 text-white rounded-t-2xl">
              <h3 className="text-lg font-bold flex items-center"><UserPlus size={18} className="mr-2"/>신규 입사자 등록</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-indigo-200 hover:text-white"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
               {targetDeptForAdd ? (
                   <div className="bg-gray-50 p-3 rounded-lg text-center text-sm font-bold text-gray-700 mb-2">소속 부서: <span className="text-indigo-600">{targetDeptForAdd}</span></div>
               ) : (
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">소속 부서</label><select value={targetDeptForAdd} onChange={(e) => setTargetDeptForAdd(e.target.value)} className="w-full border rounded-lg px-3 py-2"><option value="">선택하세요</option>{teams.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
               )}
               <div><label className="block text-sm font-medium text-gray-700 mb-1">이름</label><input type="text" value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="홍길동" /></div>
               <div><label className="block text-sm font-medium text-gray-700 mb-1">직책</label><input type="text" value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="주니어 마케터" /></div>
            </div>
            <div className="p-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-3">
              <button onClick={() => setShowAddMemberModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm">취소</button>
              <button onClick={handleAddMember} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-bold">등록하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Reuse Modals */}
      {transferModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl w-full max-w-md p-6"><h3 className="text-lg font-bold mb-4">업무 이관</h3><div className="grid gap-2">{users.filter(u=>u.id!==selectedTask.ownerId).map(u=>(<button key={u.id} onClick={()=>handleTransfer(u.id)} className="p-3 border rounded hover:bg-gray-50 text-left">{u.name}</button>))}</div><button onClick={()=>setTransferModalOpen(false)} className="mt-4 w-full py-2 text-gray-500">취소</button></div>
        </div>
      )}
      {historyModalOpen && selectedTask && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto"><h3 className="text-lg font-bold mb-4">히스토리</h3><div className="space-y-4">{selectedTask.history.map((h,i)=>(<div key={i} className="border-l-2 border-indigo-200 pl-4 py-1"><div className="text-xs text-gray-500">{h.date} | {h.type}</div><div className="text-sm font-medium">{h.details}</div></div>))}</div><button onClick={()=>setHistoryModalOpen(false)} className="mt-6 w-full py-2 bg-gray-100 rounded">닫기</button></div>
         </div>
      )}
      {aiInsightOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[80vh] overflow-y-auto"><h3 className="text-lg font-bold mb-4">AI 분석 결과</h3><div className="prose max-w-none whitespace-pre-wrap">{isAiLoading ? "분석 중..." : aiInsightResult}</div><button onClick={()=>setAiInsightOpen(false)} className="mt-6 w-full py-2 bg-gray-100 rounded">닫기</button></div>
         </div>
      )}
    </div>
  );
}
