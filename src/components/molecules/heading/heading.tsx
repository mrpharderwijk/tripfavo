type HeadingGroupProps = {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function HeadingGroup({ title, subtitle }: HeadingGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-title-lg font-semibold">{title}</div>
      <div className="text-base-xl font-medium text-grey-700">{subtitle}</div>
    </div>
  )
}
