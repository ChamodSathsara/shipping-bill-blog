import { z } from "zod";

export const packingSlipTemplates = [
  { code:"STANDARD",name:"Standard",description:"Classic document layout" },
  { code:"MINIMAL",name:"Minimal",description:"Clean, spacious and simple" },
  { code:"MODERN",name:"Modern",description:"Strong header and sections" },
  { code:"COMPACT",name:"Compact",description:"More items per page" },
  { code:"BRANDED",name:"Branded",description:"Logo-forward shop style" },
] as const;
export type PackingTemplateCode=(typeof packingSlipTemplates)[number]["code"];
const address=z.object({name:z.string().trim().min(1,"Name is required").max(150),company:z.string().trim().max(200),addressLine1:z.string().trim().min(1,"Address is required").max(255),addressLine2:z.string().trim().max(255),city:z.string().trim().min(1,"City is required").max(100),state:z.string().trim().min(1,"State is required").max(100),zipCode:z.string().trim().min(1,"ZIP is required").max(30),country:z.string().trim().length(2,"Use a two-letter country code").transform(v=>v.toUpperCase()),phone:z.string().trim().max(50)});
export const packingSlipSchema=z.object({templateCode:z.enum(["STANDARD","MINIMAL","MODERN","COMPACT","BRANDED"]),paperSize:z.enum(["A4","A5"]),orderNumber:z.string().trim().min(1,"Order number is required").max(100),orderDate:z.string().date(),slipNumber:z.string().trim().max(100),sender:address,recipient:address,items:z.array(z.object({sku:z.string().trim().max(100),description:z.string().trim().min(1,"Description is required").max(500),variant:z.string().trim().max(150),quantity:z.coerce.number().int().positive("Quantity must be greater than zero")})).min(1,"Add at least one item").max(100),specialInstructions:z.string().trim().max(2000),customerMessage:z.string().trim().max(2000),footerText:z.string().trim().max(2000),customHeading:z.string().trim().min(1).max(150),showSku:z.boolean(),showVariant:z.boolean(),showQuantity:z.boolean(),showLogo:z.boolean(),logoDataUrl:z.string().max(1_500_000).optional()});
export type PackingSlipData=z.infer<typeof packingSlipSchema>;
export function createDefaultPackingSlip():PackingSlipData{return{templateCode:"STANDARD",paperSize:"A4",orderNumber:"",orderDate:new Date().toISOString().slice(0,10),slipNumber:"",sender:{name:"",company:"",addressLine1:"",addressLine2:"",city:"",state:"",zipCode:"",country:"US",phone:""},recipient:{name:"",company:"",addressLine1:"",addressLine2:"",city:"",state:"",zipCode:"",country:"US",phone:""},items:[{sku:"",description:"",variant:"",quantity:1}],specialInstructions:"",customerMessage:"Thank you for your order!",footerText:"Please contact us if there are any issues.",customHeading:"PACKING SLIP",showSku:true,showVariant:true,showQuantity:true,showLogo:true,logoDataUrl:undefined};}
