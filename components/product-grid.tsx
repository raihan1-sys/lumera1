'use client';import {useMemo,useState} from 'react';import {SlidersHorizontal,Grid2X2,LayoutList,ChevronLeft,ChevronRight,X} from 'lucide-react';import {Product} from '@/lib/catalog';import {ProductCard} from './product-card';
const chips=['All products','New arrivals','Best sellers','Under $100','Premium picks'] as const;
const SORTS=['Featured','Newest','Price: low to high','Price: high to low','Best rated','Most popular'];
const PAGE_SIZE=24;
export function ProductGrid({products,title='Explore the collection'}:{products:Product[];title?:string}){
  const [page,setPage]=useState(1);
  const [chip,setChip]=useState<typeof chips[number]>('All products');
  const [sort,setSort]=useState('Featured');
  const [view,setView]=useState<'grid'|'list'>('grid');
  const [panelOpen,setPanelOpen]=useState(false);
  const [brands,setBrands]=useState<string[]>([]);
  const [minRating,setMinRating]=useState(0);
  const [size,setSize]=useState('');
  const [color,setColor]=useState('');
  const priceBounds=useMemo(()=>{const ps=products.map(p=>p.price);return [Math.floor(Math.min(...ps,0)),Math.ceil(Math.max(...ps,1))]},[products]);
  const [maxPrice,setMaxPrice]=useState<number|null>(null);
  const facetBrands=useMemo(()=>Array.from(new Set(products.map(p=>p.brand))).sort(),[products]);
  const facetSizes=useMemo(()=>Array.from(new Set(products.flatMap(p=>p.sizes||[]))),[products]);
  const facetColors=useMemo(()=>Array.from(new Set(products.flatMap(p=>p.colors||[]))),[products]);
  const activeFilterCount=brands.length+(minRating>0?1:0)+(size?1:0)+(color?1:0)+(maxPrice!==null?1:0);

  const filtered=useMemo(()=>{
    let arr=products.slice();
    if(chip==='New arrivals')arr=arr.filter(p=>p.badge==='NEW');
    else if(chip==='Best sellers')arr=arr.filter(p=>p.badge==='BEST SELLER');
    else if(chip==='Under $100')arr=arr.filter(p=>p.price<100);
    else if(chip==='Premium picks')arr=arr.filter(p=>p.price>=400);
    if(brands.length)arr=arr.filter(p=>brands.includes(p.brand));
    if(minRating>0)arr=arr.filter(p=>p.rating>=minRating);
    if(size)arr=arr.filter(p=>p.sizes?.includes(size));
    if(color)arr=arr.filter(p=>p.colors?.includes(color));
    if(maxPrice!==null)arr=arr.filter(p=>p.price<=maxPrice);
    switch(sort){
      case 'Price: low to high':arr.sort((a,b)=>a.price-b.price);break;
      case 'Price: high to low':arr.sort((a,b)=>b.price-a.price);break;
      case 'Best rated':arr.sort((a,b)=>b.rating-a.rating);break;
      case 'Most popular':arr.sort((a,b)=>b.reviews-a.reviews);break;
      case 'Newest':arr.sort((a,b)=>b.id-a.id);break;
      default:break;
    }
    return arr;
  },[products,chip,sort,brands,minRating,size,color,maxPrice]);

  const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const safePage=Math.min(page,pages);
  const visible=filtered.slice((safePage-1)*PAGE_SIZE,(safePage-1)*PAGE_SIZE+PAGE_SIZE);
  const resetPage=()=>setPage(1);
  const toggleBrand=(b:string)=>{setBrands(x=>x.includes(b)?x.filter(y=>y!==b):[...x,b]);resetPage()};
  const clearFilters=()=>{setBrands([]);setMinRating(0);setSize('');setColor('');setMaxPrice(null);resetPage()};

  return <section className="collection">
    <div className="collection-toolbar"><div><p>THE COLLECTION</p><h2>{title}</h2><span>{filtered.length.toLocaleString()} pieces available</span></div>
      <div className="view-controls">
        <button type="button" className={panelOpen?'active-view':''} onClick={()=>setPanelOpen(o=>!o)}><SlidersHorizontal size={18}/> FILTER{activeFilterCount>0?` (${activeFilterCount})`:''}</button>
        <button type="button" className={'square'+(view==='grid'?' active-view':'')} onClick={()=>setView('grid')} aria-label="Grid view"><Grid2X2 size={18}/></button>
        <button type="button" className={'square'+(view==='list'?' active-view':'')} onClick={()=>setView('list')} aria-label="List view"><LayoutList size={18}/></button>
      </div>
    </div>
    <div className="filters">{chips.map(c=><button type="button" key={c} className={chip===c?'active-chip':''} onClick={()=>{setChip(c);resetPage()}}>{c}</button>)}
      <select value={sort} onChange={e=>{setSort(e.target.value);resetPage()}}>{SORTS.map(s=><option key={s}>{s}</option>)}</select>
    </div>
    {panelOpen&&<div className="filter-panel">
      {facetBrands.length>1&&<div className="filter-group"><h4>Brand</h4><div className="filter-chip-row">{facetBrands.map(b=><button type="button" key={b} className={brands.includes(b)?'fchip active':'fchip'} onClick={()=>toggleBrand(b)}>{b}</button>)}</div></div>}
      <div className="filter-group"><h4>Max price: {maxPrice===null?`$${priceBounds[1]}`:`$${maxPrice}`}</h4><input type="range" min={priceBounds[0]} max={priceBounds[1]} value={maxPrice===null?priceBounds[1]:maxPrice} onChange={e=>{setMaxPrice(Number(e.target.value));resetPage()}}/></div>
      <div className="filter-group"><h4>Minimum rating</h4><div className="filter-chip-row">{[0,3,3.5,4,4.5].map(r=><button type="button" key={r} className={minRating===r?'fchip active':'fchip'} onClick={()=>{setMinRating(r);resetPage()}}>{r===0?'Any':r+'★+'}</button>)}</div></div>
      {facetSizes.length>0&&<div className="filter-group"><h4>Size</h4><div className="filter-chip-row"><button type="button" className={size===''?'fchip active':'fchip'} onClick={()=>{setSize('');resetPage()}}>Any</button>{facetSizes.map(s=><button type="button" key={s} className={size===s?'fchip active':'fchip'} onClick={()=>{setSize(s);resetPage()}}>{s}</button>)}</div></div>}
      {facetColors.length>0&&<div className="filter-group"><h4>Color</h4><div className="filter-chip-row"><button type="button" className={color===''?'fchip active':'fchip'} onClick={()=>{setColor('');resetPage()}}>Any</button>{facetColors.map(c=><button type="button" key={c} className={color===c?'fchip active':'fchip'} onClick={()=>{setColor(c);resetPage()}}>{c}</button>)}</div></div>}
      {activeFilterCount>0&&<button type="button" className="clear-filters" onClick={clearFilters}><X size={14}/> Clear all filters</button>}
    </div>}
    {visible.length===0?<div className="empty-state"><p>No products match these filters.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>:
    <div className={'product-grid'+(view==='list'?' list-view':'')}>{visible.map(p=><ProductCard key={p.id} p={p}/>)}</div>}
    <div className="pagination"><button disabled={safePage===1} onClick={()=>setPage(safePage-1)}><ChevronLeft/></button><span>Page {safePage} of {pages}</span><button disabled={safePage===pages} onClick={()=>setPage(safePage+1)}><ChevronRight/></button></div>
  </section>
}
