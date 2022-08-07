import Image from 'next/image'
import { Track } from '../../utils/api/spotify/types'

export const TrackItem: React.FC<{ track: Track; className?: string }> = ({
  track,
  className,
}) => {
  if (!track) return

  const image = track.album.images.filter(image => image.width === 64)[0]

  return (
    <div
      className={[
        '-m-1.5 flex rounded-lg p-1.5 transition-colors hover:bg-gray-50',
        className,
      ].join(' ')}
    >
      <div
        className="h-12 w-12 flex-shrink-0 overflow-hidden rounded"
        title={track.album.name}
      >
        <Image
          src={image.url}
          alt={track.album.name}
          width={image.width}
          height={image.height}
        />
      </div>
      <div className="ml-3 overflow-hidden">
        <div className="max-w-full truncate font-medium" title={track.name}>
          {track.name}
        </div>
        <div className="text-sm text-gray-600">{track.artists[0].name}</div>
      </div>
    </div>
  )
}
