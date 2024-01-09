import DabarTabs from "@/components/domains/dabar/DabarTabs/DabarTabs"

export default function DabarLayout(props: {
  children: React.ReactNode
}) {
  return (
    <div className="py-8">
      <DabarTabs />
      {props.children}
    </div>
  )
}