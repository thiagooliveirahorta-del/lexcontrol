type MetricCardProps = {
  title: string
  value: string
  description: string
  tone?: 'default' | 'warning' | 'danger' | 'success'
}

export function MetricCard({ title, value, description, tone = 'default' }: MetricCardProps) {
  return (
    <article className={`metric-card metric-card-${tone}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{description}</small>
    </article>
  )
}
