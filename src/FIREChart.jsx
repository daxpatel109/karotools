"use client";

import dynamic from 'next/dynamic';

const FIREChartInner = dynamic(() => import('./FIREChartInner'), { ssr: false });

export default function FIREChart({ chartData }) {
  return <FIREChartInner chartData={chartData} />;
}
