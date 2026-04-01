import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid2x2, AlignJustify } from 'lucide-react';
import { useQuery } from 'react-query';
import { productsAPI } from '../services/api';
import { Product, ProductFilters } from '../types';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({ page: 1, limit: 12 });
  const { addToCart } = useCartStore();

  useEffect(() => {
    const newFilters: ProductFilters = { page: parseInt(searchParams.get('page') || '1'), limit: 12 };
    if (searchParams.get('search')) newFilters.search = searchParams.get('search') || undefined;
    if (searchParams.get('category')) newFilters.category = searchParams.get('category') || undefined;
    if (searchParams.get('minPrice')) newFilters.minPrice = parseFloat(searchParams.get('minPrice') || '0');
    if (searchParams.get('maxPrice')) newFilters.maxPrice = parseFloat(searchParams.get('maxPrice') || '0');
    setFilters(newFilters);
  }, [searchParams]);

  const { data, isLoading } = useQuery(['products', filters], () => productsAPI.getProducts(filters), { keepPreviousData: true });
  const { data: categoriesData } = useQuery('categories', () => productsAPI.getCategories(), { staleTime: 5 * 60 * 1000 });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    search.trim() ? setSearchParams({ search: search.trim() }) : setSearchParams({});
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1);
      toast.success(`${product.name} added to your selection`);
    } catch {
      toast.error('Unable to add item');
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: page.toString() });
  };

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', padding: '4rem 2rem 3rem', textAlign: 'center' }}>
        <span className="section-label mb-4">Chronos</span>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300,
          color: 'var(--text-primary)', letterSpacing: '0.05em', margin: '1rem 0',
        }}>
          {filters.category ? filters.category : filters.search ? `"${filters.search}"` : 'The Collection'}
        </h1>
        <div style={{ width: '50px', height: '1px', background: 'var(--gold)', margin: '0 auto' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

        {/* Toolbar */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-10">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input name="search" type="text" placeholder="Search timepieces..."
                defaultValue={filters.search}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', padding: '0.6rem 2.5rem 0.6rem 1rem',
                  fontSize: '0.75rem', letterSpacing: '0.08em', outline: 'none', width: '260px',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilters(!showFilters)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: showFilters ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <SlidersHorizontal className="h-4 w-4" /> Filter
            </button>
            <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} style={{ color: viewMode === 'grid' ? 'var(--gold)' : 'var(--text-muted)' }}>
                <Grid2x2 className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode('list')} style={{ color: viewMode === 'list' ? 'var(--gold)' : 'var(--text-muted)' }}>
                <AlignJustify className="h-4 w-4" />
              </button>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              {data?.data.pagination?.total || 0} pieces
            </p>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem' }}>
            <div className="flex flex-wrap gap-6">
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>Collection</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setSearchParams({})}
                    style={{
                      padding: '0.4rem 1rem', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                      border: '1px solid', transition: 'all 0.2s',
                      borderColor: !filters.category ? 'var(--gold)' : 'var(--border)',
                      color: !filters.category ? 'var(--gold)' : 'var(--text-muted)',
                      background: 'transparent',
                    }}>All</button>
                  {categoriesData?.data.categories?.map((cat: string) => (
                    <button key={cat} onClick={() => setSearchParams({ category: cat })}
                      style={{
                        padding: '0.4rem 1rem', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                        border: '1px solid', transition: 'all 0.2s',
                        borderColor: filters.category === cat ? 'var(--gold)' : 'var(--border)',
                        color: filters.category === cat ? 'var(--gold)' : 'var(--text-muted)',
                        background: 'transparent',
                      }}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>Price Range</p>
                <div className="flex gap-3 items-center">
                  <input type="number" placeholder="Min $" value={filters.minPrice || ''}
                    onChange={e => {
                      const params = new URLSearchParams(searchParams);
                      e.target.value ? params.set('minPrice', e.target.value) : params.delete('minPrice');
                      setSearchParams(params);
                    }}
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.4rem 0.75rem', fontSize: '0.75rem', width: '100px', outline: 'none' }}
                  />
                  <span style={{ color: 'var(--text-muted)' }}>—</span>
                  <input type="number" placeholder="Max $" value={filters.maxPrice || ''}
                    onChange={e => {
                      const params = new URLSearchParams(searchParams);
                      e.target.value ? params.set('maxPrice', e.target.value) : params.delete('maxPrice');
                      setSearchParams(params);
                    }}
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '0.4rem 0.75rem', fontSize: '0.75rem', width: '100px', outline: 'none' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {isLoading ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1rem' }} className="animate-pulse">
                <div style={{ background: 'var(--surface-2)', height: '280px', marginBottom: '1rem' }} />
                <div style={{ background: 'var(--surface-2)', height: '16px', marginBottom: '0.5rem', width: '70%' }} />
                <div style={{ background: 'var(--surface-2)', height: '14px', width: '40%' }} />
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {data?.data.products?.map((product: Product) => (
              viewMode === 'grid' ? (
                <div key={product.id} className="product-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <Link to={`/products/${product.id}`}>
                    <div style={{ overflow: 'hidden', height: '280px' }}>
                      <img src={product.imageUrl} alt={product.name}
                        className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div style={{ padding: '1.5rem' }}>
                    <div className="flex justify-between items-start mb-2">
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
                        {product.category}
                      </span>
                      {product.stock < 10 && product.stock > 0 && (
                        <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: '#C9704C', textTransform: 'uppercase' }}>
                          Only {product.stock} left
                        </span>
                      )}
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h3 style={{
                        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem',
                        fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.03em',
                        marginBottom: '0.5rem', transition: 'color 0.3s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}>
                        {product.name}
                      </h3>
                    </Link>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.6, marginBottom: '1.25rem' }}
                      className="line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 300, color: 'var(--gold)' }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <button onClick={() => handleAddToCart(product)} disabled={product.stock === 0}
                        style={{
                          border: '1px solid var(--gold)', color: 'var(--gold)',
                          padding: '0.5rem 1.25rem', fontSize: '0.6rem',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          fontFamily: 'Raleway, sans-serif', background: 'transparent',
                          transition: 'all 0.3s', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                          opacity: product.stock === 0 ? 0.4 : 1,
                        }}
                        onMouseEnter={e => { if (product.stock > 0) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--obsidian)'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}>
                        {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={product.id} className="product-card flex gap-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '1.5rem' }}>
                  <Link to={`/products/${product.id}`} style={{ flexShrink: 0 }}>
                    <div style={{ width: '120px', height: '120px', overflow: 'hidden' }}>
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>{product.category}</span>
                      <Link to={`/products/${product.id}`}>
                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.03em', margin: '0.25rem 0 0.5rem' }}>
                          {product.name}
                        </h3>
                      </Link>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1.6, maxWidth: '400px' }} className="line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-right" style={{ flexShrink: 0, marginLeft: '2rem' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 300, color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <button onClick={() => handleAddToCart(product)} disabled={product.stock === 0}
                        style={{
                          border: '1px solid var(--gold)', color: 'var(--gold)',
                          padding: '0.5rem 1.25rem', fontSize: '0.6rem',
                          letterSpacing: '0.2em', textTransform: 'uppercase',
                          fontFamily: 'Raleway, sans-serif', background: 'transparent',
                          transition: 'all 0.3s', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                          opacity: product.stock === 0 ? 0.4 : 1,
                        }}
                        onMouseEnter={e => { if (product.stock > 0) { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--obsidian)'; } }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}>
                        {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.data.pagination && data.data.pagination.pages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: data.data.pagination.pages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => handlePageChange(page)}
                style={{
                  width: '36px', height: '36px', fontSize: '0.75rem',
                  border: '1px solid', transition: 'all 0.2s',
                  borderColor: page === filters.page ? 'var(--gold)' : 'var(--border)',
                  color: page === filters.page ? 'var(--gold)' : 'var(--text-muted)',
                  background: 'transparent',
                }}>
                {page}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
