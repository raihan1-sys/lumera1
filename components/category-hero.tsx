import Image from 'next/image';import Link from 'next/link';import {ArrowRight,ChevronRight} from 'lucide-react';import {Category,Group,Sub,hasVisibleGroups} from '@/lib/catalog';
type Crumb={label:string;href:string};
export function CategoryHero({category,group,sub,crumbs=[],pieceCount}:{category:Category;group?:Group;sub?:Sub;crumbs?:Crumb[];pieceCount:number}){
  const multiGroup=hasVisibleGroups(category);
  // what to show as the picker under the headline: groups (Fashion) or that group's own subcategories
  const picks:{slug:string;name:string;href:string}[]=multiGroup&&!group
    ? category.groups.map(g=>({slug:g.slug,name:g.name,href:`/shop/${category.slug}/${g.slug}`}))
    : (group||category.groups[0]).subs.map(s=>({slug:s.slug,name:s.name,href:multiGroup?`/shop/${category.slug}/${group?.slug}/${s.slug}`:`/shop/${category.slug}/${s.slug}`}));
  const heading=sub?sub.name:group?group.name:category.name;
  const tagline=sub?`${category.name}${group&&multiGroup?' — '+group.name:''} — ${sub.name}`:group?`${category.name} — ${group.name}`:category.tagline;
  return <section className="category-hero"><Image src={category.banner} alt={heading} fill priority sizes="100vw"/><div className="hero-shade"/><div className="hero-copy"><div className="crumb">{crumbs.map((c,i)=><span key={c.href}>{i>0&&<ChevronRight size={14}/>}<Link href={c.href}>{c.label}</Link></span>)}</div><p>CURATED DEPARTMENT</p><h1>{heading}</h1><h2>{tagline}</h2><div className="hero-line"/><div className="hero-subcats">{picks.map(s=><Link key={s.slug} href={s.href}>{s.name} <ArrowRight size={14}/></Link>)}</div></div><div className="hero-stat"><b>{pieceCount.toLocaleString()}+</b><span>carefully selected pieces</span></div></section>
}
