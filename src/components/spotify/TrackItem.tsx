import Image from 'next/image'
import { Track } from '../../utils/api/spotify/types'

export const TrackItem: React.FC<{ track: Track }> = ({ track }) => {
  const image = track.album.images.filter(image => image.width === 64)[0]

  return (
    <div className="flex gap-2">
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
        <Image
          src={image.url}
          alt={track.album.name}
          width={image.width}
          height={image.height}
        />
      </div>
      <div>
        <div className="font-medium">{track.name}</div>
        <div className="text-sm text-gray-600">{track.artists[0].name}</div>
      </div>
    </div>
  )
}
