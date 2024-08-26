import { Head, useForm } from '@inertiajs/react'
import { ArrowLeftIcon, CheckIcon, Loader2Icon, XIcon } from 'lucide-react'
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [playedTracks, setPlayedTracks] = useState<Track[]>([])
  const { audio, playing, setUrl, togglePlay } = useAudioPlayerStore()
  const [foundArtist, setFoundArtist] = useState(false)
  const [foundTitle, setFoundTitle] = useState(false)

  useEffect(() => {
    if (currentTrackIndex < tracks.length) {
      setUrl(tracks[currentTrackIndex].previewUrl)
    }
  }, [tracks, currentTrackIndex])

  audio.addEventListener('canplaythrough', () => {
    audio.play()
  })
  audio.addEventListener('ended', () => {
    togglePlay()
    setTimeout(() => {
      playNextTrack()
    }, 4000)
  })

  const form = useForm({ guess: '' })

  const tryGuess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    form.processing = true

    const track = tracks[currentTrackIndex]
    let newScore = score

    const sanitizedGuess = textSanitizer(form.data.guess)

    const sanitizedTitle = textSanitizer(track.title)
    const sanitizedArtist = textSanitizer(track.artist)

    const titleLevenshteinDistance = levenshtein(sanitizedTitle, sanitizedGuess)
    const artistLevenshteinDistance = levenshtein(sanitizedArtist, sanitizedGuess)

    if (titleLevenshteinDistance < 3) {
      setFoundTitle(true)
      newScore += 30
    }

    if (artistLevenshteinDistance < 3) {
      setFoundArtist(true)
      newScore += 30
    }

    form.setData('guess', '')
    setScore(newScore)

    form.processing = false
  }

  const playNextTrack = () => {
    setFoundArtist(false)
    setFoundTitle(false)
    setPlayedTracks([...playedTracks, tracks[currentTrackIndex]])
    setCurrentTrackIndex((prev) => prev + 1)
  }

  useEffect(() => {
    if (foundTitle && foundArtist) {
      togglePlay()
      setTimeout(() => {
        playNextTrack()
      }, 4000)
    }
  }, [foundTitle, foundArtist])

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
                  {currentTrackIndex + 1} / {tracks.length}
                </p>
              </div>
            </div>
            <div className="h-72">
              {playing ? <Timer audio={audio} /> : <Song track={tracks[currentTrackIndex]} />}
            </div>

            <div className="mb-4 flex items-center justify-center rounded-3xl bg-slate-700">
              <p className="bg-gradient-to-br from-purple-300 via-purple-600 to-blue-500 bg-clip-text px-16 py-4 text-xl font-bold text-transparent">
                {score} {score < 2 ? 'pt' : 'pts'}
              </p>
            </div>
            <div className="flex items-center justify-center gap-16">
              <div className="flex items-center">
                <p className="text-center text-xl font-bold text-slate-700">Artist :</p>
                {foundArtist ? <CheckIcon size={24} /> : <XIcon size={24} />}
              </div>
              <div className="flex items-center">
                <p className="text-center text-xl font-bold text-slate-700">Title :</p>
                {foundTitle ? <CheckIcon size={24} /> : <XIcon size={24} />}
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
            {playedTracks.length > 0 && (
              <div className="px-4">
                <h2 className="text-lg font-bold text-slate-700">Previous songs :</h2>
                <div className="flex flex-col">
                  {playedTracks.map((track, idx) => (
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
