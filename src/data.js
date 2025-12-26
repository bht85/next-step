export const initialUsers = [
  { id: 'ceo', name: '김대표', team: '임원실', role: 'CEO', phone: '010-1111-0001', email: 'ceo@franchise.com', status: 'active', joinDate: '2015-03-01' },
  { id: 'sales1', name: '박영업', team: '영업팀', role: '팀장', phone: '010-2222-0001', email: 'park.sales@franchise.com', status: 'active', joinDate: '2018-05-10' },
  { id: 'sales2', name: '최매출', team: '영업팀', role: '과장', phone: '010-2222-0002', email: 'choi.sales@franchise.com', status: 'active', joinDate: '2020-01-15' },
  { id: 'sales3', name: '정개척', team: '영업팀', role: '대리', phone: '010-2222-0003', email: 'jung.sales@franchise.com', status: 'active', joinDate: '2022-08-20' },
  { id: 'ops1', name: '이운영', team: '운영팀', role: '팀장', phone: '010-3333-0001', email: 'lee.ops@franchise.com', status: 'active', joinDate: '2017-11-01' },
  { id: 'ops2', name: '김슈퍼', team: '운영팀', role: 'SV', phone: '010-3333-0002', email: 'kim.sv@franchise.com', status: 'active', joinDate: '2019-04-05' },
  { id: 'ops3', name: '박관리', team: '운영팀', role: 'SV', phone: '010-3333-0003', email: 'park.sv@franchise.com', status: 'active', joinDate: '2021-02-12' },
  { id: 'ops4', name: '최매장', team: '운영팀', role: 'SV', phone: '010-3333-0004', email: 'choi.sv@franchise.com', status: 'active', joinDate: '2021-06-30' },
  { id: 'ops5', name: '정품질', team: '운영팀', role: 'QSC 담당', phone: '010-3333-0005', email: 'jung.qsc@franchise.com', status: 'active', joinDate: '2020-09-15' },
  { id: 'ops6', name: '강교육', team: '운영팀', role: '교육 담당', phone: '010-3333-0006', email: 'kang.edu@franchise.com', status: 'active', joinDate: '2022-01-10' },
  { id: 'ops7', name: '조순회', team: '운영팀', role: 'SV', phone: '010-3333-0007', email: 'cho.sv@franchise.com', status: 'active', joinDate: '2023-03-01' },
  { id: 'ops8', name: '윤해결', team: '운영팀', role: 'SV', phone: '010-3333-0008', email: 'yoon.sv@franchise.com', status: 'active', joinDate: '2023-05-20' },
  { id: 'ops9', name: '장매뉴', team: '운영팀', role: '매뉴얼 담당', phone: '010-3333-0009', email: 'jang.manual@franchise.com', status: 'active', joinDate: '2024-01-02' },
  { id: 'ops10', name: '한신입', team: '운영팀', role: '사원', phone: '010-3333-0010', email: 'han.new@franchise.com', status: 'active', joinDate: '2025-01-01' },
  { id: 'mkt1', name: '임마케', team: '마케팅팀', role: '팀장', phone: '010-4444-0001', email: 'lim.mkt@franchise.com', status: 'active', joinDate: '2019-12-01' },
  { id: 'mkt2', name: '송홍보', team: '마케팅팀', role: '대리', phone: '010-4444-0002', email: 'song.pr@franchise.com', status: 'active', joinDate: '2023-07-01' },
  { id: 'rnd1', name: '최맛나', team: '상품개발팀', role: '팀장(셰프)', phone: '010-5555-0001', email: 'choi.chef@franchise.com', status: 'active', joinDate: '2016-08-20' },
  { id: 'rnd2', name: '김연구', team: '상품개발팀', role: '연구원', phone: '010-5555-0002', email: 'kim.rnd@franchise.com', status: 'active', joinDate: '2021-11-11' },
  { id: 'rnd3', name: '이소스', team: '상품개발팀', role: '연구원', phone: '010-5555-0003', email: 'lee.sauce@franchise.com', status: 'active', joinDate: '2024-02-15' },
  { id: 'fin1', name: '나재무', team: '경영지원팀', role: '팀장(CFO)', phone: '010-6666-0001', email: 'na.cfo@franchise.com', status: 'active', joinDate: '2017-01-05' },
  { id: 'fin2', name: '조회계', team: '경영지원팀', role: '재무 대리', phone: '010-6666-0002', email: 'cho.acct@franchise.com', status: 'active', joinDate: '2022-04-01' },
  { id: 'hr1', name: '박인사', team: '경영지원팀', role: '인사 과장', phone: '010-6666-0003', email: 'park.hr@franchise.com', status: 'active', joinDate: '2020-10-10' },
  { id: 'ga1', name: '이총무', team: '경영지원팀', role: '총무 사원', phone: '010-6666-0004', email: 'lee.ga@franchise.com', status: 'active', joinDate: '2024-09-01' },
];

export const initialKPIs = [
  { id: 'KPI-CO-25', year: '2025', team: '전사', type: 'QUANT', title: '연 매출 300억 달성', target: 300, current: 185, unit: '억', status: 'warning', description: '기존점 매출 증대 및 신규 출점을 통한 외형 성장' },
  { id: 'KPI-SA-01', year: '2025', team: '영업팀', type: 'QUANT', title: '가맹점 200호점 돌파', target: 200, current: 142, unit: '개', status: 'warning', description: '지방 거점 도시 신규 출점 집중' },
  { id: 'KPI-MK-01', year: '2025', team: '마케팅팀', type: 'QUANT', title: '분기별 시즌 프로모션 실행', target: 4, current: 1, unit: '회', status: 'success', description: '신메뉴 출시 연계 및 브랜드 인지도 제고' },
  { id: 'KPI-OP-01', year: '2025', team: '운영팀', type: 'QUAL', title: '가맹점 관리 프로세스 표준화', target: '완료', current: '진행중', grade: 'B', status: 'warning', description: 'QSC 점검 기준 통일 및 리포트 시스템화' },
  { id: 'KPI-OP-02', year: '2025', team: '운영팀', type: 'QUANT', title: '평균 QSC 점수 90점 달성', target: 90, current: 84, unit: '점', status: 'warning', description: '위생 등급제 인증 확대' },
  { id: 'KPI-RD-01', year: '2025', team: '상품개발팀', type: 'QUANT', title: '시그니처 신메뉴 2종 출시', target: 2, current: 1, unit: '종', status: 'success', description: '매출 견인 핵심 메뉴 개발' },
  { id: 'KPI-MS-01', year: '2025', team: '경영지원팀', type: 'QUAL', title: '신규 ERP/그룹웨어 도입', target: '안정화', current: '선정 완료', grade: 'A', status: 'success', description: '수기 업무 자동화' },
  { id: 'KPI-MS-02', year: '2025', team: '경영지원팀', type: 'QUAL', title: '업무 효율화 캠페인', target: '회의 30% 절감', current: '기획 단계', grade: 'B', status: 'warning', description: '스마트워크 문화 정착' }
];

export const initialTasks = [
  { id: 'T-SA-01', ownerId: 'sales1', kpiId: 'KPI-SA-01', title: '창업 박람회 부스 운영', description: '프랜차이즈 박람회 상담 및 DB 확보', docCount: 2, updatedAt: '2025.01.10', timeRequired: '20H', frequency: '분기 1회', history: [] },
  { id: 'T-SA-02', ownerId: 'sales2', kpiId: 'KPI-SA-01', title: '신규 가맹 상담', description: '일일 문의 고객 응대 및 상권 분석', docCount: 5, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '매일', history: [] },
  { id: 'T-OP-01', ownerId: 'ops1', kpiId: 'KPI-OP-01', title: '체크리스트 개편', description: '점검 항목 최적화 및 모바일화', docCount: 1, updatedAt: '2025.01.05', timeRequired: '10H', frequency: '일회성', history: [] },
  { id: 'T-OP-02', ownerId: 'ops2', kpiId: 'KPI-OP-02', title: '권역 순회 점검', description: '가맹점 QSC 점검 및 점주 면담', docCount: 12, updatedAt: '2025.01.22', timeRequired: '6H', frequency: '매일', history: [] },
  { id: 'T-MK-01', ownerId: 'mkt1', kpiId: 'KPI-MK-01', title: '봄 시즌 프로모션 기획', description: '체험단 운영 및 포스터 디자인 발주', docCount: 4, updatedAt: '2025.01.18', timeRequired: '15H', frequency: '시즌별', history: [] },
  { id: 'T-RD-01', ownerId: 'rnd1', kpiId: 'KPI-RD-01', title: '여름 한정 메뉴 테스트', description: '경쟁사 분석 및 블라인드 테스트', docCount: 2, updatedAt: '2025.01.20', timeRequired: '4H', frequency: '주간', history: [] },
  { id: 'T-MS-01', ownerId: 'fin1', kpiId: 'KPI-CO-25', title: '월간 손익 마감', description: '전사 매출 집계 및 로열티 정산', docCount: 10, updatedAt: '2025.01.01', timeRequired: '8H', frequency: '월 1회', history: [] },
  { id: 'T-MS-02', ownerId: 'hr1', kpiId: 'KPI-MS-01', title: '그룹웨어 업체 미팅', description: '주요 솔루션 비교 및 견적 검토', docCount: 3, updatedAt: '2025.01.12', timeRequired: '2H', frequency: '수시', history: [] }
];

export const initialOrgChart = {
  name: "김대표 CEO",
  role: "대표이사",
  hasRnR: true,
  children: [
    { name: "영업팀", type: "department", children: [{ name: "박영업", role: "팀장", hasRnR: true, id: 'sales1' }, { name: "최매출", role: "과장", hasRnR: true, id: 'sales2' }, { name: "정개척", role: "대리", hasRnR: true, id: 'sales3' }] },
    { name: "운영팀", type: "department", children: [{ name: "이운영", role: "팀장", hasRnR: true, id: 'ops1' }, { name: "김슈퍼", role: "SV", hasRnR: true, id: 'ops2' }, { name: "...", role: "외 8명", hasRnR: true, id: 'ops_etc' }] },
    { name: "마케팅팀", type: "department", children: [{ name: "임마케", role: "팀장", hasRnR: true, id: 'mkt1' }, { name: "송홍보", role: "대리", hasRnR: true, id: 'mkt2' }] },
    { name: "상품개발팀", type: "department", children: [{ name: "최맛나", role: "팀장", hasRnR: true, id: 'rnd1' }, { name: "김연구", role: "연구원", hasRnR: true, id: 'rnd2' }, { name: "이소스", role: "연구원", hasRnR: true, id: 'rnd3' }] },
    { name: "경영지원팀", type: "department", children: [{ name: "나재무", role: "팀장", hasRnR: true, id: 'fin1' }, { name: "박인사", role: "과장", hasRnR: true, id: 'hr1' }, { name: "조회계", role: "대리", hasRnR: true, id: 'fin2' }, { name: "이총무", role: "사원", hasRnR: true, id: 'ga1' }] }
  ]
};

export const subscriptionData = {
  plan: "Pro", status: "active", price: "50,000원 / 월", nextBilling: "2025.02.15", paymentMethod: "법인카드 (**** 5678)",
  usage: { seats: { used: 23, total: 30 }, storage: { used: 120, total: 500, unit: "GB" }, aiCredits: { used: 4500, total: 10000 } },
  billingHistory: [ { date: "2025.01.15", amount: "50,000원", status: "결제완료" } ]
};
