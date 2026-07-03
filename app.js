const $ = (id) => document.getElementById(id);
const money = (n) => Number(n||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const todayISO = () => new Date().toISOString().slice(0,10);
const parseDate = (d,h='00:00') => new Date(`${d}T${h || '00:00'}:00`);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
let diligencias = JSON.parse(localStorage.getItem('lex_diligencias')||'[]');
let contratantes = JSON.parse(localStorage.getItem('lex_contratantes')||'[]');
if(!contratantes.length){contratantes=[{id:uid(),nome:'Contratante padrão',escritorio:'',whats:'',email:'',obs:''}];save();}
function save(){localStorage.setItem('lex_diligencias',JSON.stringify(diligencias));localStorage.setItem('lex_contratantes',JSON.stringify(contratantes));}
function statusPrazo(d){
 const now = new Date(); now.setHours(0,0,0,0); const dt = parseDate(d.data); dt.setHours(0,0,0,0);
 const diff = Math.round((dt-now)/(1000*60*60*24));
 if(['Concluída','Cancelada'].includes(d.situacao)) return {txt:d.situacao,cls:'success'};
 if(diff<0) return {txt:'Atrasada',cls:'danger'};
 if(diff===0) return {txt:'Hoje',cls:'warning'};
 if(diff===1) return {txt:'Amanhã',cls:'warning'};
 return {txt:`Em ${diff} dias`,cls:''};
}
function nomeContratante(id){return contratantes.find(c=>c.id===id)?.nome || 'Não informado';}
function calendarUrl(d){
 const start = parseDate(d.data,d.hora); const end = new Date(start.getTime()+60*60*1000);
 const fmt = x => x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
 const text = encodeURIComponent(`${d.tipo} - ${nomeContratante(d.contratante)}`);
 const details = encodeURIComponent(`Processo: ${d.processo||''}\nVara: ${d.vara||''}\nComarca: ${d.comarca||''}\nObservações: ${d.obs||''}`);
 const location = encodeURIComponent(d.local||d.comarca||'');
 return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(start)}/${fmt(end)}&details=${details}&location=${location}`;
}
function mapsUrl(local){return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local||'')}`;}
function whatsUrl(c){const n=(c?.whats||'').replace(/\D/g,''); return n ? `https://wa.me/55${n.replace(/^55/,'')}` : '#';}
function switchScreen(id){document.querySelectorAll('.screen,.nav').forEach(e=>e.classList.remove('active'));$(id).classList.add('active');document.querySelector(`[data-screen="${id}"]`).classList.add('active');$('pageTitle').textContent=document.querySelector(`[data-screen="${id}"]`).textContent;render();}
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>switchScreen(b.dataset.screen));$('quickNew').onclick=()=>switchScreen('diligencias');
function renderContratanteSelect(){const sel=$('contratante');sel.innerHTML=contratantes.map(c=>`<option value="${c.id}">${c.nome}</option>`).join('');}
function itemActions(d){const c=contratantes.find(x=>x.id===d.contratante)||{};return `<div class="actions"><a target="_blank" href="${calendarUrl(d)}">Google Agenda</a><a target="_blank" href="${mapsUrl(d.local)}">Rota</a><a target="_blank" href="${whatsUrl(c)}">WhatsApp</a><button onclick="editDil('${d.id}')">Editar</button><button onclick="delDil('${d.id}')">Excluir</button></div>`}
function renderDashboard(){
 const t=todayISO(); const tomorrow=new Date(); tomorrow.setDate(tomorrow.getDate()+1); const am=tomorrow.toISOString().slice(0,10);
 $('kpiHoje').textContent=diligencias.filter(d=>d.data===t&&!['Concluída','Cancelada'].includes(d.situacao)).length;
 $('kpiAmanha').textContent=diligencias.filter(d=>d.data===am&&!['Concluída','Cancelada'].includes(d.situacao)).length;
 $('kpiAtrasadas').textContent=diligencias.filter(d=>statusPrazo(d).txt==='Atrasada').length;
 const month=new Date().toISOString().slice(0,7);
 $('kpiRecebido').textContent=money(diligencias.filter(d=>(d.dataRecebimento||d.data||'').slice(0,7)===month).reduce((s,d)=>s+Number(d.recebido||0),0));
 $('kpiReceber').textContent=money(diligencias.reduce((s,d)=>s+Math.max(0,Number(d.valor||0)-Number(d.recebido||0)),0));
 const prox=diligencias.filter(d=>!['Concluída','Cancelada'].includes(d.situacao)).sort((a,b)=>parseDate(a.data,a.hora)-parseDate(b.data,b.hora)).slice(0,6);
 $('proximas').innerHTML=prox.length?prox.map(d=>{const st=statusPrazo(d);return `<div class="item"><div><strong>${d.data} às ${d.hora} — ${d.tipo}</strong><small>${nomeContratante(d.contratante)} • ${d.comarca||''} • ${d.processo||''}</small><span class="badge ${st.cls}">${st.txt}</span></div>${itemActions(d)}</div>`}).join(''):'<p>Nenhuma diligência pendente cadastrada.</p>';
 const next=prox[0]; $('proximaDestaque').innerHTML=next?`<h2>${next.tipo}</h2><p><strong>${next.data} às ${next.hora}</strong></p><p>${nomeContratante(next.contratante)}<br>${next.local||next.comarca||''}</p>${itemActions(next)}`:'<p>Sem próximas diligências.</p>';
}
function renderDiligencias(){
 const q=($('buscaDiligencia')?.value||'').toLowerCase();
 const rows=diligencias.filter(d=>JSON.stringify(d).toLowerCase().includes(q)).sort((a,b)=>parseDate(a.data,a.hora)-parseDate(b.data,b.hora));
 $('tbodyDiligencias').innerHTML=rows.map(d=>{const st=statusPrazo(d);return `<tr><td>${d.data}<br><small>${d.hora}</small></td><td>${d.tipo}<br><span class="badge ${st.cls}">${st.txt}</span></td><td>${nomeContratante(d.contratante)}</td><td>${d.processo||'-'}</td><td>${d.situacao}</td><td>${money(d.valor)}</td><td>${itemActions(d)}</td></tr>`}).join('');
}
function renderAgenda(){
 const rows=[...diligencias].sort((a,b)=>parseDate(a.data,a.hora)-parseDate(b.data,b.hora));
 $('agendaList').innerHTML=rows.map(d=>{const st=statusPrazo(d);return `<div class="item"><div><strong>${d.data} às ${d.hora} — ${d.tipo}</strong><small>${nomeContratante(d.contratante)} • ${d.local||d.comarca||''}</small><span class="badge ${st.cls}">${st.txt}</span></div>${itemActions(d)}</div>`}).join('')||'<p>Nenhuma diligência na agenda.</p>';
}
function renderContratantes(){
 $('listaContratantes').innerHTML=contratantes.map(c=>{const ds=diligencias.filter(d=>d.contratante===c.id);const total=ds.reduce((s,d)=>s+Number(d.valor||0),0);return `<div class="item"><div><strong>${c.nome}</strong><small>${c.escritorio||''} • ${c.email||''} • ${c.whats||''}</small><span class="badge">${ds.length} diligência(s)</span> <span class="badge success">${money(total)}</span></div><div class="actions"><a target="_blank" href="${whatsUrl(c)}">WhatsApp</a><button onclick="editContratante('${c.id}')">Editar</button><button onclick="delContratante('${c.id}')">Excluir</button></div></div>`}).join('');
 renderContratanteSelect();
}
function renderFinanceiro(){
 const contratado=diligencias.reduce((s,d)=>s+Number(d.valor||0),0), recebido=diligencias.reduce((s,d)=>s+Number(d.recebido||0),0);
 $('finContratado').textContent=money(contratado); $('finRecebido').textContent=money(recebido); $('finPendente').textContent=money(contratado-recebido);
 $('tbodyFinanceiro').innerHTML=diligencias.map(d=>`<tr><td>${d.tipo}<br><small>${d.data}</small></td><td>${nomeContratante(d.contratante)}</td><td>${money(d.valor)}</td><td>${money(d.recebido)}</td><td>${money(Math.max(0,Number(d.valor||0)-Number(d.recebido||0)))}</td></tr>`).join('');
}
function renderRelatorios(){
 const porTipo={}; diligencias.forEach(d=>porTipo[d.tipo]=(porTipo[d.tipo]||0)+1);
 const porContr={}; diligencias.forEach(d=>porContr[nomeContratante(d.contratante)]=(porContr[nomeContratante(d.contratante)]||0)+Number(d.valor||0));
 $('relatorioConteudo').innerHTML=`<h3>Diligências por tipo</h3>${Object.entries(porTipo).map(([k,v])=>`<p><strong>${k}:</strong> ${v}</p>`).join('')||'<p>Sem dados.</p>'}<h3>Faturamento por contratante</h3>${Object.entries(porContr).map(([k,v])=>`<p><strong>${k}:</strong> ${money(v)}</p>`).join('')||'<p>Sem dados.</p>'}`;
}
function render(){renderContratanteSelect();renderDashboard();renderDiligencias();renderAgenda();renderContratantes();renderFinanceiro();renderRelatorios();}
$('formDiligencia').onsubmit=e=>{e.preventDefault();const id=$('editId').value||uid();const obj={id,contratante:$('contratante').value,tipo:$('tipo').value,processo:$('processo').value,tribunal:$('tribunal').value,vara:$('vara').value,comarca:$('comarca').value,data:$('data').value,hora:$('hora').value,local:$('local').value,prioridade:$('prioridade').value,situacao:$('situacao').value,valor:$('valor').value,recebido:$('recebido').value,pagamento:$('pagamento').value,prevRecebimento:$('prevRecebimento').value,dataRecebimento:$('dataRecebimento').value,obs:$('obs').value};const i=diligencias.findIndex(d=>d.id===id); if(i>=0)diligencias[i]=obj; else diligencias.push(obj);save();e.target.reset();$('editId').value='';render();alert('Diligência salva com sucesso. Use o botão Google Agenda para criar o lembrete no celular.');};
window.editDil=id=>{const d=diligencias.find(x=>x.id===id); if(!d)return; Object.entries(d).forEach(([k,v])=>{if($(k))$(k).value=v});$('editId').value=id;switchScreen('diligencias');window.scrollTo(0,0)};
window.delDil=id=>{if(confirm('Excluir esta diligência?')){diligencias=diligencias.filter(d=>d.id!==id);save();render();}};
$('clearForm').onclick=()=>{$('formDiligencia').reset();$('editId').value=''};
$('buscaDiligencia').oninput=renderDiligencias;
$('formContratante').onsubmit=e=>{e.preventDefault();const id=$('contratanteEditId').value||uid();const obj={id,nome:$('cNome').value,escritorio:$('cEscritorio').value,whats:$('cWhats').value,email:$('cEmail').value,obs:$('cObs').value};const i=contratantes.findIndex(c=>c.id===id); if(i>=0)contratantes[i]=obj; else contratantes.push(obj);save();e.target.reset();$('contratanteEditId').value='';render();};
window.editContratante=id=>{const c=contratantes.find(x=>x.id===id); if(!c)return; $('contratanteEditId').value=id;$('cNome').value=c.nome;$('cEscritorio').value=c.escritorio;$('cWhats').value=c.whats;$('cEmail').value=c.email;$('cObs').value=c.obs;};
window.delContratante=id=>{if(confirm('Excluir contratante? As diligências continuarão salvas, mas sem vínculo correto.')){contratantes=contratantes.filter(c=>c.id!==id);save();render();}};
$('limparTudo').onclick=()=>{if(confirm('Apagar todos os dados locais?')){localStorage.clear();location.reload();}};
$('exportCsv').onclick=()=>{const cols=['data','hora','tipo','contratante','processo','tribunal','vara','comarca','local','situacao','valor','recebido'];const csv=[cols.join(';'),...diligencias.map(d=>cols.map(c=>`"${(c==='contratante'?nomeContratante(d.contratante):d[c]||'').toString().replace(/"/g,'""')}"`).join(';'))].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='lexcontrol-diligencias.csv';a.click();};
render();
