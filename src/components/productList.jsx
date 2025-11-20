
import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { getProductos } from '../Api';

export function ProductList({ min = 0, max = Infinity, category = 'Todos' }) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const data = await getProductos();
				setItems(Array.isArray(data) ? data : []);
			} catch (e) {
				setError(e.message || 'Error cargando productos');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const filtrados = useMemo(() => {
		const maxValue = Number.isFinite(max) ? max : Number.POSITIVE_INFINITY;
		return items.filter(p => {
			const price = Number(p.precio) || 0;
			const cat = p.categoria || '';
			if (price < min || price > maxValue) return false;
			if (category !== 'Todos' && cat !== category) return false;
			return true;
		});
	}, [items, min, max, category]);

	return (
		<div className="container">
			<h2>Productos</h2>
			{loading && <div>Cargando productos...</div>}
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{!loading && !error && (
				<div className="grid-productos grid-productos-3">
					{filtrados.map(producto => (
						<ProductCard key={producto.id} product={producto} />
					))}
				</div>
			)}
		</div>
	);
}
