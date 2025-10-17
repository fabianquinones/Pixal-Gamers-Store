
import React from 'react';
import { productos } from '../BD/productos';
import ProductCard from './ProductCard';

export function ProductList({ min = 0, max = Infinity, category = "Todos" }) {
		return (
			<div className="container">
				<h2>Productos</h2>
				<div className="grid-productos grid-productos-3">
					{productos.map((producto) => {
						const price = producto.precio;
						const cat = producto.categoria;
						if (price >= min && price <= max) {
							if (category === "Todos" || cat === category) {
								return (
									<ProductCard key={producto.id} product={producto} />
								);
							}
						}
						return null;
					})}
				</div>
			</div>
		);
}
