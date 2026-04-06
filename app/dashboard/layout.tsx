import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex font-sans">
      <Sidebar />
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}