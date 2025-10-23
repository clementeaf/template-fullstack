export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-100/40 h-[100vh] w-[100vw] flex p-4 gap-4">
      {children}
    </div>
  )
}