export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-10">
      <div style={{ backgroundColor: "blue", height: "50px" }}>
        블로깅 공용 레이아웃 영역
      </div>
      {children}
    </div>
  );
}
