const NotFound = () => {
  return (
    <div>
      <h1 className="absolute top-32 left-10 text-6xl font-bold text-white">
        404: Page not found <br />
        <br /> I think you&apos;re lost in the sea
      </h1>
      <video src="./assets/waves.mp4" autoPlay loop muted />
    </div>
  )
}

export default NotFound
