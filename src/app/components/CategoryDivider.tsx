
export function CategoryDivider({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <div className="w-full h-[1px] bg-dark"></div>
      <h2 className="font-medium px-5 text-dark whitespace-nowrap">{text}</h2>
      <div className="w-full h-[1px] bg-dark"></div>
    </div>
  )
}