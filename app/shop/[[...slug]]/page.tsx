import {notFound} from 'next/navigation';import Link from 'next/link';import {categories,getCategory,getGroup,getSub,hasVisibleGroups,queryProducts,breadcrumbFor,ALL_PRODUCTS} from '@/lib/catalog';import {CategoryHero} from '@/components/category-hero';import {ProductGrid} from '@/components/product-grid';

export default async function ShopPage({params}:{params:Promise<{slug?:string[]}>}){
  const {slug=[]}=await params;

  // /shop — landing page across every department
  if(slug.length===0){
    const latest=queryProducts({sort:'Newest'}).slice(0,24);
    return <><section className="shop-landing"><p>THE LUMERA MARKETPLACE</p><h1>Discover without limits.</h1><h2>Thousands of pieces across the departments that shape how you live.</h2><div>{categories.map(c=><Link key={c.slug} href={'/shop/'+c.slug} style={{backgroundImage:`url(${c.image})`}}><span/><b>{c.name}</b><small>{c.tagline}</small></Link>)}</div></section><ProductGrid products={latest} title="The latest across Lumera"/></>;
  }

  const category=getCategory(slug[0]);
  if(!category)notFound();
  const multiGroup=hasVisibleGroups(category);

  // /shop/[category]
  if(slug.length===1){
    const products=queryProducts({categorySlug:category.slug});
    const crumbs=breadcrumbFor(category.slug);
    return <><CategoryHero category={category} crumbs={crumbs} pieceCount={products.length}/><ProductGrid products={products} title={`Explore ${category.name}`}/></>;
  }

  if(multiGroup){
    const group=getGroup(category,slug[1]);
    if(!group)notFound();
    // /shop/[category]/[group]
    if(slug.length===2){
      const products=queryProducts({categorySlug:category.slug,groupSlug:group.slug});
      const crumbs=breadcrumbFor(category.slug,group.slug);
      return <><CategoryHero category={category} group={group} crumbs={crumbs} pieceCount={products.length}/><ProductGrid products={products} title={`${category.name} — ${group.name}`}/></>;
    }
    // /shop/[category]/[group]/[sub]
    const sub=getSub(group,slug[2]);
    if(!sub||slug.length>3)notFound();
    const products=queryProducts({categorySlug:category.slug,groupSlug:group.slug,subSlug:sub.slug});
    const crumbs=breadcrumbFor(category.slug,group.slug,sub.slug);
    return <><CategoryHero category={category} group={group} sub={sub} crumbs={crumbs} pieceCount={products.length}/><ProductGrid products={products} title={`${group.name} ${sub.name}`}/></>;
  }

  // single-group departments: /shop/[category]/[sub]
  const sub=getSub(category.groups[0],slug[1]);
  if(!sub||slug.length>2)notFound();
  const products=queryProducts({categorySlug:category.slug,subSlug:sub.slug});
  const crumbs=breadcrumbFor(category.slug,undefined,sub.slug);
  return <><CategoryHero category={category} group={category.groups[0]} sub={sub} crumbs={crumbs} pieceCount={products.length}/><ProductGrid products={products} title={`${category.name} — ${sub.name}`}/></>;
}
