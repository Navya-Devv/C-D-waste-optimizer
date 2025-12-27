import React, { useEffect, useState } from "react";

function useCounter(target, duration = 1200){
  const [value, setValue] = useState(0);
  useEffect(()=>{
    let start = 0;
    const stepTime = Math.max(8, duration / target);
    const timer = setInterval(()=>{
      start += Math.ceil(target * (stepTime / duration));
      if(start >= target){
        setValue(target);
        clearInterval(timer);
      } else setValue(start);
    }, stepTime);
    return ()=>clearInterval(timer);
  },[target,duration]);
  return value;
}

export default function Stats(){
  const a = useCounter(78);   // ex: 78% recyclable
  const b = useCounter(12000); // ex: 12000 tons recycled
  const c = useCounter(95); // 95% reuse rate placeholder

  return (
    <div className="stats-row">
      <div className="stat">
        <div className="num">{a}%</div>
        <div className="label">Construction waste that is recyclable (estimate)</div>
      </div>

      <div className="stat">
        <div className="num">{b.toLocaleString()}</div>
        <div className="label">Tons of construction waste diverted (sample data)</div>
      </div>

      <div className="stat">
        <div className="num">{c}%</div>
        <div className="label">Projects with reuse practices implemented</div>
      </div>
    </div>
  );
}
