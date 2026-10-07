const KEY = 'mps-centers2-demo-v6';
const LEGACY_KEYS = ['mps-centers2-demo-v5','mps-centers2-demo-v4','mps-centers2-demo-v3','mps-centers2-demo-v2','mps-centers2-demo-v1'];
const STAGES = ['급성장 전','가속기','최고성장기','감속기','종료 초기','성인','검사 전'];
const STAGE_ALIASES = {'가속':'가속기','중반':'최고성장기','감속':'감속기','종료':'종료 초기','종료 임박':'성인'};
const STAGE_GUIDES = {
  '급성장 전':{line:'기본 움직임과 기술 시도를 관찰합니다.',points:['움직임의 균형','기술 시도와 자신감']},
  '가속기':{line:'달라지는 몸에 맞춰 움직임과 회복 반응을 살핍니다.',points:['착지·감속 동작','훈련 후 피로 반응']},
  '최고성장기':{line:'성장 변화 속에서 동작의 안정성과 회복을 확인합니다.',points:['협응 변화','회복 상태']},
  '감속기':{line:'움직임을 다시 정돈하며 기술 수행을 비교합니다.',points:['좌우 움직임','기술 수행 안정성']},
  '종료 초기':{line:'개인 과제와 훈련·회복의 균형을 점검합니다.',points:['개인 기술 과제','훈련·회복 균형']},
  '성인':{line:'종목 과제와 부하·회복을 선수와 함께 점검합니다.',points:['종목 과제 수행','부하·회복 자기관리']},
  '검사 전':{line:'성장단계 검사 결과를 기다리는 선수입니다.',points:['기본 움직임 관찰','검사 일정 확인']}
};
const initialPlayers = [
  {id:'demo-1',code:'MPS-C-001',name:'이도현',dob:'2014-04-01',group:'U12',coach:'김 코치',paid:4,used:1,goal:'압박 상황에서 첫 터치 후 선택',report:{examDate:'2026-04-01',boneAgeMonths:132,stage:'급성장 전',maturity:'지연',mental:'실수 후 회복',physical:'균형 점검'},notes:[{date:'2026.10.05',text:'왼쪽 전환 타이밍이 좋아짐.'}]},
  {id:'demo-2',code:'MPS-C-002',name:'박서준',dob:'2014-04-20',group:'U12',coach:'김 코치',paid:8,used:5,goal:'경기 전 준비 루틴 만들기',report:{examDate:'2026-04-20',boneAgeMonths:144,stage:'급성장 전',maturity:'평균',mental:'준비 루틴',physical:'기본 움직임'},notes:[]},
  {id:'demo-3',code:'MPS-C-003',name:'최하람',dob:'2013-06-15',group:'U13',coach:'이 코치',paid:4,used:4,goal:'균형과 방향 전환 관찰',report:{examDate:'2026-06-15',boneAgeMonths:168,stage:'가속기',maturity:'조기',mental:'자기 조절',physical:'회복 점검'},notes:[]},
  {id:'demo-4',code:'MPS-C-004',name:'정민재',dob:'2014-07-10',group:'U12',coach:'김 코치',paid:8,used:2,goal:'착지 자세와 방향 전환 확인',report:{examDate:'2026-07-10',boneAgeMonths:144,stage:'가속기',maturity:'평균',mental:'집중 전환',physical:'착지 안정성'},notes:[]},
  {id:'demo-5',code:'MPS-C-005',name:'한지우',dob:'2012-05-08',group:'U14',coach:'이 코치',paid:12,used:6,goal:'훈련 후 회복 습관 만들기',report:{examDate:'2026-05-08',boneAgeMonths:168,stage:'최고성장기',maturity:'평균',mental:'목표 설정',physical:'회복 관찰'},notes:[]},
  {id:'demo-6',code:'MPS-C-006',name:'오시윤',dob:'2013-09-12',group:'U13',coach:'이 코치',paid:8,used:3,goal:'스프린트 후 움직임 점검',report:{examDate:'2026-09-12',boneAgeMonths:162,stage:'최고성장기',maturity:'조기',mental:'자신감',physical:'하체 협응'},notes:[]},
  {id:'demo-7',code:'MPS-C-007',name:'강태오',dob:'2012-02-14',group:'U14',coach:'박 코치',paid:10,used:7,goal:'속도 변화 뒤 자세 유지',report:{examDate:'2026-02-14',boneAgeMonths:180,stage:'감속기',maturity:'조기',mental:'경기 집중',physical:'코어 안정'},notes:[]},
  {id:'demo-8',code:'MPS-C-008',name:'문서율',dob:'2011-08-20',group:'U15',coach:'박 코치',paid:6,used:1,goal:'피로 신호를 스스로 말하기',report:{examDate:'2026-08-20',boneAgeMonths:180,stage:'감속기',maturity:'평균',mental:'감정 조절',physical:'피로 점검'},notes:[]},
  {id:'demo-9',code:'MPS-C-009',name:'윤재민',dob:'2011-01-11',group:'U15',coach:'박 코치',paid:8,used:6,goal:'개인 훈련 루틴 정리',report:{examDate:'2026-01-11',boneAgeMonths:180,stage:'종료 초기',maturity:'평균',mental:'자기 관리',physical:'근력 균형'},notes:[]},
  {id:'demo-10',code:'MPS-C-010',name:'배하준',dob:'2012-03-05',group:'U14',coach:'이 코치',paid:8,used:4,goal:'좌우 움직임 균형 확인',report:{examDate:'2026-03-05',boneAgeMonths:180,stage:'종료 초기',maturity:'조기',mental:'경기 루틴',physical:'좌우 균형'},notes:[]},
  {id:'demo-11',code:'MPS-C-011',name:'서도겸',dob:'2008-06-18',group:'성인',coach:'박 코치',paid:12,used:9,goal:'다음 시즌 목표 정리',report:{examDate:'2026-06-18',boneAgeMonths:216,stage:'성인',maturity:'평균',mental:'장기 목표',physical:'움직임 유지'},notes:[]},
  {id:'demo-12',code:'MPS-C-012',name:'임유찬',dob:'2007-09-07',group:'성인',coach:'박 코치',paid:4,used:2,goal:'훈련량과 회복 기록하기',report:{examDate:'2026-09-07',boneAgeMonths:234,stage:'성인',maturity:'조기',mental:'회복 인식',physical:'부하 점검'},notes:[]}
];
const SAMPLE_INSIGHTS = {
  'demo-1':{mental:{type:'오뚝이 회복형',strengths:['실수 후 재참여','도움 요청'],needs:['경기 전 긴장','준비 루틴']},physical:{focus:['한발 균형','좌우 협응'],recommendations:['한발 균형 후 짧은 패스','낮은 속도에서 방향 전환 관찰']}},
  'demo-2':{mental:{type:'섬세한 준비형',strengths:['준비 계획','코칭 수용'],needs:['실수 뒤 전환','결과 부담']},physical:{focus:['기본 움직임','착지 안정'],recommendations:['기본 스쿼트 움직임 관찰','양발 착지 균형 확인']}},
  'demo-3':{mental:{type:'실전 승부사형',strengths:['압박 대응','빠른 판단'],needs:['준비 루틴','감정 조절']},physical:{focus:['회복 리듬','감속 동작'],recommendations:['훈련 뒤 컨디션 짧게 기록','속도를 줄이는 동작 관찰']}},
  'demo-4':{mental:{type:'침착한 감각형',strengths:['상황 읽기','경기 안정'],needs:['목표 구체화','자기 표현']},physical:{focus:['착지 안정','방향 전환'],recommendations:['착지 후 자세 유지 관찰','방향 전환 전 감속 연습']}},
  'demo-5':{mental:{type:'책임감 설계자형',strengths:['목표 설정','훈련 성실'],needs:['도움 요청','과부하 인식']},physical:{focus:['훈련 후 회복','움직임 질'],recommendations:['훈련 전후 피로 상태 확인','움직임이 흐트러지는 시점 기록']}},
  'demo-6':{mental:{type:'성실한 도전자형',strengths:['반복 훈련','피드백 적용'],needs:['실패 후 회복','자신감 표현']},physical:{focus:['하체 협응','스프린트 감속'],recommendations:['짧은 가속 뒤 감속 관찰','좌우 다리 협응 동작 점검']}},
  'demo-7':{mental:{type:'올라운드 밸런스형',strengths:['자기 통제','경기 준비'],needs:['과제 우선순위','회복 인식']},physical:{focus:['코어 안정','속도 변화'],recommendations:['방향 전환 때 몸통 안정 확인','속도 변화 뒤 자세 비교']}},
  'demo-8':{mental:{type:'스펀지 흡수형',strengths:['코칭 수용','환경 적응'],needs:['자기 목표','결정 자신감']},physical:{focus:['피로 신호','좌우 균형'],recommendations:['피로 체감 한마디로 기록','좌우 움직임 차이 관찰']}},
  'demo-9':{mental:{type:'책임감 설계자형',strengths:['자기 주도','꾸준한 실천'],needs:['결과 부담','휴식 선택']},physical:{focus:['근력 균형','회복 습관'],recommendations:['좌우 힘 사용 차이 기록','훈련과 휴식 계획 함께 점검']}},
  'demo-10':{mental:{type:'침착한 감각형',strengths:['감정 조절','안정적 수행'],needs:['주도적 선택','새로운 시도']},physical:{focus:['좌우 균형','착지 조절'],recommendations:['한발 착지 좌우 차이 확인','방향 전환 뒤 자세 관찰']}},
  'demo-11':{mental:{type:'올라운드 밸런스형',strengths:['경기 준비','회복 대처'],needs:['목표 구체화','평가 독립성']},physical:{focus:['움직임 유지','훈련 부하'],recommendations:['개인 목표 동작을 영상으로 비교','훈련량과 컨디션 함께 기록']}},
  'demo-12':{mental:{type:'오뚝이 회복형',strengths:['실수 뒤 복귀','도움 활용'],needs:['훈련량 조절','경기 전 긴장']},physical:{focus:['부하 관리','피로 회복'],recommendations:['훈련 뒤 피로 변화 기록','회복 상태에 맞춰 과제 조정']}}
};
// Sample individual strengths; never inferred from growth stage alone.
const SAMPLE_PHYSICAL_STRENGTHS = {
  'demo-1':['움직임 습득','리듬 조절'],'demo-2':['기술 협응','가동성'],
  'demo-3':['짧은 가속','기술 연결'],'demo-4':['직선 스피드','반응 민첩성'],
  'demo-5':['기술 수행','기본 가동성'],'demo-6':['출발 반응','패스 협응'],
  'demo-7':['하체 근력','점프 파워'],'demo-8':['반복 수행','가속 능력'],
  'demo-9':['스프린트','점프 파워'],'demo-10':['근력','반복 수행'],
  'demo-11':['방향 전환','심폐지구력'],'demo-12':['최고속도','근지구력']
};
// Selected priorities from 2026physical/scripts/template.html WEIGHTS; not test results.
const STAGE_PHYSICAL_FOCUS = {
  '급성장 전':'기술·협응 / 균형·운동조절',
  '가속기':'균형·운동조절 / 회복·조직스트레스',
  '최고성장기':'유연성·가동성 / 회복·조직스트레스',
  '감속기':'근력 / 파워·순발력',
  '종료 초기':'스피드 / 근력·파워'
};
const SAMPLE_PREVIOUS_STAGES=['급성장 전','급성장 전','급성장 전','가속기','가속기','최고성장기','최고성장기','감속기','감속기','종료 초기','종료 초기','성인'];
for(const [i,p] of initialPlayers.entries()){
  if(SAMPLE_INSIGHTS[p.id])Object.assign(p.report,SAMPLE_INSIGHTS[p.id]);
  p.previousReport={examDate:shiftMonths(p.report.examDate,-6),stage:SAMPLE_PREVIOUS_STAGES[i],boneAgeMonths:p.report.boneAgeMonths-6};
}
initialPlayers[0].idp={startDate:'2026-09-01',endDate:'2026-10-27',priorities:[
  {id:'first_touch',category:'technical',label:'퍼스트터치',status:'needs_work',intensity:'focus',context:'압박 받을 때',summary:'압박 받을 때 퍼스트터치를 집중해서 봅니다.'},
  {id:'scan',category:'decision',label:'주변 보기',status:'normal',intensity:'improve',context:'공 받기 전',summary:'공 받기 전 주변 보기를 더 살펴봅니다.'},
  {id:'reset',category:'mental',label:'실수 후 회복',status:'normal',intensity:'improve',context:'경기 중',summary:'경기 중 실수 후 회복을 더 살펴봅니다.'}
],checks:[{date:'2026-09-23',values:{first_touch:'same',scan:'same',reset:'needs_work'},condition:'normal'},{date:'2026-09-30',values:{first_touch:'good',scan:'same',reset:'same'},condition:'good'}]};
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const copy = value => JSON.parse(JSON.stringify(value));
function read(){
  try{
    const current=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(current))return current;
    for(const key of LEGACY_KEYS){
      const older=JSON.parse(localStorage.getItem(key));
      if(Array.isArray(older)){
        const migrated=older.map((p,i)=>{const seed=initialPlayers.find(x=>x.id===p.id)||{};const report=p.report||seed.report||null;return {...copy(seed),...p,code:p.code||seed.code||`MPS-C-${String(i+1).padStart(3,'0')}`,dob:p.dob||seed.dob||'',report:report?{...seed.report,...report,mental:seed.report?.mental||report.mental,physical:seed.report?.physical||report.physical,stage:STAGE_ALIASES[report.stage]||report.stage}:null}});
        for(const p of migrated){if(p.id==='demo-11'&&p.dob==='2011-06-18'){p.dob='2008-06-18';p.group='성인';p.report.boneAgeMonths=216}if(p.id==='demo-12'&&p.dob==='2011-09-07'){p.dob='2007-09-07';p.group='성인';p.report.boneAgeMonths=234}}
        const ids=new Set(migrated.map(p=>p.id));
        const merged=[...migrated,...copy(initialPlayers.filter(p=>!ids.has(p.id)))];
        localStorage.setItem(KEY,JSON.stringify(merged));
        return merged;
      }
    }
  }catch{}
  return copy(initialPlayers);
}
let players=read();let selected=players[0]?.id??null;let query='';let stageFilter='전체';let activePlayerTab='lesson';
function save(){try{localStorage.setItem(KEY,JSON.stringify(players))}catch{alert('브라우저 저장 공간을 사용할 수 없습니다.')}}
function localDate(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function displayDate(date){return date?date.replaceAll('-','.'):'—'}
function monthsAt(dob,exam){if(!dob||!exam)return null;const [by,bm,bd]=dob.split('-').map(Number),[ey,em,ed]=exam.split('-').map(Number);if(!by||!ey)return null;return (ey-by)*12+(em-bm)-(ed<bd?1:0)}
function yearsMonths(total){if(!Number.isInteger(total)||total<0)return '—';return `${Math.floor(total/12)}세 ${total%12}개월`}
function shiftMonths(date,delta){if(!date)return '';const [y,m,d]=date.split('-').map(Number);const start=new Date(Date.UTC(y,m-1+delta,1));const last=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,0)).getUTCDate();return `${start.getUTCFullYear()}-${String(start.getUTCMonth()+1).padStart(2,'0')}-${String(Math.min(d,last)).padStart(2,'0')}`}
function sixMonthsAfter(date){if(!date)return '';const [y,m,d]=date.split('-').map(Number);const start=new Date(Date.UTC(y,m-1+6,1));const last=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,0)).getUTCDate();return `${start.getUTCFullYear()}-${String(start.getUTCMonth()+1).padStart(2,'0')}-${String(Math.min(d,last)).padStart(2,'0')}`}
function getStage(p){return p.report?.stage||'검사 전'}
function ageDiff(p){if(!p.report||!Number.isInteger(p.report.boneAgeMonths))return null;const actual=monthsAt(p.dob,p.report.examDate);return actual===null?null:p.report.boneAgeMonths-actual}
function maturityText(p){const diff=ageDiff(p);return p.report&&diff!==null?`${p.report.maturity} · ${Math.abs(diff)}개월 차이`:'성숙도 결과 대기'}
function signedDiff(p){const diff=ageDiff(p);return diff===null?'—':`${diff>0?'+':diff<0?'−':''}${Math.abs(diff)}개월 · ${p.report.maturity}`}
function mentalResult(p){return p.report?.mental&&typeof p.report.mental==='object'?p.report.mental:null}
function physicalPlan(p){const result=p.report?.physical;if(!result||typeof result!=='object')return null;return {...result,strengths:result.strengths||SAMPLE_PHYSICAL_STRENGTHS[p.id]||[],needs:result.needs||result.focus||[]}}
function visiblePlayers(){return players.filter(p=>(stageFilter==='전체'||getStage(p)===stageFilter)&&[p.name,p.code].some(v=>String(v||'').toLowerCase().includes(query)))}
function renderFilters(){const counts=Object.fromEntries(STAGES.map(s=>[s,players.filter(p=>getStage(p)===s).length]));const items=['전체',...STAGES.filter(s=>counts[s])];$('#stage-filters').innerHTML=items.map(s=>`<button type="button" data-stage="${esc(s)}" class="stage-chip ${s==='전체'?'all':''} ${s===stageFilter?'active':''}" aria-pressed="${s===stageFilter}"><span>${esc(s)}</span><b>${s==='전체'?players.length:counts[s]}</b></button>`).join('')}
function renderStageGuide(){const box=$('#stage-guide'),guide=STAGE_GUIDES[stageFilter];box.hidden=!guide;if(guide)box.innerHTML=`<span class="eyebrow">${esc(stageFilter)} · 레슨 관찰 예시</span><p>${esc(guide.line)}</p><div>${guide.points.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`}
function card(p){
  const report=p.report,mental=mentalResult(p),physical=physicalPlan(p);
  return `<button class="player-card-button compact-player" data-id="${esc(p.id)}" type="button" aria-label="${esc(p.name)} 선수 정보 열기">
    <span class="player-card-identity"><span class="compact-top"><strong>${esc(p.name)}</strong><span class="compact-dob">${esc(displayDate(p.dob))}</span><span class="compact-stage">${esc(getStage(p))}</span><b class="compact-remaining">남은 ${Math.max(0,p.paid-p.used)}회</b></span>
    <span class="compact-measure"><span>최근 검사 ${esc(displayDate(report?.examDate))}</span><span>뼈나이 ${esc(report?yearsMonths(report.boneAgeMonths):'대기')}</span><span>${esc(signedDiff(p))}</span><small>${esc(p.code)}</small></span>
    </span><span class="player-card-results"><span class="compact-result mental"><b class="result-key">M</b><span class="result-copy"><strong class="reference-tag tag-lavender">${esc(mental?.type||'결과 대기')}</strong>${mental?`<span class="card-observation"><span class="reference-tag tag-outline">강점</span> ${mental.strengths.map(esc).join(' · ')}</span><span class="card-observation"><span class="reference-tag tag-outline">보완점</span> ${mental.needs.map(esc).join(' · ')}</span>`:''}</span></span>
    <span class="compact-result physical"><b class="result-key">P</b><span class="result-copy">${physical?`<span class="card-observation"><strong class="reference-tag tag-blue">피지컬강점</strong> ${physical.strengths.length?physical.strengths.map(esc).join(' · '):'결과 대기'}</span><span class="card-observation"><strong class="reference-tag tag-mint">보완점</strong> ${physical.needs.map(esc).join(' · ')||'결과 대기'}</span>`:'결과 대기'}</span></span>
    <span class="compact-result idp"><b class="result-key">IDP</b><span class="idp-card-tags">${p.idp?.priorities?.length?p.idp.priorities.slice(0,3).map(item=>`<span class="idp-card-tag">${esc(item.label)}</span>`).join(''):'<span class="idp-unset">목표 선택 전</span>'}</span></span>
    </span>
  </button>`
}
function renderRoster(list){$('#visible-count').textContent=`${list.length}명`;$('#player-list').innerHTML=list.length?STAGES.map(stage=>{const group=list.filter(p=>getStage(p)===stage);return group.length?`<section class="stage-group"><div class="stage-group-head"><h3>${esc(stage)}</h3><span>${group.length}명</span></div>${STAGE_PHYSICAL_FOCUS[stage]?`<p class="stage-physical-focus">훈련 중점 <span>${esc(STAGE_PHYSICAL_FOCUS[stage])}</span></p>`:''}<div class="stage-players">${group.map(card).join('')}</div></section>`:''}).join(''):'<p class="empty">해당 선수가 없습니다.</p>'}
function renderDetail(){const p=players.find(x=>x.id===selected);const detail=$('#detail');if(!p){detail.innerHTML='<p class="empty">선수를 추가하거나 목록에서 선택하세요.</p>';return}
  const report=p.report,remaining=Math.max(0,p.paid-p.used),diff=ageDiff(p),nextGrowth=sixMonthsAfter(report?.examDate);
  const diffLabel=diff===null?'—':`${diff>0?'+':diff<0?'−':''}${Math.abs(diff)}개월`;
  const mental=mentalResult(p),physical=physicalPlan(p),guide=STAGE_GUIDES[getStage(p)]||STAGE_GUIDES['검사 전'],previous=p.previousReport;
  const lastLesson=p.lessonHistory?.at(-1);
  detail.innerHTML=`<div class="detail-head"><div><p class="eyebrow">PLAYER · ${esc(p.code)}</p><h2>${esc(p.name)}</h2><p>생년월일 ${esc(displayDate(p.dob))} · ${esc(p.group||'반 미정')} · ${esc(p.coach||'코치 미정')}</p></div><span class="badge ${remaining===0?'zero':''}">남은 ${remaining}회</span></div>
  <nav class="player-tabs" aria-label="선수 화면"><button type="button" data-player-tab="lesson" class="${activePlayerTab==='lesson'?'active':''}" aria-current="${activePlayerTab==='lesson'?'page':'false'}">레슨 관리</button><button type="button" data-player-tab="idp" class="${activePlayerTab==='idp'?'active':''}" aria-current="${activePlayerTab==='idp'?'page':'false'}">IDP 스페이스</button></nav><div id="player-lesson-view" ${activePlayerTab==='idp'?'hidden':''}>
  <div class="quick-actions"><button class="button primary" id="use-session" type="button" ${remaining===0?'disabled':''}>레슨 완료 · 1회 기록</button><button class="button soft" id="book-player" type="button">다음 예약</button></div>${lastLesson?`<p class="lesson-check">최근 레슨 ${esc(displayDate(lastLesson.date))}${lastLesson.focus?` · ${esc(lastLesson.focus)} 확인`:''}</p>`:''}
  <div class="session-line"><span>결제 ${p.paid}회</span><span>진행 ${p.used}회</span><strong>남은 ${remaining}회</strong></div>
  <section class="assessment-section" aria-label="MPS 검사 요약"><h3 class="section-label">MPS 검사 요약</h3>
  <div class="growth-panel"><div class="growth-title"><span>S · 성장단계</span><strong>${esc(getStage(p))}</strong></div>${report?`<div class="growth-facts"><div><small>검사일</small><b>${esc(displayDate(report.examDate))}</b></div><div><small>생활연령</small><b>${esc(yearsMonths(monthsAt(p.dob,report.examDate)))}</b></div><div><small>뼈나이</small><b>${esc(yearsMonths(report.boneAgeMonths))}</b></div><div><small>차이</small><b>${esc(diffLabel)} · ${esc(report.maturity)}</b></div></div><details class="growth-history"><summary>이전 검사와 비교</summary>${previous?`<div class="stage-compare"><div><small>이전 검사 · ${esc(displayDate(previous.examDate))}</small><b>${esc(previous.stage)}</b></div><span aria-hidden="true">→</span><div><small>최근 검사 · ${esc(displayDate(report.examDate))}</small><b>${esc(report.stage)}</b></div></div><p class="stage-change">${previous.stage===report.stage?'성장단계 유지':'성장단계 변화 · 오늘의 관찰 포인트를 다시 확인하세요.'}</p>`:'<p class="hint">이전 검사 결과가 없습니다.</p>'}</details><div class="next-growth ${nextGrowth<=localDate()?'due':''}"><span>6개월 성장점검</span><b>${esc(displayDate(nextGrowth))}</b></div>`:'<p class="empty">MPS 검사 결과가 연계되면 성장단계와 뼈나이가 표시됩니다.</p>'}</div>
  <div class="insight-panels compact-insights"><section class="insight-strip mental"><div class="insight-strip-head"><span>M · 멘탈 유형</span><strong>${esc(mental?.type||'결과 대기')}</strong></div>${mental?`<div class="insight-inline"><p><small>강점</small>${mental.strengths.map(esc).join(' · ')}</p><p><small>보완</small>${mental.needs.map(esc).join(' · ')}</p></div>`:''}</section><section class="insight-strip physical"><div class="insight-strip-head"><span>P · 피지컬 보강</span><strong>${esc(physical?.focus?.join(' · ')||'결과 대기')}</strong></div>${physical?`<p class="insight-recs"><small>피지컬강점</small>${physical.strengths.map(esc).join(' · ')||'결과 대기'}</p><p class="insight-recs"><small>추천</small>${physical.recommendations.map(esc).join(' · ')}</p>`:''}</section></div>
  </section>
  <details class="optional focus-optional"><summary>오늘의 지도 포인트 · ${esc(getStage(p))}<span class="focus-select-action">${p.todayFocus?'변경하기':'선택하기'} ›</span></summary><div class="focus-panel"><span class="eyebrow">오늘의 지도 포인트 · ${esc(getStage(p))}</span><p>${esc(guide.line)}</p><div class="focus-choices">${guide.points.map(x=>`<button type="button" data-focus="${esc(x)}" class="focus-choice ${p.todayFocus===x?'active':''}" aria-pressed="${p.todayFocus===x}">${esc(x)}</button>`).join('')}</div><small>터치해 선택하면 이번 레슨의 IDP 관찰 포인트로 저장됩니다.</small></div></details>
  <p class="hint">M·P·S 내용은 가상 샘플입니다. 성장단계와 성숙도 표기는 MPS 결과 예시이며, 개월 차이만 검사일 기준으로 계산합니다. 추천은 실제 평가와 코치 판단으로 조정합니다.</p>
  <h3 class="section-label additional-label">추가 관리</h3>
  <details class="optional"><summary>짧은 코치 목표 · 선택</summary><label for="goal">기존 코치 목표</label><input id="goal" maxlength="160" value="${esc(p.goal||'')}" placeholder="필요할 때만 짧게 입력"><p class="hint">터치로 고르는 목표는 IDP 스페이스에서 관리합니다.</p></details>
  <details class="optional" id="profile-editor"><summary>기본 정보 수정</summary><div class="profile-fields"><label>선수 이름<input id="edit-name" maxlength="20" value="${esc(p.name)}" autocomplete="off"></label><label>생년월일<input id="edit-dob" type="date" value="${esc(p.dob)}"></label><label>소속 반<input id="edit-group" maxlength="20" value="${esc(p.group||'')}" autocomplete="off"></label><label>담당 코치<input id="edit-coach" maxlength="20" value="${esc(p.coach||'')}" autocomplete="off"></label></div><div class="profile-save-row"><button class="button soft" id="save-profile" type="button">기본 정보 저장</button><span id="profile-save-state" class="save-state" role="status"></span></div><p class="hint">고유코드와 MPS 검사 결과는 여기서 수정하지 않습니다.</p></details>
  <details class="optional"><summary>회차 관리</summary><div class="row"><input id="add-sessions" type="number" min="1" max="100" value="4" inputmode="numeric" aria-label="추가할 결제 회차"><button class="button soft" id="add-paid" type="button">결제 회차 추가</button><button class="button soft" id="undo-session" type="button" ${p.used===0?'disabled':''}>진행 1회 취소</button></div><p class="hint">이미 결제된 회차를 수동 기록합니다. 결제 처리 기능은 아닙니다.</p></details>
  <details class="optional"><summary>메모 남기기 · 선택</summary><textarea id="note" maxlength="1000" placeholder="필요할 때만 짧게 적으세요."></textarea><button class="button soft" id="save-note" type="button">메모 저장</button><span class="save-state" id="save-state" role="status"></span>${p.notes?.length?`<div class="notes"><h3>최근 메모</h3>${p.notes.slice().reverse().map(n=>`<div class="note-entry"><time>${esc(n.date)}</time><p>${esc(n.text)}</p></div>`).join('')}</div>`:''}</details>
  <div class="detail-actions"><button class="text-danger" id="delete-player" type="button">이 가상 선수 삭제</button></div></div><section id="idp-view" ${activePlayerTab==='lesson'?'hidden':''}></section>`;
  window.mpsIdpRender?.(p);
}
const playerDetailDialog=$('#player-detail-dialog');
window.mpsReturnToPlayer=playerId=>{if(!players.some(p=>p.id===playerId))return;selected=playerId;renderDetail();playerDetailDialog.showModal()};
function render(){const list=visiblePlayers();if(!playerDetailDialog.open&&!list.some(p=>p.id===selected))selected=list[0]?.id??null;$('#total-players').textContent=`${players.length}명`;$('#total-remaining').textContent=`${players.reduce((n,p)=>n+Math.max(0,p.paid-p.used),0)}회`;$('#due-count').textContent=`${players.filter(p=>p.report&&sixMonthsAfter(p.report.examDate)<=localDate()).length}명`;renderFilters();renderStageGuide();renderRoster(list);renderDetail()}
$('#stage-filters').addEventListener('click',e=>{const button=e.target.closest('[data-stage]');if(button){stageFilter=button.dataset.stage;render()}});
$('#player-list').addEventListener('click',e=>{const button=e.target.closest('[data-id]');if(button){selected=button.dataset.id;activePlayerTab='lesson';renderDetail();playerDetailDialog.showModal()}});
$('#player-detail-close').addEventListener('click',()=>playerDetailDialog.close());
playerDetailDialog.addEventListener('click',e=>{if(e.target===playerDetailDialog)playerDetailDialog.close()});
$('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render()});
$('#detail').addEventListener('change',e=>{const p=players.find(x=>x.id===selected);if(p&&e.target.id==='goal'){p.goal=e.target.value.trim();save()}});
$('#detail').addEventListener('click',e=>{const p=players.find(x=>x.id===selected);if(!p)return;const id=e.target.id;
  const tab=e.target.closest('[data-player-tab]');if(tab){activePlayerTab=tab.dataset.playerTab;renderDetail();playerDetailDialog.scrollTop=0;return}
  const choice=e.target.closest('[data-focus]');if(choice){p.todayFocus=choice.dataset.focus;save();const scroll=playerDetailDialog.scrollTop;render();playerDetailDialog.scrollTop=scroll;return}
  if(id==='book-player'){playerDetailDialog.close();if(window.mpsCalendarOpenForPlayer)window.mpsCalendarOpenForPlayer(p.id);else $('#calendar-open').click()}
  if(id==='save-profile'){const name=$('#edit-name').value.trim(),dob=$('#edit-dob').value,group=$('#edit-group').value.trim(),coach=$('#edit-coach').value.trim();if(!name||!dob||dob>localDate()||p.report&&dob>p.report.examDate){$('#profile-save-state').textContent='이름과 생년월일을 확인해 주세요.';return}p.name=name;p.dob=dob;p.group=group;p.coach=coach;save();const scroll=playerDetailDialog.scrollTop;render();$('#profile-editor').open=true;$('#profile-save-state').textContent='저장됐습니다.';playerDetailDialog.scrollTop=scroll}
  if(id==='add-paid'){const count=Number($('#add-sessions').value);if(!Number.isInteger(count)||count<1||count>100){alert('1~100회 사이의 숫자를 입력하세요.');return}p.paid+=count;save();render()}
  if(id==='use-session'&&p.used<p.paid){p.used++;(p.lessonHistory??=[]).push({date:localDate(),focus:p.todayFocus||'',goal:p.goal||''});save();render()}
  if(id==='undo-session'&&p.used>0){p.used--;p.lessonHistory?.pop();save();render()}
  if(id==='save-note'){const note=$('#note').value.trim();if(!note){$('#save-state').textContent='메모를 입력해 주세요.';return}(p.notes??=[]).push({date:displayDate(localDate()),text:note});save();render()}
  if(id==='delete-player'&&confirm(`${p.name} 가상 선수를 삭제할까요?`)){playerDetailDialog.close();players=players.filter(x=>x.id!==p.id);save();render();window.dispatchEvent(new CustomEvent('mps-player-deleted',{detail:{id:p.id}}))}
});
const dialog=$('#player-dialog');$('#add-player').addEventListener('click',()=>dialog.showModal());$('#close-dialog').addEventListener('click',()=>dialog.close());
$('#player-form').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.target);const name=String(form.get('name')||'').trim(),dob=String(form.get('dob')||'');if(!name||!dob||dob>localDate()){alert('이름과 생년월일을 확인해 주세요.');return}const id=`demo-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;const p={id,code:`MPS-C-${id.slice(-8).toUpperCase()}`,name,dob,group:String(form.get('group')||'').trim(),coach:String(form.get('coach')||'').trim(),paid:0,used:0,goal:'',report:null,notes:[]};players.unshift(p);stageFilter='검사 전';query='';$('#search').value='';selected=p.id;save();render();e.target.reset();dialog.close();playerDetailDialog.showModal()});
$('#reset').addEventListener('click',()=>{if(confirm('샘플 데이터를 처음 상태로 되돌릴까요? 입력한 메모, 회차, 예약도 지워집니다.')){if(playerDetailDialog.open)playerDetailDialog.close();players=copy(initialPlayers);selected=players[0].id;stageFilter='전체';query='';$('#search').value='';save();render();window.dispatchEvent(new Event('mps-demo-reset'))}});
// Solar schedule for the sample center in Seoul (KST, 37.5665 N / 126.978 E).
function solarSchedule(date=localDate()){
  const day=Math.floor((Date.parse(`${date}T12:00:00Z`)-Date.parse(`${date.slice(0,4)}-01-01T12:00:00Z`))/86400000)+1;
  const year=Number(date.slice(0,4));const daysInYear=year%4===0&&(year%100!==0||year%400===0)?366:365;
  const gamma=2*Math.PI/daysInYear*(day-1);
  const equation=229.18*(.000075+.001868*Math.cos(gamma)-.032077*Math.sin(gamma)-.014615*Math.cos(2*gamma)-.040849*Math.sin(2*gamma));
  const declination=.006918-.399912*Math.cos(gamma)+.070257*Math.sin(gamma)-.006758*Math.cos(2*gamma)+.000907*Math.sin(2*gamma)-.002697*Math.cos(3*gamma)+.00148*Math.sin(3*gamma);
  const latitude=37.5665*Math.PI/180;
  const hourAngle=Math.acos(Math.cos(90.833*Math.PI/180)/(Math.cos(latitude)*Math.cos(declination))-Math.tan(latitude)*Math.tan(declination))*180/Math.PI;
  const noon=720-4*126.978-equation+540;
  return {sunrise:noon-4*hourAngle,sunset:noon+4*hourAngle};
}
const THEME_KEY='mps-centers3-theme-mode-v1';
const requestedTheme=typeof location==='undefined'?'':new URLSearchParams(location.search).get('theme');
let themeMode=['light','dark','auto'].includes(requestedTheme)?requestedTheme:(localStorage.getItem(THEME_KEY)||'auto');
if(!['light','dark','auto'].includes(themeMode))themeMode='auto';
let theme='light';
function applyTheme(){
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
  const minutes=Number(parts.find(p=>p.type==='hour').value)*60+Number(parts.find(p=>p.type==='minute').value);
  const {sunrise,sunset}=solarSchedule();
  theme=themeMode==='auto'?(minutes>=sunrise&&minutes<sunset?'light':'dark'):themeMode;
  if(document.documentElement)document.documentElement.dataset.theme=theme;
  const button=$('#theme-toggle');
  button.textContent=themeMode==='auto'?`◐ 자동 · ${theme==='light'?'라이트':'다크'}`:themeMode==='light'?'☼ 라이트':'☾ 다크';
  button.setAttribute?.('aria-label',`화면 모드: ${themeMode==='auto'?'일출·일몰 자동':themeMode==='light'?'라이트':'다크'}. 누르면 다음 모드로 변경`);
  button.setAttribute?.('aria-pressed',String(themeMode!=='auto'));
  button.title='자동 → 라이트 → 다크 · 자동은 서울 일출·일몰 기준';
}
$('#theme-toggle').addEventListener('click',()=>{themeMode={auto:'light',light:'dark',dark:'auto'}[themeMode];try{localStorage.setItem(THEME_KEY,themeMode)}catch{}applyTheme()});
if(typeof window.setInterval==='function'){window.setInterval(applyTheme,60000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)applyTheme()})}
applyTheme();
render();
