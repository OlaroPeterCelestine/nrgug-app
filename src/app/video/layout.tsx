export default function VideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="video-page-layout" style={{ paddingBottom: 0 }}>
      {children}
    </div>
  )
}
