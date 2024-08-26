import Track from '#models/track'

type Props = {
  track: Track
  inline?: boolean
}

const Song = ({ track, inline }: Props) => {
  const date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  }).format(new Date(track.releaseDate))

  return (
    <div className={`flex ${!inline && 'flex-col'} mb-4 items-center text-slate-500`}>
      <div className="ml-4 flex flex-col">
        <h3 className="text-lg font-bold">{track.title}</h3>
        <h4 className="font-bold">{track.artist}</h4>
        <h5 className="text-sm">
          Album : {track.album} / {date}
        </h5>
      </div>
    </div>
  )
}

export default Song
