/* Touch-first IDP sample. The coach chooses; the interface writes the short plan. */
const IDP_CATEGORIES = [
  {id:'technical',label:'기술',icon:'⚽',items:[['first_touch','퍼스트터치'],['dribble','드리블'],['one_vs_one','1:1'],['pass','패스'],['shooting','슈팅'],['weak_foot','약발'],['ball_protect','볼 지키기'],['cross','크로스']]},
  {id:'decision',label:'경기 판단',icon:'◉',items:[['scan','주변 보기'],['decision_speed','판단 빠르게'],['positioning','자리 잡기'],['space','빈 공간 찾기'],['off_ball','공 없을 때 움직임'],['def_transition','수비 전환'],['att_transition','공격 전환']]},
  {id:'movement',label:'움직임',icon:'↗',items:[['acceleration','빠르게 출발'],['max_speed','최고속도'],['deceleration','멈추기'],['change_direction','방향 바꾸기'],['agility','민첩성'],['jump','점프'],['balance','균형'],['coordination','움직임 연결']]},
  {id:'mental',label:'멘탈',icon:'◇',items:[['confidence','자신감'],['focus','집중'],['challenge','도전하기'],['reset','실수 후 회복'],['tension','긴장 줄이기'],['expression','자기표현'],['routine','경기 준비'],['emotion','감정 조절']]},
  {id:'body',label:'몸 관리',icon:'＋',items:[['fatigue','피로 관리'],['recovery','회복'],['pain','통증 체크'],['symmetry','좌우 균형'],['landing','착지'],['core','몸통 안정'],['load','훈련량 관리']]},
  {id:'habit',label:'습관',icon:'○',items:[['sleep','수면'],['food','식사'],['water','물 마시기'],['stretch','스트레칭'],['personal_training','개인훈련'],['match_prep','경기 준비'],['post_training','훈련 후 정리']]}
];
const IDP_RECOMMENDED = {
  '급성장 전':['balance','coordination','confidence','first_touch','challenge','scan'],
  '가속기':['landing','deceleration','change_direction','fatigue','coordination','recovery'],
  '최고성장기':['balance','coordination','deceleration','landing','recovery','fatigue'],
  '감속기':['symmetry','change_direction','first_touch','acceleration','core','scan'],
  '종료 초기':['acceleration','max_speed','change_direction','first_touch','load','personal_training'],
  '성인':['positioning','max_speed','load','recovery','personal_training','sleep'],
  '검사 전':['balance','first_touch','confidence','scan','sleep','recovery']
};
const IDP_CONTEXTS = {
  technical:['압박 받을 때','앞으로 나갈 때','빠른 상황','경기 중'],
  decision:['공 받기 전','공 없을 때','전환할 때','경기 중'],
  movement:['출발할 때','멈출 때','방향 바꿀 때','훈련 중'],
  mental:['실수했을 때','경기 전','경기 중','훈련 중'],
  body:['훈련 중','훈련 후','경기 후','쉬는 날'],
  habit:['훈련 전','훈련 후','매일','경기 전']
};
const IDP_LEVELS=[['strong','잘함'],['normal','보통'],['needs_work','조금 부족'],['priority','많이 부족']];
const IDP_INTENSITIES=[['maintain','유지'],['improve','개선'],['focus','집중']];
const IDP_CHECKS=[['good','좋았음'],['same','보통'],['needs_work','더 필요']];
const IDP_CONDITIONS=[['good','좋음'],['normal','보통'],['tired','피곤함']];
const idpUi={playerId:null,mode:'home',category:null,draft:null,step:0,checkValues:{},condition:'normal',message:''};
const idpFind=id=>{for(const cat of IDP_CATEGORIES){const item=cat.items.find(x=>x[0]===id);if(item)return{id:item[0],label:item[1],category:cat.id}}return null};
const idpLabel=(options,value)=>options.find(x=>x[0]===value)?.[1]||'—';
const idpDate=date=>date?date.replaceAll('-','.'):'—';
const idpEnd=date=>{const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+56);return d.toISOString().slice(0,10)};
function idpSummary(item){const verb=item.intensity==='focus'?'집중해서 봅니다.':item.intensity==='maintain'?'계속 지켜봅니다.':'더 살펴봅니다.';const last=item.label.charCodeAt(item.label.length-1);const particle=last>=0xAC00&&last<=0xD7A3&&(last-0xAC00)%28?'을':'를';return `${item.context} ${item.label}${particle} ${verb}`}
function idpButton(value,label,chosen,attr){return `<button type="button" ${attr}="${esc(value)}" class="idp-choice ${chosen?'active':''}" aria-pressed="${chosen}">${chosen?'✓ ':''}${esc(label)}</button>`}
function idpTop(p,title,subtitle){return `<div class="idp-top"><div><span class="eyebrow">MPS BIO-BANDING · IDP SPACE</span><h3>${esc(title)}</h3><p>${esc(subtitle)}</p></div><span class="idp-stage">${esc(getStage(p))}</span></div>`}
function idpMpsCheck(p){const physical=physicalPlan(p),mental=mentalResult(p);return `<section class="idp-mps"><div class="idp-section-title"><span>MPS가 같이 볼 것</span><small>검사 결과 참고</small></div><div class="idp-mps-lines"><p><b>성장</b>${esc(getStage(p))}</p><p><b>몸</b>${esc(physical?.focus?.join(' · ')||'결과 대기')}</p><p><b>멘탈</b>${esc(mental?.needs?.join(' · ')||'결과 대기')}</p></div></section>`}
function idpHome(p){const idp=p.idp;if(!idp?.priorities?.length)return `${idpTop(p,'이번 IDP를 만들어 볼까요?','글을 쓰지 않고, 볼 목표를 터치로 고릅니다.')}<div class="idp-empty"><strong>목표는 최대 3개</strong><span>성장단계에 맞는 추천부터 볼 수 있습니다.</span><button type="button" class="button primary" data-idp-action="start">목표 고르기</button></div>${idpMpsCheck(p)}`;
  const cards=idp.priorities.map((item,i)=>`<div class="idp-priority"><span>${i+1}</span><div><strong>${esc(item.label)}</strong><small>${esc(item.context)} · ${esc(idpLabel(IDP_INTENSITIES,item.intensity))}</small><p>${esc(item.summary||idpSummary(item))}</p></div></div>`).join('');
  const recent=idp.checks?.at(-1);return `${idpTop(p,'이번 IDP',`${idpDate(idp.startDate)} ~ ${idpDate(idp.endDate)}`)}<div class="idp-priorities">${cards}</div><div class="idp-main-actions"><button type="button" class="button primary" data-idp-action="check">오늘 체크</button><button type="button" class="button soft" data-idp-action="start">IDP 바꾸기</button></div>${recent?`<p class="idp-last">마지막 체크 ${esc(idpDate(recent.date))} · ${idp.priorities.length}개 목표</p>`:''}${idpMpsCheck(p)}<button type="button" class="idp-history-link" data-idp-action="history">최근 변화 보기 →</button>`}
function idpChoose(p){const draft=idpUi.draft;const suggested=IDP_RECOMMENDED[getStage(p)]||IDP_RECOMMENDED['검사 전'];const items=idpUi.category?IDP_CATEGORIES.find(x=>x.id===idpUi.category)?.items.map(x=>x[0])||[]:suggested;
  const itemButtons=items.map(id=>{const item=idpFind(id);return item?idpButton(id,`${suggested.includes(id)?'★ ':''}${item.label}`,draft.priorities.some(x=>x.id===id),'data-idp-item'):''}).join('');
  return `${idpTop(p,'무엇을 키울까요?','최대 3개까지 고르세요. 글은 나중에 자동으로 정리됩니다.')}<div class="idp-progress">1 / 2 · 목표 선택 <b>${draft.priorities.length}/3</b></div><div class="idp-picked">${draft.priorities.length?draft.priorities.map((x,i)=>`<span>${i+1}. ${esc(x.label)}</span>`).join(''):'목표를 터치해 주세요.'}</div><div class="idp-categories"><button type="button" data-idp-category="recommended" class="${!idpUi.category?'active':''}">★ 추천</button>${IDP_CATEGORIES.map(c=>`<button type="button" data-idp-category="${c.id}" class="${idpUi.category===c.id?'active':''}">${c.icon} ${c.label}</button>`).join('')}</div><div class="idp-item-grid">${itemButtons}</div><p class="idp-message" role="status">${esc(idpUi.message)}</p><div class="idp-bottom-actions"><button type="button" class="button soft" data-idp-action="home">취소</button><button type="button" class="button primary" data-idp-action="next" ${draft.priorities.length?'':'disabled'}>다음 · 간단 설정</button></div>`}
function idpDetail(p){const items=idpUi.draft.priorities,item=items[idpUi.step],contexts=IDP_CONTEXTS[item.category]||IDP_CONTEXTS.technical;
  const row=(label,options,field)=>`<div class="idp-question"><strong>${label}</strong><div class="idp-options">${options.map(([value,text])=>idpButton(value,text,item[field]===value,'data-idp-'+field)).join('')}</div></div>`;
  return `${idpTop(p,`${idpUi.step+1}. ${item.label}`,'버튼만 눌러 이 목표를 정리하세요.')}<div class="idp-progress">2 / 2 · 목표 설정 <b>${idpUi.step+1}/${items.length}</b></div>${row('지금 어떤가요?',IDP_LEVELS,'status')}${row('얼마나 볼까요?',IDP_INTENSITIES,'intensity')}${row('언제 볼까요?',contexts.map(x=>[x,x]),'context')}<div class="idp-generated"><small>자동으로 정리한 문장</small><p>${esc(idpSummary(item))}</p></div><div class="idp-bottom-actions"><button type="button" class="button soft" data-idp-action="back">이전</button><button type="button" class="button primary" data-idp-action="next-detail">${idpUi.step===items.length-1?'IDP 저장':'다음 목표'}</button></div>`}
function idpCheck(p){const idp=p.idp;if(!idp?.priorities?.length)return idpHome(p);return `${idpTop(p,'오늘 체크','목표마다 하나씩 누르면 끝납니다.')}<div class="idp-check-list">${idp.priorities.map(item=>`<div class="idp-check-row"><strong>${esc(item.label)}</strong><div>${IDP_CHECKS.map(([value,label])=>idpButton(value,label,idpUi.checkValues[item.id]===value,`data-idp-check="${esc(item.id)}" data-idp-value`)).join('')}</div></div>`).join('')}</div><div class="idp-check-row condition"><strong>오늘 몸 상태</strong><div>${IDP_CONDITIONS.map(([value,label])=>idpButton(value,label,idpUi.condition===value,'data-idp-condition')).join('')}</div></div><p class="idp-message" role="status">${esc(idpUi.message)}</p><div class="idp-bottom-actions"><button type="button" class="button soft" data-idp-action="home">취소</button><button type="button" class="button primary" data-idp-action="save-check" ${idp.priorities.every(item=>idpUi.checkValues[item.id])?'':'disabled'}>오늘 체크 저장</button></div>`}
function idpHistory(p){const idp=p.idp,recent=(idp?.checks||[]).slice(-8);if(!idp?.priorities?.length)return idpHome(p);return `${idpTop(p,'최근 변화',`최근 ${recent.length}회 체크`)}<div class="idp-trends">${idp.priorities.map(item=>{const counts={good:0,same:0,needs_work:0};for(const check of recent)if(counts[check.values?.[item.id]]!==undefined)counts[check.values[item.id]]++;const latest=recent.at(-1)?.values?.[item.id];return `<div><strong>${esc(item.label)}</strong><p>좋았음 ${counts.good}회 · 보통 ${counts.same}회 · 더 필요 ${counts.needs_work}회</p><small>${latest==='good'?'최근 좋았음':latest==='needs_work'?'계속 보기':'꾸준히 보기'}</small></div>`}).join('')}</div><button type="button" class="button soft idp-return" data-idp-action="home">이번 IDP로 돌아가기</button>`}
function idpRender(p){if(!p)return;if(idpUi.playerId!==p.id){idpUi.playerId=p.id;idpUi.mode='home';idpUi.draft=null;idpUi.checkValues={};idpUi.category=null;idpUi.message=''}const view=document.querySelector('#idp-view');if(!view)return;view.innerHTML=idpUi.mode==='choose'?idpChoose(p):idpUi.mode==='detail'&&idpUi.draft?.priorities.length?idpDetail(p):idpUi.mode==='check'?idpCheck(p):idpUi.mode==='history'?idpHistory(p):idpHome(p)}
window.mpsIdpRender=idpRender;
document.querySelector('#detail').addEventListener('click',event=>{const target=event.target.closest('[data-idp-action],[data-idp-category],[data-idp-item],[data-idp-status],[data-idp-intensity],[data-idp-context],[data-idp-check],[data-idp-condition]');if(!target)return;const p=players.find(x=>x.id===selected);if(!p)return;
  if(target.dataset.idpCategory){idpUi.category=target.dataset.idpCategory==='recommended'?null:target.dataset.idpCategory;idpUi.message='';idpRender(p);return}
  if(target.dataset.idpItem){const item=idpFind(target.dataset.idpItem),list=idpUi.draft.priorities,index=list.findIndex(x=>x.id===item.id);if(index>=0)list.splice(index,1);else if(list.length<3)list.push({...item,status:'normal',intensity:'improve',context:IDP_CONTEXTS[item.category][0]});else idpUi.message='목표는 3개까지만 고를 수 있어요.';idpRender(p);return}
  for(const field of ['status','intensity','context'])if(target.dataset[`idp${field[0].toUpperCase()}${field.slice(1)}`]){idpUi.draft.priorities[idpUi.step][field]=target.dataset[`idp${field[0].toUpperCase()}${field.slice(1)}`];idpRender(p);return}
  if(target.dataset.idpCheck){idpUi.checkValues[target.dataset.idpCheck]=target.dataset.idpValue;idpRender(p);return}
  if(target.dataset.idpCondition){idpUi.condition=target.dataset.idpCondition;idpRender(p);return}
  const action=target.dataset.idpAction;if(!action)return;
  if(action==='home'){idpUi.mode='home';idpUi.message=''}
  if(action==='start'){idpUi.mode='choose';idpUi.category=null;idpUi.message='';idpUi.draft={priorities:copy(p.idp?.priorities||[])};idpUi.step=0}
  if(action==='next'&&idpUi.draft.priorities.length){idpUi.mode='detail';idpUi.step=0}
  if(action==='back'){if(idpUi.step>0)idpUi.step--;else idpUi.mode='choose'}
  if(action==='next-detail'){if(idpUi.step<idpUi.draft.priorities.length-1)idpUi.step++;else{const today=localDate();if(p.idp?.priorities?.length)(p.idpHistory??=[]).push(copy(p.idp));p.idp={startDate:today,endDate:idpEnd(today),priorities:idpUi.draft.priorities.map(item=>({...item,summary:idpSummary(item)})),checks:[]};save();idpUi.mode='home';idpUi.draft=null}}
  if(action==='check'){idpUi.mode='check';idpUi.checkValues={};idpUi.condition='normal';idpUi.message=''}
  if(action==='save-check'){if(p.idp?.priorities?.every(item=>idpUi.checkValues[item.id])){(p.idp.checks??=[]).push({date:localDate(),values:{...idpUi.checkValues},condition:idpUi.condition});save();idpUi.mode='home';idpUi.message=''}else idpUi.message='모든 목표를 체크해 주세요.'}
  if(action==='history')idpUi.mode='history';
  if(action==='next-detail'&&!idpUi.draft)renderRoster(visiblePlayers());
  idpRender(p)
});
idpRender(players.find(x=>x.id===selected));
