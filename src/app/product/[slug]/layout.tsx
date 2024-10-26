export default function Layout({
    modal,
    children,
  }: {
    modal: React.ReactNode
    children: React.ReactNode
  }) {
    return (
      <>
        <div>{children}</div>
        <div>{modal}</div>
      </>
    )
  }