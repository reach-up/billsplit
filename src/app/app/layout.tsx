export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-start justify-start flex-grow w-full px-4 py-8 gap-4 max-w-[300px] md:max-w-[388px]">
      {children}
    </main>
  );
}
