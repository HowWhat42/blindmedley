import { Head, useForm } from '@inertiajs/react'
import { ArrowLeftIcon, CheckIcon, Loader2Icon, PauseIcon, PlayIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import Playlist from '#models/playlist'
import Track from '#models/track'
import Song from '~/components/song'
import Timer from '~/components/timer'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import useUser from '~/hooks/use_user'
import { Layout } from '~/layouts/layout'
import { levenshtein, textSanitizer } from '~/lib/utils'
import useAudioPlayerStore from '~/stores/audio_player_store'

const Play = ({ playlist, tracks }: { playlist: Playlist; tracks: Track[] }) => {
  const user = useUser()
  const { audio, playing, setUrl, togglePlay } = useAudioPlayerStore()
  const [state, setState] = useState<{
    currentTrackIndex: number
    score: number
    playedTracks: Track[]
    foundArtist: boolean
    foundTitle: boolean
  }>({
    currentTrackIndex: 0,
    score: 0,
    playedTracks: [],
    foundArtist: false,
    foundTitle: false,
  })

  useEffect(() => {
    if (state.currentTrackIndex < tracks.length) {
      setUrl(tracks[state.currentTrackIndex].previewUrl)
    }
  }, [tracks, state.currentTrackIndex])

  useEffect(() => {
    const handleCanPlayThrough = () => {
      audio.play()
    }

    const handleEnded = () => {
      togglePlay()
      setTimeout(() => {
        playNextTrack()
      }, 4000)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audio, togglePlay])

  useEffect(() => {
    if (state.foundTitle && state.foundArtist) {
      togglePlay()
      setTimeout(() => {
        playNextTrack()
      }, 4000)
    }
  }, [state.foundTitle, state.foundArtist])

  const form = useForm({ guess: '' })

  const tryGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.processing = true

    const track = tracks[state.currentTrackIndex]
    let newScore = state.score

    const sanitizedGuess = textSanitizer(form.data.guess)

    const sanitizedTitle = textSanitizer(track.title)
    const sanitizedArtist = textSanitizer(track.artist)

    const titleLevenshteinDistance = levenshtein(sanitizedTitle, sanitizedGuess)
    const artistLevenshteinDistance = levenshtein(sanitizedArtist, sanitizedGuess)

    const foundTitle = titleLevenshteinDistance < 3
    const foundArtist = artistLevenshteinDistance < 3

    if (foundTitle) {
      newScore += 30
    }

    if (foundArtist) {
      newScore += 30
    }

    form.setData('guess', '')
    setState((prevState) => ({
      ...prevState,
      score: newScore,
      foundTitle: prevState.foundTitle ? prevState.foundTitle : foundTitle,
      foundArtist: prevState.foundArtist ? prevState.foundArtist : foundArtist,
    }))

    form.processing = false
  }

  const playNextTrack = () => {
    setState((prevState) => ({
      ...prevState,
      foundArtist: false,
      foundTitle: false,
      playedTracks: [...prevState.playedTracks, tracks[prevState.currentTrackIndex]],
      currentTrackIndex: prevState.currentTrackIndex + 1,
    }))
  }

  const onLeave = () => {
    togglePlay()
  }

  return (
    <>
      <Head title={playlist.title} />

      <Layout user={user}>
        <button onClick={onLeave}>
          <ArrowLeftIcon size={40} />
        </button>
        <div className="flex w-full justify-center">
          <div className="flex w-1/3 flex-col items-center justify-center pt-6">
            <div className="flex items-center justify-center">
              <div>
                <h1 className="text-center text-xl font-bold text-slate-700">
                  Playlist : {playlist.title}
                </h1>
                <p className="text-center font-light text-slate-500">
                  {state.currentTrackIndex + 1} / {tracks.length}
                </p>
              </div>
            </div>
            <div className="h-72">
              {playing ? <Timer audio={audio} /> : <Song track={tracks[state.currentTrackIndex]} />}
            </div>

            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="flex items-center justify-center rounded-3xl bg-slate-700">
                <p className="bg-gradient-to-br from-purple-300 via-purple-600 to-blue-500 bg-clip-text px-16 py-4 text-xl font-bold text-transparent">
                  {state.score} {state.score < 2 ? 'pt' : 'pts'}
                </p>
              </div>
              <button onClick={togglePlay}>
                {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
              </button>
            </div>
            <div className="flex items-center justify-center gap-16">
              <div className="flex items-center">
                <p className="text-center text-xl font-bold text-slate-700">Artist :</p>
                {state.foundArtist ? <CheckIcon size={24} /> : <XIcon size={24} />}
              </div>
              <div className="flex items-center">
                <p className="text-center text-xl font-bold text-slate-700">Title :</p>
                {state.foundTitle ? <CheckIcon size={24} /> : <XIcon size={24} />}
              </div>
            </div>
            <form onSubmit={tryGuess} className="w-full space-y-4">
              <div className="grid gap-1">
                <Label>Answer</Label>
                <Input
                  id="guess"
                  placeholder="Your answer"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={form.processing}
                  value={form.data.guess}
                  onChange={(e) => form.setData('guess', e.target.value)}
                />
              </div>

              <Button type="submit" disabled={form.processing} className="w-full">
                {form.processing ? <Loader2Icon size={24} className="animate-spin" /> : 'Check'}
              </Button>
            </form>
            {state.playedTracks.length > 0 && (
              <div className="px-4">
                <h2 className="text-lg font-bold text-slate-700">Previous songs :</h2>
                <div className="flex flex-col">
                  {state.playedTracks.map((track, idx) => (
                    <Song inline track={track} key={idx} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Play
