import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatCurrency(val) {
  if (isNaN(val)) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

export default function FIREChartInner({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0076ff" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0076ff" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis 
          dataKey="age" 
          stroke="#64748b" 
          tick={{fill: '#64748b', fontSize: 12}}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `Age ${val}`}
        />
        <YAxis 
          stroke="#64748b" 
          tick={{fill: '#64748b', fontSize: 12}}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => {
            if (val >= 10000000) return `${(val/10000000).toFixed(1)}Cr`;
            if (val >= 100000) return `${(val/100000).toFixed(0)}L`;
            return val;
          }}
          width={60}
        />
        <Tooltip 
          contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 12px 32px rgba(0,0,0,0.4)', color: '#f8fafc' }}
          itemStyle={{ color: '#e2e8f0', fontWeight: '600' }}
          labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
          formatter={(value, name) => [formatCurrency(value), name === 'wealth' ? 'Your Portfolio' : 'FIRE Target']}
          labelFormatter={(label) => `At Age ${label}`}
        />
        <Area type="monotone" dataKey="fireTarget" stroke="#10b981" fillOpacity={1} fill="url(#colorTarget)" strokeWidth={2} strokeDasharray="5 5" />
        <Area type="monotone" dataKey="wealth" stroke="#0076ff" fillOpacity={1} fill="url(#colorWealth)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
