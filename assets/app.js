const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function num(v){const n=parseFloat(v);return Number.isFinite(n)?n:0}
function fmt(n,d=2){return Number.isFinite(n)?n.toFixed(d).replace(/\.00$/,""): "—"}
function result(html){const r=$("#result");if(r){r.innerHTML=html;r.classList.remove("hidden")}}
function addCourse(containerId="courses"){const c=$("#"+containerId);if(!c)return;const i=c.children.length+1;const div=document.createElement("div");div.className="course";div.innerHTML=`<input placeholder="Course ${i}"><input type="number" min="0" step=".5" placeholder="Credits" class="credit"><input type="number" min="0" step=".01" placeholder="Grade points" class="points"><button type="button" class="remove" aria-label="Remove course">×</button>`;c.appendChild(div);div.querySelector(".remove").onclick=()=>div.remove()}
function initCourses(){const c=$("#courses");if(!c)return;for(let i=0;i<4;i++)addCourse();$("#addCourse").onclick=()=>addCourse();$("#calcGpa").onclick=()=>{let qp=0,cr=0;$$(".course").forEach(x=>{const c=num(x.querySelector(".credit").value),p=num(x.querySelector(".points").value);cr+=c;qp+=c*p});result(`<span>Semester GPA</span><strong>${cr?fmt(qp/cr):"—"}</strong><span>${cr?`Based on ${fmt(cr,1)} credit hours.`:"Enter credits and grade points."}</span>`)}}
function initTool(){const page=document.body.dataset.tool;if(page==="percentage")$("#calc").onclick=()=>{const rawA=$("#a").value.trim(),rawB=$("#b").value.trim();if(rawA===""||rawB===""){result("<span>Enter both obtained and total marks.</span>");return}const a=Number(rawA),b=Number(rawB);if(!Number.isFinite(a)||!Number.isFinite(b)||a<0||b<=0){result("<span>Enter valid non-negative marks and a total greater than zero.</span>");return}result(`<span>Percentage</span><strong>${fmt(a/b*100)}%</strong><span>Calculation: obtained ÷ total × 100</span>`);};
if(page==="grade")$("#calc").onclick=()=>{const raw=$("#score").value.trim();if(raw===""){result("<span>Enter a score from 0 to 100.</span>");return}const s=Number(raw);if(!Number.isFinite(s)||s<0||s>100){result("<span>Enter a valid score between 0 and 100.</span>");return}const scale=[["A+",90],["A",80],["B",70],["C",60],["D",50],["F",0]];const g=scale.find(x=>s>=x[1])?.[0]||"F";result(`<span>Grade</span><strong>${g}</strong><span>Using the 90/80/70/60/50 scale. Change the scale in your institution if it differs.</span>`)}
if(page==="final")$("#calc").onclick=()=>{const raw=[$("#current").value.trim(),$("#weight").value.trim(),$("#target").value.trim()];if(raw.some(v=>v==="")){result("<span>Enter your current grade, its weight, and your target grade.</span>");return}const [cur,weight,target]=raw.map(Number);if(![cur,weight,target].every(Number.isFinite)||cur<0||cur>100||weight<0||weight>99||target<0||target>100){result("<span>Use grades from 0 to 100 and a current-grade weight from 0 to 99.</span>");return}const exam=100-weight;const need=(target-cur*(weight/100))/(exam/100);result(`<span>Required exam score</span><strong>${fmt(need)}%</strong><span>${need>100?"The target is not mathematically reachable with these weights.":need<0?"You already exceed the target before the exam.":"You need approximately this score on the remaining assessment."}</span>`)}
if(page==="attendance")$("#calc").onclick=()=>{const raw=[$("#attended").value.trim(),$("#held").value.trim(),$("#target").value.trim()];if(raw.some(v=>v==="")){result("<span>Enter classes attended, total classes held, and your target.</span>");return}const [att,held,target]=raw.map(Number);if(![att,held,target].every(Number.isFinite)||!Number.isInteger(att)||!Number.isInteger(held)||held<1||att<0||att>held||target<0||target>100){result("<span>Enter whole class counts, with attended classes no greater than classes held, and a target from 0 to 100.</span>");return}const pct=att/held*100;let message;if(pct>=target)message="You are already at or above your target.";else if(target===100)message="A 100% target cannot be reached after any missed class.";else{const need=Math.ceil((target*held/100-att)/(1-target/100));message=`Attend ${need} consecutive classes (assuming no absences) to reach ${target}%.`}result(`<span>Current attendance</span><strong>${fmt(pct)}%</strong><span>${message}</span>`)}
if(page==="study")$("#calc").onclick=()=>{const hours=num($("#hours").value),subjects=Math.max(1,Math.round(num($("#subjects").value)));const each=hours/subjects;result(`<span>Suggested time per subject</span><strong>${fmt(each)} h</strong><span>That is about ${fmt(each*60,0)} minutes per subject for the available study time.</span>`)}
if(page==="age")$("#calc").onclick=()=>{const d=new Date($("#dob").value),now=new Date();if(isNaN(d)){result("<span>Enter a valid date.</span>");return}let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth(),day=now.getDate()-d.getDate();if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}if(m<0){y--;m+=12}result(`<span>Exact age</span><strong>${y}y ${m}m ${day}d</strong><span>Based on your device's current date.</span>`)}
if(page==="aggregate")$("#calc").onclick=()=>{const vals=[["Component 1",num($("#v1").value),num($("#w1").value)],["Component 2",num($("#v2").value),num($("#w2").value)],["Component 3",num($("#v3").value),num($("#w3").value)],["Component 4",num($("#v4").value),num($("#w4").value)]];const total=vals.reduce((s,x)=>s+x[2],0),score=vals.reduce((s,x)=>s+x[1]*x[2]/100,0);result(`<span>Weighted aggregate</span><strong>${total?fmt(score)+"%":"—"}</strong><span>Weights entered: ${fmt(total,1)}%. For a complete calculation, make the weights total 100%.</span>`)}
if(page==="credits")$("#calc").onclick=()=>{const c=num($("#credits").value),weeks=num($("#weeks").value);result(`<span>Total credit hours</span><strong>${fmt(c,1)}</strong><span>${weeks?`Approximate credits per week: ${fmt(c/weeks,2)}.`:"Add semester weeks if you want a weekly estimate."}</span>`)}
if(page==="tuition")$("#calc").onclick=()=>{const fee=num($("#fee").value),sem=num($("#semesters").value),other=num($("#other").value);result(`<span>Estimated total</span><strong>${fmt(fee*sem+other)}</strong><span>Tuition ${fmt(fee*sem)} + other costs ${fmt(other)}. Enter any currency amount; the calculator does not assume a currency.</span>`)}
if(page==="scholarship")$("#calc").onclick=()=>{const a=num($("#a").value),b=num($("#b").value),c=num($("#c").value);const w=num($("#wa").value),x=num($("#wb").value),y=num($("#wc").value);const total=w+x+y,score=total?(a*w+b*x+c*y)/total:0;result(`<span>Custom scholarship score</span><strong>${fmt(score,2)}/100</strong><span>This is a user-defined scoring model, not an official eligibility decision.</span>`)}
if(page==="weighted")$("#calc").onclick=()=>{const vals=$$(".weightrow");let s=0,w=0;vals.forEach(r=>{const v=num(r.querySelector(".v").value),x=num(r.querySelector(".w").value);s+=v*x;w+=x});result(`<span>Weighted grade</span><strong>${w?fmt(s/w):"—"}%</strong><span>Total weight entered: ${fmt(w,1)}%.</span>`)}
if(page==="marks")$("#calc").onclick=()=>{const values=[...$(".markrow")].map(r=>r.querySelector(".v")?.value.trim()||"").filter(v=>v!=="");if(!values.length){result("<span>Enter at least one assessment mark.</span>");return}const marks=values.map(Number);if(marks.some(v=>!Number.isFinite(v)||v<0)){result("<span>Enter valid non-negative assessment marks.</span>");return}const total=marks.reduce((sum,v)=>sum+v,0),average=total/marks.length;result(`<span>Total / average</span><strong>${fmt(total,2)} / ${fmt(average,2)}</strong><span>Average is based on ${marks.length} completed assessments.</span>`)}
if(page==="countdown")$("#calc").onclick=()=>{const value=$("#date").value;if(!value){result("<span>Choose an exam or deadline date.</span>");return}const d=new Date(value+"T23:59:59");if(Number.isNaN(d.getTime())){result("<span>Enter a valid exam or deadline date.</span>");return}const days=Math.ceil((d-new Date())/86400000);result(`<span>Time remaining</span><strong>${days>=0?days+" days":"Date has passed"}</strong><span>Countdown uses your device's current date and time.</span>`)}
}
document.addEventListener("DOMContentLoaded",()=>{initCourses();initTool();const s=$("#searchTools");if(s)s.oninput=()=>{$$(".tool").forEach(x=>x.style.display=x.dataset.name.includes(s.value.toLowerCase())?"block":"none")}})


// StudentCalcGlobal international tools
async function loadInternationalCountries(){
  const selects = document.querySelectorAll('[data-country-select]');
  if(!selects.length) return;
  try{
    const response = await fetch('/assets/countries.json');
    const data = await response.json();
    selects.forEach(sel=>{
      if(!sel.options.length){
        data.forEach(x=>{
          const o=document.createElement('option');
          o.value=x.country;
          o.textContent=x.country;
          sel.appendChild(o);
        });
      }
      sel.addEventListener('change',()=>showInternationalCountry(data,sel.value));
    });
    window.studentCalcCountryData=data;
    const first = selects[0];
    if(first && first.value) showInternationalCountry(data, first.value);
    renderCountryDirectory(data);
  }catch(e){
    const box=document.querySelector('#countryInfo');
    if(box) box.textContent='Country data could not be loaded. Please refresh the page.';
  }
}
function showInternationalCountry(data,name){
  const x=data.find(v=>v.country===name);
  const box=document.querySelector('#countryInfo');
  if(!box || !x) return;
  box.innerHTML='<strong>'+x.country+'</strong><br>'+x.label+
    '<br><span class="small">Common/default scale: '+x.scale+
    '. Always verify your institution\'s official grading policy.</span>';
  const scale=document.querySelector('#maxScale');
  if(scale && /^[0-9.]+$/.test(String(x.scale))) scale.value=x.scale;
}
function addInternationalCourse(){
  const wrap=document.querySelector('#courses');
  if(!wrap) return;
  const div=document.createElement('div');
  div.className='course';
  div.innerHTML='<input aria-label="Course name" placeholder="Course">'+
    '<input class="grade" type="number" step="0.01" min="0" placeholder="Grade points">'+
    '<input class="credit" type="number" step="0.5" min="0" value="3" placeholder="Credits">'+
    '<button type="button" class="btn alt remove">Remove</button>';
  div.querySelector('.remove').addEventListener('click',()=>div.remove());
  wrap.appendChild(div);
}
function calcInternationalGPA(){
  const grades=[...document.querySelectorAll('#courses .grade')];
  const credits=[...document.querySelectorAll('#courses .credit')];
  let points=0,totalCredits=0;
  grades.forEach((g,i)=>{
    const a=parseFloat(g.value), c=parseFloat(credits[i]?.value);
    if(Number.isFinite(a)&&Number.isFinite(c)&&c>0){points+=a*c; totalCredits+=c;}
  });
  const out=document.querySelector('#gpaResult');
  if(out) out.textContent=totalCredits ? (points/totalCredits).toFixed(2) : 'Enter grades and credits';
}
function convertInternationalScale(){
  const raw=parseFloat(document.querySelector('#rawScore')?.value);
  const max=parseFloat(document.querySelector('#maxScale')?.value);
  const target=parseFloat(document.querySelector('#targetScale')?.value);
  const out=document.querySelector('#convResult');
  if(!out) return;
  if(!Number.isFinite(raw)||!Number.isFinite(max)||!Number.isFinite(target)||max<=0){
    out.textContent='Enter valid values'; return;
  }
  const converted=Math.max(0,Math.min(target,raw/max*target));
  out.textContent=converted.toFixed(2)+' / '+target;
}
function renderCountryDirectory(data){
  const el=document.querySelector('#countryList');
  if(!el) return;
  el.innerHTML='<table><thead><tr><th>Country</th><th>Common/default scale</th><th>Note</th></tr></thead><tbody>'+
    data.map(x=>'<tr><td>'+x.country+'</td><td>'+x.scale+'</td><td>'+x.label+'</td></tr>').join('')+
    '</tbody></table>';
}
document.addEventListener('DOMContentLoaded',()=>{
  loadInternationalCountries();
  const add=document.querySelector('#addCourse');
  if(add){
    add.addEventListener('click',addInternationalCourse);
    const wrap=document.querySelector('#courses');
    if(wrap && !wrap.children.length) for(let i=0;i<3;i++) addInternationalCourse();
  }
  const calc=document.querySelector('#calcBtn');
  if(calc) calc.addEventListener('click',calcInternationalGPA);
  const convert=document.querySelector('#convertBtn');
  if(convert) convert.addEventListener('click',convertInternationalScale);
});
