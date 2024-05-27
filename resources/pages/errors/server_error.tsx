export default function ServerError(props: { error: any }) {
  return (
    <>
      <div className="container">
        <div className="text-3xl">Server Error</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}
