import type { ReactNode } from 'react'

type PanelProps = {
  title?: string
  children: ReactNode
  highlight?: boolean
}

export function Panel({ title, children, highlight = false }: PanelProps) {
  return (
    <section className={`panel ${highlight ? 'panel-highlight' : ''}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  )
}
