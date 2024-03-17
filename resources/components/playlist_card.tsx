const PlaylistCard = () => {
  return (
    <div className="w-[400px] overflow-hidden h-64 relative rounded-2xl group hover:cursor-pointer">
      <img
        className="w-full h-full object-cover object-center group-hover:scale-125 transition-all duration-500"
        src="https://picsum.photos/400/400?random=1"
      />
      <div className="opacity-0 w-full h-full bottom-0 absolute bg-black/10 group-hover:opacity-100 transition-all duration-500" />
      <p className="flex opacity-0 absolute top-0 w-full h-full justify-center items-center text-violet-50 uppercase text-3xl font-black group-hover:opacity-100 transition-all duration-500">
        Start game
      </p>
      <div className="w-full h-20 bottom-0 absolute bg-gradient-to-t from-black to-transparent" />
      <div className="absolute left-4 bottom-4 flex-col justify-end items-start">
        <p className="text-violet-50 text-xl font-black group-hover:opacity-0 transition-all duration-300">
          Title
        </p>
        <p className="text-violet-50 text-lg font-medium group-hover:opacity-0 transition-all duration-300">
          30 tracks
        </p>
      </div>
      <div className="w-full h-2.5 absolute bottom-0 bg-violet-700 group-hover:opacity-0 transition-all duration-300" />
    </div>
  )
}

export default PlaylistCard
