import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

export interface BarChartData<X, Y> {
  name: X;
  value: Y;
  label?: string;
}

const SHOWN_PRODUCTS_ON_CHART = 10;

function SellerTopProducts() {
  const { sellerProducts } = useAppSelector((state) => state.dashboard);
  const [topProducts, setTopProducts] = useState<BarChartData<string, number>[] | null>(null);

  const arrangeProductsBySalesForChart = () => {
    let sortedProducts = sellerProducts.map((product) => {
      return {
        name: product.product_name,
        value: product.orders.reduce((total, current) => total + current.pivot.quantity, 0),
      };
    });

    sortedProducts.sort((productA, productB) => (productA.value < productB.value ? 1 : -1));
    setTopProducts(sortedProducts);
  };

  useEffect(() => {
    arrangeProductsBySalesForChart();
  }, [sellerProducts]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart layout="vertical" data={topProducts?.slice(0, SHOWN_PRODUCTS_ON_CHART) ?? undefined}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SellerTopProducts;
