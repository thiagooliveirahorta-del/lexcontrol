type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
