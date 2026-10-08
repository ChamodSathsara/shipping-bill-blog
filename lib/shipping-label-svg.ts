import type { LabelData, TemplateId } from "@/lib/shipping-label";

const esc=(v:unknown)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]!));
const t=(x:number,y:number,s:unknown,size=12,weight=400,anchor="start",fill="#050505",family="Arial")=>`<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" fill="${fill}">${esc(s)}</text>`;
const line=(x1:number,y1:number,x2:number,y2:number,w=1,color="#111")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"/>`;
const code128Patterns=[
"212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","2331112"];
/** Standards-compliant Code 128-B, including checksum, stop pattern and 10-module quiet zones. */
function barcode(value:string,x:number,y:number,w:number,h:number){
 const normalized=(value||"NO-TRACKING").replace(/\s+/g,"").replace(/[^\x20-\x7e]/g,"").slice(0,32)||"NO-TRACKING";
 const codes=[104,...Array.from(normalized,c=>c.charCodeAt(0)-32)];
 let checksum=104;for(let i=1;i<codes.length;i++)checksum+=codes[i]*i;codes.push(checksum%103,106);
 const modules=20+codes.reduce((sum,c)=>sum+code128Patterns[c].split("").reduce((n,v)=>n+Number(v),0),0);
 const unit=w/modules;let cursor=x+10*unit,out=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff"/>`;
 for(const code of codes){const pattern=code128Patterns[code];for(let i=0;i<pattern.length;i++){const width=Number(pattern[i])*unit;if(i%2===0)out+=`<rect x="${cursor.toFixed(3)}" y="${y}" width="${width.toFixed(3)}" height="${h}" fill="#000"/>`;cursor+=width}}
 return out;
}
function addr(a:LabelData["sender"],x:number,y:number,large=false){const rows=[a.name||"Daniel Okafor",a.company,a.addressLine1||"88 Maple Row, Apt 12B",a.addressLine2,`${a.city||"Austin"}, ${a.state||"TX"} ${a.zipCode||"78704"}`,a.country||"US",a.phone].filter(Boolean);const step=large?25:15;return rows.map((r,i)=>t(x,y+i*step,r,i===0&&large?27:large?20:12,i===0?800:large?600:400)).join("")}
function f(d:LabelData){return{tracking:d.tracking.trackingNumber||"9400 1118 9922 3456 7890 12",ref:d.tracking.referenceNumber||"ORD-48213",weight:`${d.package.weight} ${d.package.weightUnit}`,dims:`${d.package.length}×${d.package.width}×${d.package.height} ${d.package.dimensionUnit}`,copy:d.format.quantity>1?`1 of ${d.format.quantity}`:"1 of 1"}}
export function shippingLabelSvg(d:LabelData,id:TemplateId){const a=f(d);let body="";
 if(id===1){body+=`<rect x="14" y="14" width="128" height="25" rx="13" fill="#147f77"/>${t(78,31,`${d.shipping.marketplace} ORDER`,12,800,"middle","#fff")}${t(370,31,`#${a.ref}`,13,700,"end","#111","monospace")}<rect x="14" y="50" width="356" height="300" rx="15" fill="#eaf7f5" stroke="#147f77" stroke-width="2"/>${t(29,78,"DELIVER TO",12,800,"start","#147f77")}${addr(d.recipient,29,112,true)}`;let x=14;[d.package.type,a.weight,a.dims,d.format.serviceLevel].forEach((v,i)=>{const w=i===2?94:i===3?88:55;body+=`<rect x="${x}" y="362" width="${w}" height="25" rx="6" fill="${i===3?'#147f77':'#fff'}" stroke="#147f77" stroke-width="2"/>${t(x+w/2,379,v,11,800,"middle",i===3?'#fff':'#111')}`;x+=w+7});body+=t(14,411,`Return to: ${d.sender.name}, ${d.sender.addressLine1}, ${d.sender.city}, ${d.sender.state} ${d.sender.zipCode}`,10,400)+barcode(a.tracking,14,435,356,63)+t(192,517,a.tracking,11,700,"middle","#111","monospace")+`<rect x="14" y="533" width="356" height="29" rx="7" fill="#147f77"/>${t(192,553,"Thank you for your order",14,800,"middle","#fff")}`}
 else if(id===2){body+=t(14,27,"SHIPPING LABEL",13,700,"start","#111","monospace")+t(370,27,a.copy,13,700,"end","#111","monospace")+line(14,39,370,39,3)+t(14,59,`FROM ${d.sender.name} / ${d.sender.company}`,11,700,"start","#111","monospace")+t(14,76,d.sender.addressLine1,11,400,"start","#111","monospace")+t(14,93,`${d.sender.city} ${d.sender.state} ${d.sender.zipCode}`,11,400,"start","#111","monospace")+line(14,103,370,103)+t(14,123,"TO",11,700,"start","#111","monospace")+addr(d.recipient,14,146)+line(14,218,370,218)+t(14,280,d.recipient.zipCode||"78704",64,900,"start","#000","monospace")+line(14,298,370,298);const rows=[["PKG",d.package.type,"WT",a.weight],["DIM",a.dims,"SVC",`${d.shipping.carrier} ${d.format.serviceLevel}`],["DATE",d.format.shipDate,"REF",a.ref]];rows.forEach((r,i)=>{const y=324+i*27;body+=t(14,y,`${r[0]}  ${r[1]}`,11,700,"start","#111","monospace")+t(204,y,`${r[2]}  ${r[3]}`,11,700,"start","#111","monospace")+line(14,y+9,370,y+9)});body+=t(14,420,`NOTE  ${d.tracking.handlingInstructions||"Handle with care"}`,11,700,"start","#111","monospace")+line(14,431,370,431)+barcode(a.tracking,14,445,356,75)+t(192,540,a.tracking,11,700,"middle","#111","monospace")}
 else if(id===3){body+=t(20,32,"PRIORITY SHIPMENT",11,800)+t(20,65,"FROM",10,800)+addr(d.sender,20,83)+t(364,65,"SHIP DATE",10,800,"end")+t(364,82,d.format.shipDate,11,400,"end")+t(364,105,"WEIGHT",10,800,"end")+t(364,122,a.weight,11,400,"end")+t(20,190,"SHIP TO",10,800)+addr(d.recipient,20,228,true)+line(20,420,364,420,2)+t(20,443,`${d.shipping.carrier} ${d.format.serviceLevel} · ${d.package.type} · ${a.dims} · ${a.copy}`,12,800)+barcode(a.tracking,20,463,344,65)+t(20,552,a.tracking,11,400,"start","#111","monospace")+t(364,552,a.ref,11,700,"end","#111","monospace")}
 else if(id===4){
  const r=d.recipient,s=d.sender;
  body+=t(20,35,"SHIP TO",10,800)
   +t(114,43,r.name||"Daniel Okafor",27,800)
   +(r.company?t(114,68,r.company,18,600):"")
   +t(114,91,r.addressLine1||"88 Maple Row, Apt 12B",17,600)
   +(r.addressLine2?t(114,112,r.addressLine2,17,600):"")
   +t(114,r.addressLine2?135:114,`${r.city||"Austin"}, ${r.state||"TX"} ${r.zipCode||"78704"}`,18,800)
   +t(114,r.addressLine2?156:135,`${r.country||"US"}${r.phone?` · ${r.phone}`:""}`,15,500)
   +t(20,188,"FROM",10,800)
   +t(114,188,s.name||"Sender",12,800)
   +(s.company?t(114,203,s.company,12,400):"")
   +t(114,218,s.addressLine1||"Return address",12,400)
   +(s.addressLine2?t(114,233,s.addressLine2,12,400):"")
   +t(114,s.addressLine2?248:233,`${s.city||"City"}, ${s.state||"ST"} ${s.zipCode||"00000"}`,12,400)
   +t(114,s.addressLine2?263:248,`${s.country||"US"}${s.phone?` · ${s.phone}`:""}`,12,400)
   +line(20,274,364,274,2);
  const rows=[["PACKAGE",`${d.package.type}, ${a.weight}, ${a.dims}`],["SERVICE",`${d.shipping.carrier} ${d.format.serviceLevel}`],["MARKETPLACE",d.shipping.marketplace],["SHIP DATE",d.format.shipDate],["REFERENCE",a.ref],["HANDLING",d.tracking.handlingInstructions||"Handle with care"],["COPY",a.copy]];
  rows.forEach((row,i)=>{const y=300+i*31;body+=t(20,y,row[0],10,800)+t(114,y,row[1],14,600)});
  body+=barcode(a.tracking,20,515,344,35)+t(192,570,a.tracking,9,400,"middle","#111","monospace")
 }
 else {body+=`<rect x="3" y="3" width="378" height="570" fill="none" stroke="#000" stroke-width="3"/>${t(18,37,d.heading.showHeading?d.heading.customHeading||"SHIPPING LABEL":"SHIPPING LABEL",24,900)}${t(366,25,d.shipping.carrier,11,800,"end")}${t(366,41,d.format.serviceLevel,11,800,"end")}${line(18,52,366,52,3)}${t(18,73,"FROM",10,800)}${addr(d.sender,18,92)}${t(205,73,"SHIP TO",10,800)}${addr(d.recipient,205,92)}${line(18,190,366,190,2)}${t(18,216,`PACKAGE ${d.package.type}`,10,800)}${t(145,216,`WEIGHT ${a.weight}`,10,800)}${t(260,216,`DIM ${a.dims}`,10,800)}${line(18,231,366,231,2)}${t(18,258,`REFERENCE: ${a.ref}`,12,600)}${t(18,282,`SHIP DATE: ${d.format.shipDate}`,12,600)}${t(18,306,`HANDLING: ${d.tracking.handlingInstructions||"—"}`,12,600)}${barcode(a.tracking,18,365,348,120)}${t(192,510,a.tracking,13,700,"middle","#111","monospace")}${t(192,550,"CUSTOM LABEL · POSTAGE NOT INCLUDED",8,400,"middle")}`}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="576" viewBox="0 0 384 576"><rect width="384" height="576" fill="#fff"/>${body}</svg>`;
}
