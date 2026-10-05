import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { FlaskConical, Table, CheckCircle2, Copy, Download } from 'lucide-react';
import experimentData from '../data/experimentalResults.json';

export const ExperimentView: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const categoryBarData = experimentData.categoryStats.map(c => ({
    name: c.categoryName.replace(/^[A-E]\s*/, ''),
    fullName: c.categoryName,
    avgScore: c.avgScore,
    avgEntropy: c.avgEntropyBits
  }));

  const lengthLineData = experimentData.lengthVsScore;
  const pieData = experimentData.overallDistribution;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(experimentData, null, 2));
    setCopiedFormat('JSON');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownloadCsv = () => {
    let csv = 'Category,SampleCount,AvgLength,AvgDiversity,AvgScore,AvgEntropyBits,WeakPct,MediumPct,StrongPct\n';
    experimentData.categoryStats.forEach(c => {
      csv += `${c.categoryName},${c.sampleCount},${c.avgLength},${c.avgDiversity},${c.avgScore},${c.avgEntropyBits},${c.weakPct}%,${c.mediumPct}%,${c.strongPct}%\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'passwordguard_experimental_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Overview Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="card-title">
              <FlaskConical size={20} color="#00f2fe" />
              Experimental Evaluation & Synthetic Benchmark
            </h2>
            <p className="card-desc">
              Rigorous, reproducible evaluation of {experimentData.metadata.totalTested} synthetic test passwords categorized across 5 structural paradigms.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              id="copy-json-btn"
              className="btn-outline"
              onClick={handleCopyJson}
              type="button"
            >
              <Copy size={16} />
              {copiedFormat === 'JSON' ? 'Copied JSON!' : 'Copy JSON'}
            </button>
            <button
              id="download-csv-btn"
              className="btn-primary"
              onClick={handleDownloadCsv}
              type="button"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Quick Highlights Summary Cards */}
        <div className="grid-3" style={{ marginTop: '0.5rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Tested Samples</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
              {experimentData.metadata.totalTested}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>30 per category across 5 categories</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Average Strength</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
              90.0 / 100
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Category E (Long Random Passwords)</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Max Average Entropy</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#00f2fe', fontFamily: 'var(--font-mono)' }}>
              182.9 bits
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Category D (Long Passphrases, 31.1 avg length)</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Chart 1: Average Strength by Category */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
            Chart 1: Average Strength Score by Category
          </h3>
          <p className="card-desc">Comparison of heuristic score (0-100) across structural groups.</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={categoryBarData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 100`, 'Avg Score']}
                />
                <Bar dataKey="avgScore" fill="#00f2fe" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Length vs Strength Score */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
            Chart 2: Password Length vs. Average Score
          </h3>
          <p className="card-desc">Positive correlation between character length and strength score.</p>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={lengthLineData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="length" stroke="#94a3b8" fontSize={11} label={{ value: 'Length (chars)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} / 100`, 'Avg Score']}
                />
                <Line type="monotone" dataKey="avgScore" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart 3 & Results Table */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Chart 3: Overall Distribution */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
            Chart 3: Overall Classification Distribution
          </h3>
          <p className="card-desc">Proportion of all 150 synthetic passwords in Weak, Medium, and Strong tiers.</p>
          <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="tier"
                  label={({ name, percent }: any) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any, name: any) => [`${val} samples (${((val / 150) * 100).toFixed(1)}%)`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dataset Breakdown / Key Conclusions */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            Empirical Findings & Conclusions
          </h3>
          <p className="card-desc">Generated directly from the 150 executed synthetic tests.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {experimentData.conclusions.map((conc, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                <span style={{ color: '#00f2fe', fontWeight: 700 }}>•</span>
                <div>{conc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Results Table */}
      <div className="card">
        <h3 className="card-title">
          <Table size={18} color="#00f2fe" />
          Aggregated Results Table by Category
        </h3>
        <p className="card-desc">Metrics generated from <code style={{ fontFamily: 'var(--font-mono)' }}>data/results.json</code> and <code style={{ fontFamily: 'var(--font-mono)' }}>data/results.csv</code>.</p>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Avg. Length</th>
                <th>Avg. Diversity</th>
                <th>Avg. Score</th>
                <th>Avg. Entropy</th>
                <th>Weak (%)</th>
                <th>Medium (%)</th>
                <th>Strong (%)</th>
              </tr>
            </thead>
            <tbody>
              {experimentData.categoryStats.map(cat => (
                <tr key={cat.categoryKey}>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>{cat.categoryName}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{cat.sampleCount}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{cat.avgLength}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{cat.avgDiversity} / 4</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: cat.avgScore < 40 ? '#f87171' : cat.avgScore < 70 ? '#fbbf24' : '#34d399' }}>
                    {cat.avgScore} / 100
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#93c5fd' }}>{cat.avgEntropyBits} bits</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: cat.weakPct > 50 ? '#f87171' : 'inherit' }}>{cat.weakPct}%</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: cat.mediumPct > 0 ? '#fbbf24' : 'inherit' }}>{cat.mediumPct}%</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: cat.strongPct > 50 ? '#34d399' : 'inherit' }}>{cat.strongPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
