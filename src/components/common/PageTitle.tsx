type PageTitleProps = {
  title: string;
  subtitle: string;
};

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="pageTitle">
      <p>LexControl</p>
      <h1>{title}</h1>
      <span>{subtitle}</span>
    </div>
  );
}
