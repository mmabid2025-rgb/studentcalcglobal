const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function num(v){const n=parseFloat(v);return Number.isFinite(n)?n:0}
function readNum(selector){const el=$(selector);if(!el||String(el.value).trim()==="")return null;const n=Number(el.value);return Number.isFinite(n)?n:null}
function inputError(message){result(`<span role="alert">${message}</span>`)}
function fmt(n,d=2){return Number.isFinite(n)?n.toFixed(d).replace(/\.00$/,""): "—"}
function result(html){const r=$("#result");if(r){r.innerHTML=html;r.classList.remove("hidden")}}
function addCourse(containerId="courses"){const c=$("#"+containerId);if(!c)return;const i=c.children.length+1;const div=document.createElement("div");div.className="course";div.innerHTML=`<input aria-label="Course ${i} name" placeholder="Course ${i}"><input aria-label="Course ${i} credits" type="number" min="0" step=".5" placeholder="Credits" class="credit"><input aria-label="Course ${i} grade points" type="number" min="0" step=".01" placeholder="Grade points" class="points"><button type="button" class="remove" aria-label="Remove course">×</button>`;c.appendChild(div);div.querySelector(".remove").onclick=()=>div.remove()}
function initCourses(){
  const c=$("#courses");
  if(!c)return;
  for(let i=0;i<4;i++)addCourse();
  const add=$("#addCourse"),calc=$("#calcGpa");
  if(add)add.onclick=()=>addCourse();
  if(calc)calc.onclick=()=>{
    let weighted=0,totalCredits=0,used=0;
    for(const [i,row] of Array.from(c.querySelectorAll(".course")).entries()){
      const credit=row.querySelector(".credit"),points=row.querySelector(".points");
      const creditRaw=credit?.value.trim()||"",pointsRaw=points?.value.trim()||"";
      if(!creditRaw&&!pointsRaw)continue;
      if(!creditRaw||!pointsRaw){inputError("Course "+(i+1)+": enter both credits and grade points, or leave both blank.");return;}
      const cr=Number(creditRaw),gp=Number(pointsRaw);
      if(!Number.isFinite(cr)||cr<=0||!Number.isFinite(gp)||gp<0){inputError("Course "+(i+1)+": credits must be greater than zero and grade points cannot be negative.");return;}
      weighted+=gp*cr;totalCredits+=cr;used++;
    }
    if(!used){inputError("Enter at least one course with grade points and credit hours.");return;}
    result(`<span>Semester GPA</span><strong>${fmt(weighted/totalCredits)}</strong><span>Based on ${fmt(totalCredits,1)} credit hours across ${used} course(s).</span>`);
  };
}
function initTool(){
  const page=document.body.dataset.tool;
  if(page==="percentage")$("#calc").onclick=()=>{
    const a=readNum("#a"),b=readNum("#b");
    if(a===null||b===null||a<0||b<=0){inputError("Enter obtained marks of zero or more and a total greater than zero.");return;}
    result(`<span>Percentage</span><strong>${fmt(a/b*100)}%</strong><span>Calculation: obtained ÷ total × 100.</span>`);
  };
  if(page==="grade")$("#calc").onclick=()=>{
    const s=readNum("#score");
    if(s===null||s<0||s>100){inputError("Enter a score between 0 and 100.");return;}
    const scale=[["A+",90],["A",80],["B",70],["C",60],["D",50],["F",0]];
    const g=scale.find(x=>s>=x[1])?.[0]||"F";
    result(`<span>Grade</span><strong>${g}</strong><span>Using the 90/80/70/60/50 scale. Your institution may use different boundaries.</span>`);
  };
  if(page==="final")$("#calc").onclick=()=>{
    const cur=readNum("#current"),weight=readNum("#weight"),target=readNum("#target");
    if(cur===null||weight===null||target===null||cur<0||cur>100||weight<0||weight>=100||target<0||target>100){inputError("Enter a current grade and target from 0–100, and a current-grade weight from 0–99.");return;}
    const need=(target-cur*(weight/100))/((100-weight)/100);
    result(`<span>Required exam score</span><strong>${fmt(need)}%</strong><span>${need>100?"The target is not mathematically reachable with the remaining assessment weight.":need<=0?"You already meet or exceed the target before the exam.":"You need approximately this score on the remaining assessment."}</span>`);
  };
  if(page==="attendance")$("#calc").onclick=()=>{
    const held=readNum("#held"),att=readNum("#attended"),target=readNum("#target");
    if(held===null||att===null||target===null||!Number.isInteger(held)||!Number.isInteger(att)||held<=0||att<0||att>held||target<0||target>100){inputError("Enter whole class counts with 0 ≤ attended ≤ classes held, and a target from 0–100%.");return;}
    const pct=att/held*100;
    let message;
    if(pct>=target)message="You are already at or above your target.";
    else if(target===100)message="A 100% target cannot be reached after absences by adding future attended classes alone.";
    else{const need=Math.ceil((target*held/100-att)/(1-target/100));message="Attend "+need+" consecutive classes (assuming no further absences) to reach "+target+"%.";}
    result(`<span>Current attendance</span><strong>${fmt(pct)}%</strong><span>${message}</span>`);
  };
  if(page==="study")$("#calc").onclick=()=>{
    const hours=readNum("#hours"),subjects=readNum("#subjects");
    if(hours===null||subjects===null||hours<0||subjects<=0||!Number.isInteger(subjects)){inputError("Enter available study hours of zero or more and a whole number of subjects greater than zero.");return;}
    const each=hours/subjects;
    result(`<span>Suggested time per subject</span><strong>${fmt(each)} h</strong><span>About ${fmt(each*60,0)} minutes per subject.</span>`);
  };
  if(page==="age")$("#calc").onclick=()=>{
    const raw=$("#dob")?.value||"";
    const parts=raw.split("-").map(Number);
    if(parts.length!==3||parts.some(x=>!Number.isInteger(x))){inputError("Enter a valid date of birth.");return;}
    const d=new Date(parts[0],parts[1]-1,parts[2]),today=new Date();
    d.setHours(0,0,0,0);today.setHours(0,0,0,0);
    if(d.getFullYear()!==parts[0]||d.getMonth()!==parts[1]-1||d.getDate()!==parts[2]||d>today){inputError("Enter a valid date of birth that is not in the future.");return;}
    const now=new Date();let y=now.getFullYear()-d.getFullYear(),m=now.getMonth()-d.getMonth(),day=now.getDate()-d.getDate();
    if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    result(`<span>Exact age</span><strong>${y}y ${m}m ${day}d</strong><span>Based on your device's current date.</span>`);
  };
  if(page==="aggregate")$("#calc").onclick=()=>{
    let score=0,totalWeight=0,used=0;
    for(let i=1;i<=4;i++){
      const v=readNum("#v"+i),w=readNum("#w"+i);
      if(v===null&&w===null)continue;
      if(v===null||w===null){inputError("Component "+i+": enter both score and weight, or leave both blank.");return;}
      if(v<0||v>100||w<0||w>100){inputError("Component "+i+": scores and weights must each be between 0 and 100.");return;}
      score+=v*w/100;totalWeight+=w;used++;
    }
    if(!used||Math.abs(totalWeight-100)>0.01){inputError("Enter at least one component and make the weights total 100%. Current total: "+fmt(totalWeight,1)+"%.");return;}
    result(`<span>Weighted aggregate</span><strong>${fmt(score)}%</strong><span>Based on ${used} component(s) with weights totalling 100%.</span>`);
  };
  if(page==="credits")$("#calc").onclick=()=>{
    const c=readNum("#credits"),weeksRaw=$("#weeks")?.value.trim()||"",weeks=weeksRaw?readNum("#weeks"):null;
    if(c===null||c<=0||(weeksRaw&&(weeks===null||weeks<=0||!Number.isInteger(weeks)))){inputError("Enter total credit hours greater than zero. If you enter semester weeks, use a whole number greater than zero.");return;}
    result(`<span>Total credit hours</span><strong>${fmt(c,1)}</strong><span>${weeks? "Approximate credits per week: "+fmt(c/weeks,2)+".":"Add semester weeks if you want a weekly estimate."}</span>`);
  };
  if(page==="tuition")$("#calc").onclick=()=>{
    const fee=readNum("#fee"),sem=readNum("#semesters"),otherRaw=$("#other")?.value.trim()||"",other=otherRaw?readNum("#other"):0;
    if(fee===null||sem===null||fee<0||sem<=0||!Number.isInteger(sem)||other===null||other<0){inputError("Enter a non-negative tuition fee, a whole number of semesters greater than zero, and non-negative other costs.");return;}
    result(`<span>Estimated total</span><strong>${fmt(fee*sem+other)}</strong><span>Tuition ${fmt(fee*sem)} + other costs ${fmt(other)}. Enter any currency amount; no currency is assumed.</span>`);
  };
  if(page==="scholarship")$("#calc").onclick=()=>{
    const rows=[["#a","#wa"],["#b","#wb"],["#c","#wc"]];
    let weighted=0,totalWeight=0,used=0;
    for(const [i,[scoreSel,weightSel]] of rows.entries()){
      const score=readNum(scoreSel),weight=readNum(weightSel);
      if(score===null&&weight===null)continue;
      if(score===null||weight===null){inputError("Criterion "+(i+1)+": enter both score and weight, or leave both blank.");return;}
      if(score<0||score>100||weight<0){inputError("Criterion "+(i+1)+": score must be 0–100 and weight cannot be negative.");return;}
      weighted+=score*weight;totalWeight+=weight;used++;
    }
    if(!used||totalWeight<=0){inputError("Enter at least one score and a positive total weight.");return;}
    result(`<span>Custom scholarship score</span><strong>${fmt(weighted/totalWeight,2)}/100</strong><span>Calculated from ${used} criterion(s). This is a user-defined model, not an official eligibility decision.</span>`);
  };
  if(page==="weighted")$("#calc").onclick=()=>{
    let weighted=0,totalWeight=0,used=0;
    for(const [i,row] of Array.from($$(".weightrow")).entries()){
      const v=readNumForElement(row.querySelector(".v")),w=readNumForElement(row.querySelector(".w"));
      if(v===null&&w===null)continue;
      if(v===null||w===null){inputError("Assessment "+(i+1)+": enter both score and weight, or leave both blank.");return;}
      if(v<0||v>100||w<0){inputError("Assessment "+(i+1)+": score must be 0–100 and weight cannot be negative.");return;}
      weighted+=v*w;totalWeight+=w;used++;
    }
    if(!used||totalWeight<=0){inputError("Enter at least one assessment and a positive total weight.");return;}
    result(`<span>Weighted grade</span><strong>${fmt(weighted/totalWeight)}%</strong><span>Total weight entered: ${fmt(totalWeight,1)}%.</span>`);
  };
  if(page==="marks")$("#calc").onclick=()=>{
    let total=0,count=0;
    for(const [i,row] of Array.from($$(".markrow")).entries()){
      const raw=row.querySelector(".v")?.value.trim()||"";
      if(!raw)continue;
      const value=Number(raw);
      if(!Number.isFinite(value)||value<0){inputError("Assessment "+(i+1)+": marks must be a non-negative number.");return;}
      total+=value;count++;
    }
    if(!count){inputError("Enter marks for at least one assessment.");return;}
    result(`<span>Total / average</span><strong>${fmt(total,2)} / ${fmt(total/count,2)}</strong><span>Average is based on ${count} entered assessment(s).</span>`);
  };
  if(page==="countdown")$("#calc").onclick=()=>{
    const raw=$("#date")?.value||"",parts=raw.split("-").map(Number);
    if(parts.length!==3||parts.some(x=>!Number.isInteger(x))){inputError("Enter a valid exam or deadline date.");return;}
    const d=new Date(parts[0],parts[1]-1,parts[2],23,59,59);
    if(d.getFullYear()!==parts[0]||d.getMonth()!==parts[1]-1||d.getDate()!==parts[2]){inputError("Enter a valid exam or deadline date.");return;}
    const days=Math.ceil((d-new Date())/86400000);
    result(`<span>Time remaining</span><strong>${days>=0?days+" days":"Date has passed"}</strong><span>Countdown uses your device's current date and time.</span>`);
  };
}
function readNumForElement(el){if(!el||String(el.value).trim()==="")return null;const n=Number(el.value);return Number.isFinite(n)?n:null}
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
