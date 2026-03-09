'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { formatCurrency } from '@/lib/format'
import { useTheme } from '@/hooks/useTheme'
import type { ChartDataPoint } from '@/types'

/* ── Accent lines stay the same in both themes ── */
const ACCENT_GREEN  = '#68a72c'
const ACCENT_YELLOW = '#e2b715'

/* Theme-specific chart tokens */
const DARK_TOKENS  = { axis: '#8b9a94', grid: '#ffffff08',  tooltipBg: '#1c2723', tooltipText: '#e8f5e9', tooltipBorder: 'rgba(255,255,255,0.06)', cursor: 'rgba(255,255,255,0.06)' }
const LIGHT_TOKENS = { axis: '#64748b', grid: '#E2E8F0',    tooltipBg: '#ffffff', tooltipText: '#113344', tooltipBorder: 'rgba(0,0,0,0.08)',       cursor: 'rgba(0,0,0,0.06)' }

/* Derive a cost-basis series: ~82 % of portfolio value each month */
function withCost(data: ChartDataPoint[]) {
  return data.map((p) => ({ ...p, custo: Math.round(p.value * 0.82) }))
}

interface Props {
  data: ChartDataPoint[]
  loading: boolean
}

export function PortfolioChart({ data, loading }: Props) {
  const chartData = withCost(data)
  const { isDark }  = useTheme()
  const t           = isDark ? DARK_TOKENS : LIGHT_TOKENS

  return (
    <Card>
      <CardHeader>
        <CardTitle>Margem de Lucro por Safra</CardTitle>
        <span className="text-xs text-dim/60">Últimos 6 meses</span>
      </CardHeader>

      {loading ? (
        <Skeleton className="h-52 w-full rounded-2xl" />
      ) : (
        <ResponsiveContainer width="100%" height={190}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="lucroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={ACCENT_GREEN} stopOpacity={0.28} />
                <stop offset="95%" stopColor={ACCENT_GREEN} stopOpacity={0}    />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: t.axis }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 10, fill: t.axis }}
              axisLine={false}
              tickLine={false}
              width={34}
            />

            <Tooltip
              formatter={(value, name) => [
                formatCurrency(Number(value)),
                name === 'value' ? 'Lucro' : 'Custo estimado',
              ]}
              contentStyle={{
                background:   t.tooltipBg,
                border:       `1px solid ${t.tooltipBorder}`,
                borderRadius: '14px',
                fontSize:     '12px',
                color:        t.tooltipText,
              }}
              labelStyle={{ color: t.axis, marginBottom: 4 }}
              cursor={{ stroke: t.cursor, strokeWidth: 1 }}
            />

            <Legend
              iconType="circle"
              iconSize={6}
              formatter={(value) => (
                <span style={{ color: t.axis, fontSize: 11 }}>
                  {value === 'value' ? 'Lucro' : 'Custo estimado'}
                </span>
              )}
            />

            {/* Custo — yellow stroke, no fill */}
            <Area
              type="monotone"
              dataKey="custo"
              stroke={ACCENT_YELLOW}
              strokeWidth={1.5}
              fill="none"
              dot={false}
              activeDot={{ r: 3, fill: ACCENT_YELLOW, strokeWidth: 0 }}
            />

            {/* Lucro — green stroke with area gradient fill */}
            <Area
              type="monotone"
              dataKey="value"
              stroke={ACCENT_GREEN}
              strokeWidth={2}
              fill="url(#lucroGradient)"
              dot={false}
              activeDot={{ r: 4, fill: ACCENT_GREEN, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
