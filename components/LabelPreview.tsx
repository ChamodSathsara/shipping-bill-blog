"use client";

import { useMemo } from "react";
import { shippingLabelSvg } from "@/lib/shipping-label-svg";
import type { LabelData, TemplateId } from "@/lib/shipping-label";
import { cn } from "@/lib/utils/cn";

export function LabelPreview({data,templateId,className,bordered=true}:{data:LabelData;templateId:TemplateId;className?:string;bordered?:boolean}){
  const source=useMemo(()=>`data:image/svg+xml;charset=utf-8,${encodeURIComponent(shippingLabelSvg(data,templateId))}`,[data,templateId]);
  return <div className={cn("relative aspect-[2/3] w-full overflow-hidden bg-white",bordered&&"rounded-sm shadow-[0_8px_30px_-8px_rgba(0,0,0,.35)] ring-1 ring-black/10",className)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={source} alt="Shipping label preview" className="h-full w-full object-contain"/>
  </div>;
}
