import { MainContent, MainLayout, Sidebar } from "./components/layout"

function App() {
  return (
    <MainLayout>
      <Sidebar />
      <MainContent />
    </MainLayout>
  )
}

export default App
