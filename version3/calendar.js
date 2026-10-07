const BOOKING_KEY = 'mps-centers2-bookings-v1';
const PLAYER_KEY = 'mps-centers2-demo-v6';
const calendarDialog = document.querySelector('#calendar-dialog');
const bookingForm = document.querySelector('#booking-form');
const todaySeoul = () => new Intl.DateTimeFormat('sv-SE', {timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function addDays(date, count){const d=new Date(`${date}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+count);return d.toISOString().slice(0,10)}
const sampleBookings = () => [
  {id:'sample-1',playerId:'demo-1',date:addDays(todaySeoul(),1),time:'16:00',type:'레슨',memo:'첫 터치 관찰'},
  {id:'sample-2',playerId:'demo-2',date:addDays(todaySeoul(),3),time:'17:30',type:'상담',memo:'다음 목표 점검'}
];
function readBookings(){try{const data=JSON.parse(localStorage.getItem(BOOKING_KEY));return Array.isArray(data)?data:sampleBookings()}catch{return sampleBookings()}}
function saveBookings(){try{localStorage.setItem(BOOKING_KEY,JSON.stringify(bookings))}catch{alert('예약을 브라우저에 저장하지 못했습니다.')}}
function readPlayers(){try{const data=JSON.parse(localStorage.getItem(PLAYER_KEY));return Array.isArray(data)?data:initialPlayers}catch{return initialPlayers}}
const escapeCalendar = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let calendarPlayerId='';let returnPlayerId=null;
let bookings=readBookings();let selectedDate=todaySeoul();let viewMonth=selectedDate.slice(0,7);
function playerName(id){return readPlayers().find(p=>p.id===id)?.name||'삭제된 선수'}
function googleCalendarUrl(booking){
  const [hour,minute]=booking.time.split(':').map(Number),endMinutes=hour*60+minute+60;
  const endDate=addDays(booking.date,Math.floor(endMinutes/1440));
  const endTime=`${String(Math.floor(endMinutes%1440/60)).padStart(2,'0')}${String(endMinutes%60).padStart(2,'0')}00`;
  const start=`${booking.date.replaceAll('-','')}T${booking.time.replace(':','')}00`;
  const end=`${endDate.replaceAll('-','')}T${endTime}`;
  const url=new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action','TEMPLATE');url.searchParams.set('text',`MPS ${booking.type} · ${playerName(booking.playerId)}`);
  url.searchParams.set('dates',`${start}/${end}`);url.searchParams.set('ctz','Asia/Seoul');
  url.searchParams.set('details','MPS Center 예약 샘플');
  return url.toString();
}
function renderPlayerOptions(selected=''){
  const players=readPlayers();
  document.querySelector('#booking-player').innerHTML='<option value="">선수 선택</option>'+players.map(p=>`<option value="${escapeCalendar(p.id)}" ${p.id===selected?'selected':''}>${escapeCalendar(p.name)} · ${escapeCalendar(p.group||'반 미정')}</option>`).join('');
}
function clearBookingForm(){bookingForm.reset();bookingForm.elements.bookingId.value='';bookingForm.elements.date.value=selectedDate;bookingForm.elements.time.value='16:00';document.querySelector('#booking-submit').textContent='예약 추가';document.querySelector('#booking-cancel').hidden=true;renderPlayerOptions(calendarPlayerId);bookingForm.elements.playerId.value=calendarPlayerId}
function renderCalendar(){
  const [year,month]=viewMonth.split('-').map(Number);
  document.querySelector('#month-label').textContent=`${year}년 ${month}월`;
  document.querySelector('#selected-date-label').textContent=`${selectedDate.replaceAll('-','.')} 예약`;
  const first=new Date(Date.UTC(year,month-1,1)).getUTCDay();
  const days=new Date(Date.UTC(year,month,0)).getUTCDate();
  const counts=new Map();for(const b of bookings)counts.set(b.date,(counts.get(b.date)||0)+1);
  let html=Array.from({length:first},()=>'<span class="blank" aria-hidden="true"></span>').join('');
  for(let day=1;day<=days;day++){
    const date=`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const count=counts.get(date)||0;
    html+=`<button type="button" data-date="${date}" class="${date===selectedDate?'selected ':''}${date===todaySeoul()?'today ':''}${count?'has-bookings':''}" aria-label="${month}월 ${day}일, 예약 ${count}건" aria-pressed="${date===selectedDate}">${day}${count?`<small>${count}건</small>`:''}</button>`;
  }
  document.querySelector('#day-grid').innerHTML=html;
  const dayBookings=bookings.filter(b=>b.date===selectedDate).sort((a,b)=>a.time.localeCompare(b.time));
  document.querySelector('#booking-list').innerHTML=dayBookings.length?dayBookings.map(b=>`<div class="booking-row"><div><b>${escapeCalendar(b.time)} · ${escapeCalendar(playerName(b.playerId))}</b><span> ${escapeCalendar(b.type)}</span></div><div><button type="button" data-edit="${escapeCalendar(b.id)}" aria-label="예약 수정">수정</button><button type="button" data-delete="${escapeCalendar(b.id)}" aria-label="예약 삭제">삭제</button></div>${b.memo?`<small>${escapeCalendar(b.memo)}</small>`:''}<a class="google-event" href="${escapeCalendar(googleCalendarUrl(b))}" target="_blank" rel="noopener noreferrer">Google에 추가 ↗</a></div>`).join(''):'<p class="empty">이날 예약이 없습니다.</p>';
  document.querySelector('#upcoming-count').textContent=bookings.filter(b=>b.date>=todaySeoul()).length;
}
document.querySelector('#calendar-open').addEventListener('click',()=>{calendarPlayerId='';returnPlayerId=null;selectedDate=todaySeoul();viewMonth=selectedDate.slice(0,7);clearBookingForm();renderCalendar();calendarDialog.showModal()});
window.mpsCalendarOpenForPlayer = playerId => {calendarPlayerId=playerId;returnPlayerId=playerId;selectedDate=todaySeoul();viewMonth=selectedDate.slice(0,7);clearBookingForm();bookingForm.elements.playerId.value=playerId;renderCalendar();calendarDialog.showModal()};
document.querySelector('#calendar-close').addEventListener('click',()=>calendarDialog.close());
calendarDialog.addEventListener('click',event=>{if(event.target===calendarDialog)calendarDialog.close()});
calendarDialog.addEventListener('close',()=>{const playerId=returnPlayerId;returnPlayerId=null;if(playerId)window.mpsReturnToPlayer?.(playerId)});
document.querySelector('#booking-player').addEventListener('change',event=>{calendarPlayerId=event.target.value});
function moveMonth(delta){const [y,m]=viewMonth.split('-').map(Number);const d=new Date(Date.UTC(y,m-1+delta,1));viewMonth=d.toISOString().slice(0,7);selectedDate=`${viewMonth}-01`;clearBookingForm();renderCalendar()}
document.querySelector('#month-prev').addEventListener('click',()=>moveMonth(-1));
document.querySelector('#month-next').addEventListener('click',()=>moveMonth(1));
document.querySelector('#day-grid').addEventListener('click',e=>{const day=e.target.closest('[data-date]');if(!day)return;selectedDate=day.dataset.date;clearBookingForm();renderCalendar()});
document.querySelector('#booking-list').addEventListener('click',e=>{
  const edit=e.target.closest('[data-edit]');const remove=e.target.closest('[data-delete]');
  if(edit){const b=bookings.find(x=>x.id===edit.dataset.edit);if(!b)return;renderPlayerOptions(b.playerId);bookingForm.elements.bookingId.value=b.id;bookingForm.elements.playerId.value=b.playerId;bookingForm.elements.date.value=b.date;bookingForm.elements.time.value=b.time;bookingForm.elements.type.value=b.type;bookingForm.elements.memo.value=b.memo;document.querySelector('#booking-submit').textContent='수정 저장';document.querySelector('#booking-cancel').hidden=false;bookingForm.elements.playerId.focus()}
  if(remove){const b=bookings.find(x=>x.id===remove.dataset.delete);if(b&&confirm(`${b.date} ${b.time} 예약을 삭제할까요?`)){bookings=bookings.filter(x=>x.id!==b.id);saveBookings();clearBookingForm();renderCalendar()}}
});
document.querySelector('#booking-cancel').addEventListener('click',clearBookingForm);
bookingForm.addEventListener('submit',e=>{
  e.preventDefault();const data=new FormData(bookingForm);const playerId=String(data.get('playerId')||'');const date=String(data.get('date')||'');const time=String(data.get('time')||'');
  if(!readPlayers().some(p=>p.id===playerId)||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time)){alert('선수, 날짜, 시간을 확인해 주세요.');return}
  const booking={id:String(data.get('bookingId')||`booking-${Date.now()}`),playerId,date,time,type:String(data.get('type')||'레슨'),memo:String(data.get('memo')||'').trim().slice(0,100)};
  const index=bookings.findIndex(x=>x.id===booking.id);if(index>=0)bookings[index]=booking;else bookings.push(booking);
  saveBookings();calendarPlayerId=playerId;selectedDate=date;viewMonth=date.slice(0,7);clearBookingForm();renderCalendar();
});
window.addEventListener('mps-demo-reset',()=>{bookings=sampleBookings();saveBookings();renderCalendar()});
window.addEventListener('mps-player-deleted',e=>{bookings=bookings.filter(b=>b.playerId!==e.detail.id);saveBookings();renderCalendar()});
renderCalendar();
