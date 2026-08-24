export interface Track {
  title: string;
  duration: string;
}

export interface ArtistPlaylist {
  id: string;
  name: string;
  image: string;
  tracks: Track[];
}

export const musicPlaylists: ArtistPlaylist[] = [
  {
    id: '1',
    name: 'Taylor Swift',
    image: '/bloom/taylor.webp',
    tracks: [
      { title: 'Cruel Summer', duration: '2:58' },
      { title: 'Anti-Hero', duration: '3:20' },
      { title: 'Cardigan', duration: '3:59' },
      { title: 'Lover', duration: '3:41' },
      { title: 'Blank Space', duration: '3:51' }
    ]
  },
  {
    id: '2',
    name: 'BTS',
    image: '/bloom/bts.jpg',
    tracks: [
      { title: 'Dynamite', duration: '3:19' },
      { title: 'Butter', duration: '2:44' },
      { title: 'Spring Day', duration: '4:34' },
      { title: 'Life Goes On', duration: '3:27' },
      { title: 'Boy With Luv', duration: '3:49' }
    ]
  },
  {
    id: '3',
    name: 'Lana Del Rey',
    image: '/bloom/lana.jpg',
    tracks: [
      { title: 'Summertime Sadness', duration: '4:25' },
      { title: 'Born to Die', duration: '4:46' },
      { title: 'Video Games', duration: '4:42' },
      { title: 'Quest for the Culture', duration: '3:35' },
      { title: 'Say Yes to Heaven', duration: '3:29' }
    ]
  },
  {
    id: '4',
    name: 'Harry Styles',
    image: '/bloom/harry.jpg',
    tracks: [
      { title: 'As It Was', duration: '2:47' },
      { title: 'Watermelon Sugar', duration: '2:54' },
      { title: 'Golden', duration: '3:28' },
      { title: 'Falling', duration: '4:00' },
      { title: 'Adore You', duration: '3:27' }
    ]
  },
  {
    id: '5',
    name: 'Shawn Mendes',
    image: '/bloom/shawn.jpg',
    tracks: [
      { title: 'Senorita', duration: '3:10' },
      { title: 'Treat You Better', duration: '3:07' },
      { title: 'Stitches', duration: '3:26' },
      { title: "There's Nothing Holdin' Me Back", duration: '3:19' },
      { title: 'In My Blood', duration: '3:31' }
    ]
  }
];