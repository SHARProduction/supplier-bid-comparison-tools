export const evaluators={
  'quote-scope-comparison-matrix': i=>{const req=i.scope||[],rows=(i.quotes||[]).map(x=>({...x,missing:req.filter(y=>!(x.items||[]).includes(y)),coverage:req.length?+((req.length-req.filter(y=>!(x.items||[]).includes(y)).length)/req.length*100).toFixed(1):0}));return{valid:req.length>0&&rows.length>0,rows,complete:rows.filter(x=>!x.missing.length).map(x=>x.supplier)}},
  'supplier-quote-normalizer': i=>{const subtotal=Number(i.base)*Number(i.currencyRate)+Number(i.exclusionsValue||0),tax=subtotal*Number(i.taxPercent||0)/100,contingency=subtotal*Number(i.contingencyPercent||0)/100;return{valid:subtotal>=0,subtotal:+subtotal.toFixed(2),tax:+tax.toFixed(2),contingency:+contingency.toFixed(2),normalizedTotal:+(subtotal+tax+contingency).toFixed(2)}}
};
export function evaluate(slug,input){const fn=evaluators[slug];if(!fn)throw new Error('Unknown tool');return fn(input)}
