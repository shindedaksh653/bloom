import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music as MusicIcon } from 'lucide-react';
import type { Song } from '../App';

interface MusicProps {
  currentUser: string;
  currentSong: Song | null;
  setCurrentSong: (song: Song) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentTime: number;
  duration: number;
  handleSeek: (newTime: number) => void;
}

export default function Music({
  currentUser: _currentUser,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  currentTime,
  duration,
  handleSeek
}: MusicProps) {
  const [selectedArtist, setSelectedArtist] = useState('Taylor Swift');

  const taylorSongs: Song[] = [
    { title: 'All Too Well', artist: 'Taylor Swift', duration: '5:29', file: '/music/All to well.mp3' },
    { title: 'August', artist: 'Taylor Swift', duration: '4:21', file: '/music/august.mp3' },
    { title: 'Blank Space', artist: 'Taylor Swift', duration: '3:51', file: '/music/blankspace.mp3' },
    { title: 'Cardigan', artist: 'Taylor Swift', duration: '3:59', file: '/music/cardigan.mp3' },
    { title: 'Cassandra', artist: 'Taylor Swift', duration: '4:00', file: '/music/Cassandra.mp3' },
    { title: 'Cruel Summer', artist: 'Taylor Swift', duration: '2:58', file: '/music/cruel summer.mp3' },
    { title: 'Enchanted', artist: 'Taylor Swift', duration: '5:52', file: '/music/Enchanted.mp3' },
    { title: 'Exile', artist: 'Taylor Swift', duration: '4:45', file: '/music/exile.mp3' },
    { title: 'Father Figure', artist: 'Taylor Swift', duration: '3:55', file: '/music/Father Figure.mp3' },
    { title: 'Fearless', artist: 'Taylor Swift', duration: '4:01', file: '/music/Fearless.mp3' },
    { title: 'Guilty as Sin', artist: 'Taylor Swift', duration: '4:14', file: '/music/Guilty as Sin.mp3' },
    { title: 'Lover', artist: 'Taylor Swift', duration: '3:41', file: '/music/Lover.mp3' },
    { title: 'Love Story', artist: 'Taylor Swift', duration: '3:55', file: '/music/Lovestory.mp3' },
    { title: 'Ruin the Friendship', artist: 'Taylor Swift', duration: '3:30', file: '/music/Ruin the Friendship.mp3' },
    { title: 'The Archer', artist: 'Taylor Swift', duration: '3:31', file: '/music/The Archer.mp3' },
    { title: 'The Black Dog', artist: 'Taylor Swift', duration: '3:58', file: '/music/The Black Dog.mp3' },
    { title: 'The Fate of Ophelia', artist: 'Taylor Swift', duration: '3:45', file: '/music/The Fate of Ophelia .mp3' },
    { title: 'The Tortured Poets Department', artist: 'Taylor Swift', duration: '4:53', file: '/music/ttpd.mp3' },
    { title: 'The Way I Loved You', artist: 'Taylor Swift', duration: '4:04', file: '/music/loved.mp3' },
    { title: 'You Belong With Me', artist: 'Taylor Swift', duration: '3:52', file: '/music/You Belong With Me.mp3' }
  ];

  const lanaSongs: Song[] = [
    { title: 'A&W', artist: 'Lana Del Rey', duration: '7:13', file: '/music/A&W.mp3' },
    { title: 'Art Deco', artist: 'Lana Del Rey', duration: '4:55', file: '/music/Art Deco [QbLGjeR9bvI].mp3' },
    { title: 'Brooklyn Baby', artist: 'Lana Del Rey', duration: '5:51', file: '/music/Brooklyn Baby .mp3' },
    { title: 'Born to Die (BTD)', artist: 'Lana Del Rey', duration: '4:46', file: '/music/BTD.mp3' },
    { title: 'Chemtrails Over The Country Club', artist: 'Lana Del Rey', duration: '4:31', file: '/music/Chemtrails Over The Country Club.mp3' },
    { title: 'Cinnamon Girl', artist: 'Lana Del Rey', duration: '5:00', file: '/music/ CinnamonGirl.mp3' },
    { title: 'Dark Paradise', artist: 'Lana Del Rey', duration: '4:03', file: '/music/Dark Paradise .mp3' },
    { title: 'Happiness is a Butterfly', artist: 'Lana Del Rey', duration: '4:03', file: '/music/Happiness is a butterfly .mp3' },
    { title: 'How to Disappear', artist: 'Lana Del Rey', duration: '3:48', file: '/music/How to disappear .mp3' },
    { title: 'Love', artist: 'Lana Del Rey', duration: '4:32', file: '/music/love.mp3' },
    { title: 'Music To Watch Boys To', artist: 'Lana Del Rey', duration: '4:51', file: '/music/Music To Watch Boys To .mp3' },
    { title: 'Radio', artist: 'Lana Del Rey', duration: '3:34', file: '/music/ Radio.mp3' },
    { title: 'Salvatore', artist: 'Lana Del Rey', duration: '4:41', file: '/music/Salvatore.mp3' },
    { title: 'Say Yes To Heaven', artist: 'Lana Del Rey', duration: '3:29', file: '/music/Say Yes To Heaven .mp3' },
    { title: 'The Other Woman', artist: 'Lana Del Rey', duration: '3:01', file: '/music/the other women.mp3' },
    { title: 'Ultraviolence', artist: 'Lana Del Rey', duration: '4:11', file: '/music/Ultraviolence .mp3' },
    { title: 'Video Games', artist: 'Lana Del Rey', duration: '4:42', file: '/music/Video Games .mp3' },
    { title: 'West Coast', artist: 'Lana Del Rey', duration: '4:16', file: '/music/West Coast .mp3' },
    { title: 'White Mustang', artist: 'Lana Del Rey', duration: '2:44', file: '/music/White Mustang .mp3' },
    { title: 'Young and Beautiful', artist: 'Lana Del Rey', duration: '3:56', file: '/music/Young and Beautiful.mp3' }
  ];

  const btsSongs: Song[] = [
    { title: 'Black Swan', artist: 'BTS', duration: '3:18', file: '/bts/Black Swan.mp3' },
    { title: 'Blood Sweat & Tears', artist: 'BTS', duration: '3:37', file: '/bts/Blood Sweat & Tears.mp3' },
    { title: 'Boy With Luv', artist: 'BTS', duration: '3:49', file: '/bts/Boy With Luv.mp3' },
    { title: 'Butter', artist: 'BTS', duration: '2:44', file: '/bts/Butter.mp3' },
    { title: 'Butterfly', artist: 'BTS', duration: '4:00', file: '/bts/Butterfly.mp3' },
    { title: 'DNA', artist: 'BTS', duration: '3:43', file: '/bts/DNA.mp3' },
    { title: 'Dynamite', artist: 'BTS', duration: '3:19', file: '/bts/Dynamite.mp3' },
    { title: 'Euphoria', artist: 'BTS', duration: '4:00', file: '/bts/Euphoria.mp3' },
    { title: 'Fake Love', artist: 'BTS', duration: '4:06', file: '/bts/Fake Love.mp3' },
    { title: 'I Need U', artist: 'BTS', duration: '3:35', file: '/bts/I Need U.mp3' },
    { title: 'Life Goes On', artist: 'BTS', duration: '3:27', file: '/bts/Life Goes On.mp3' },
    { title: 'Love Yourself', artist: 'BTS', duration: '2:27', file: '/bts/LOVE YOURSELF.mp3' },
    { title: 'Magic Shop', artist: 'BTS', duration: '4:00', file: '/bts/MAGIC SHOP .mp3' },
    { title: 'Make It Right', artist: 'BTS', duration: '3:42', file: '/bts/Make It Right .mp3' },
    { title: 'Mikrokosmos', artist: 'BTS', duration: '4:00', file: '/bts/Mikrokosmos.mp3' },
    { title: 'Permission to Dance', artist: 'BTS', duration: '3:07', file: '/bts/Permission to Dance.mp3' },
    { title: 'Spring Day', artist: 'BTS', duration: '4:35', file: '/bts/Spring Day.mp3' },
    { title: 'Swim', artist: 'BTS', duration: '3:00', file: '/bts/SWIM.mp3' },
    { title: 'The Truth Untold', artist: 'BTS', duration: '4:00', file: '/bts/The Truth Untold.mp3' },
    { title: 'Yet To Come', artist: 'BTS', duration: '4:14', file: '/bts/Yet To Come .mp3' }
  ];

  const harrySongs: Song[] = [
    { title: 'Adore You', artist: 'Harry Styles', duration: '3:27', file: '/harry/Adore You .mp3' },
    { title: 'As It Was', artist: 'Harry Styles', duration: '2:47', file: '/harry/As It Was .mp3' },
    { title: 'Cinema', artist: 'Harry Styles', duration: '4:03', file: '/harry/Cinema.mp3' },
    { title: 'Daylight', artist: 'Harry Styles', duration: '2:45', file: '/harry/Daylight .mp3' },
    { title: 'Falling', artist: 'Harry Styles', duration: '4:00', file: '/harry/Falling.mp3' },
    { title: 'Fine Line', artist: 'Harry Styles', duration: '6:17', file: '/harry/Fine Line.mp3' },
    { title: 'From the Dining Table', artist: 'Harry Styles', duration: '3:31', file: '/harry/From the Dining Table.mp3' },
    { title: 'Golden', artist: 'Harry Styles', duration: '3:28', file: '/harry/Golden.mp3' },
    { title: 'Keep Driving', artist: 'Harry Styles', duration: '2:19', file: '/harry/Keep Driving.mp3' },
    { title: 'Kiwi', artist: 'Harry Styles', duration: '2:56', file: '/harry/Kiwi.mp3' },
    { title: 'Late Night Talking', artist: 'Harry Styles', duration: '2:58', file: '/harry/Late Night Talking .mp3' },
    { title: 'Lights Up', artist: 'Harry Styles', duration: '2:52', file: '/harry/Lights Up.mp3' },
    { title: 'Little Freak', artist: 'Harry Styles', duration: '3:23', file: '/harry/Little Freak.mp3' },
    { title: 'Love Of My Life', artist: 'Harry Styles', duration: '3:11', file: '/harry/Love Of My Life .mp3' },
    { title: 'Matilda', artist: 'Harry Styles', duration: '4:05', file: '/harry/Matilda .mp3' },
    { title: 'Satellite', artist: 'Harry Styles', duration: '3:37', file: '/harry/Satellite .mp3' },
    { title: 'Sign of the Times', artist: 'Harry Styles', duration: '5:40', file: '/harry/Sign of the Times .mp3' },
    { title: 'Sweet Creature', artist: 'Harry Styles', duration: '3:44', file: '/harry/Sweet Creature.mp3' },
    { title: 'Two Ghosts', artist: 'Harry Styles', duration: '3:49', file: '/harry/Two Ghosts.mp3' },
    { title: 'Watermelon Sugar', artist: 'Harry Styles', duration: '2:54', file: '/harry/Watermelon Sugar .mp3' }
  ];

  const shawnSongs: Song[] = [
    { title: "Fallin' All In You", artist: 'Shawn Mendes', duration: '3:55', file: "/shawn/Fallin' All In You.mp3" },
    { title: 'Heart of Gold', artist: 'Shawn Mendes', duration: '4:30', file: '/shawn/Heart of Gold.mp3' },
    { title: "If I Can't Have You", artist: 'Shawn Mendes', duration: '3:11', file: "/shawn/If I Can't Have You .mp3" },
    { title: 'In My Blood', artist: 'Shawn Mendes', duration: '3:31', file: '/shawn/In My Blood.mp3' },
    { title: "It'll Be Okay", artist: 'Shawn Mendes', duration: '3:43', file: "/shawn/It'll Be Okay.mp3" },
    { title: 'Like This', artist: 'Shawn Mendes', duration: '3:06', file: '/shawn/Like This.mp3' },
    { title: 'Lost In Japan', artist: 'Shawn Mendes', duration: '3:21', file: '/shawn/Lost In Japan.mp3' },
    { title: 'Mercy', artist: 'Shawn Mendes', duration: '3:28', file: '/shawn/Mercy .mp3' },
    { title: 'Never Be Alone', artist: 'Shawn Mendes', duration: '3:36', file: '/shawn/Never Be Alone.mp3' },
    { title: 'Nobody Knows', artist: 'Shawn Mendes', duration: '3:35', file: '/shawn/Nobody Knows.mp3' },
    { title: 'Perfectly Wrong', artist: 'Shawn Mendes', duration: '3:32', file: '/shawn/Perfectly Wrong.mp3' },
    { title: 'Senorita', artist: 'Shawn Mendes', duration: '3:11', file: '/shawn/Senorita .mp3' },
    { title: 'Stitches', artist: 'Shawn Mendes', duration: '3:27', file: '/shawn/Stitches.mp3' },
    { title: "There's Nothing Holdin' Me Back", artist: 'Shawn Mendes', duration: '3:19', file: "/shawn/There's Nothing Holdin' Me Back .mp3" },
    { title: 'Three Empty Words', artist: 'Shawn Mendes', duration: '3:19', file: '/shawn/Three Empty Words .mp3' },
    { title: 'Treat You Better', artist: 'Shawn Mendes', duration: '3:07', file: '/shawn/Treat You Better.mp3' },
    { title: "When You're Gone", artist: 'Shawn Mendes', duration: '2:53', file: "/shawn/When You're Gone.mp3" },
    { title: 'Where Were You In The Morning', artist: 'Shawn Mendes', duration: '3:30', file: '/shawn/Where Were You In The Morning.mp3' },
    { title: 'Wonder', artist: 'Shawn Mendes', duration: '2:52', file: '/shawn/Wonder.mp3' },
    { title: 'Youth', artist: 'Shawn Mendes', duration: '3:10', file: '/shawn/Youth.mp3' }
  ];

  const oliviaSongs: Song[] = [
    { title: 'American Bitch', artist: 'Olivia Rodrigo', duration: '3:00', file: '/olivia/american bitch .mp3' },
    { title: 'Brutal', artist: 'Olivia Rodrigo', duration: '2:23', file: '/olivia/brutal.mp3' },
    { title: 'Deja Vu', artist: 'Olivia Rodrigo', duration: '3:35', file: '/olivia/deja vu.mp3' },
    { title: 'Drivers License', artist: 'Olivia Rodrigo', duration: '4:02', file: '/olivia/drivers license.mp3' },
    { title: 'Jealousy, Jealousy', artist: 'Olivia Rodrigo', duration: '2:53', file: '/olivia/ealousy, jealousy.mp3' },
    { title: 'Enough for You', artist: 'Olivia Rodrigo', duration: '3:22', file: '/olivia/enough for you .mp3' },
    { title: 'Favorite Crime', artist: 'Olivia Rodrigo', duration: '2:32', file: '/olivia/favorite crime .mp3' },
    { title: 'Get Him Back!', artist: 'Olivia Rodrigo', duration: '3:31', file: '/olivia/get him back.mp3' },
    { title: 'Good 4 U', artist: 'Olivia Rodrigo', duration: '2:58', file: '/olivia/good 4 u.mp3' },
    { title: 'Happier', artist: 'Olivia Rodrigo', duration: '2:55', file: '/olivia/happier.mp3' },
    { title: 'Lacy', artist: 'Olivia Rodrigo', duration: '2:57', file: '/olivia/lacy.mp3' },
    { title: 'Logical', artist: 'Olivia Rodrigo', duration: '3:51', file: '/olivia/logical.mp3' },
    { title: 'Love Is Embarrassing', artist: 'Olivia Rodrigo', duration: '2:34', file: '/olivia/love is embarrassing.mp3' },
    { title: 'Making the Bed', artist: 'Olivia Rodrigo', duration: '3:18', file: '/olivia/making the bed .mp3' },
    { title: 'Obsessed', artist: 'Olivia Rodrigo', duration: '2:50', file: '/olivia/obsessed.mp3' },
    { title: 'So American', artist: 'Olivia Rodrigo', duration: '2:48', file: '/olivia/so american.mp3' },
    { title: 'Teenage Dream', artist: 'Olivia Rodrigo', duration: '3:42', file: '/olivia/teenage dream.mp3' },
    { title: 'The Grudge', artist: 'Olivia Rodrigo', duration: '3:09', file: '/olivia/the grudge.mp3' },
    { title: 'Traitor', artist: 'Olivia Rodrigo', duration: '3:49', file: '/olivia/traitor.mp3' },
    { title: 'Vampire', artist: 'Olivia Rodrigo', duration: '3:39', file: '/olivia/vampire .mp3' }
  ];

  const artistsData: { [key: string]: Song[] } = {
    'Taylor Swift': taylorSongs,
    'Lana Del Rey': lanaSongs,
    'BTS': btsSongs,
    'Harry Styles': harrySongs,
    'Shawn Mendes': shawnSongs,
    'Olivia Rodrigo': oliviaSongs
  };

  const activeSong = currentSong || taylorSongs[0];

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const list = artistsData[selectedArtist] || taylorSongs;
    const currentIndex = list.findIndex((s: Song) => s.title === activeSong.title);
    const nextIndex = (currentIndex + 1) % list.length;
    setCurrentSong(list[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const list = artistsData[selectedArtist] || taylorSongs;
    const currentIndex = list.findIndex((s: Song) => s.title === activeSong.title);
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    setCurrentSong(list[prevIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="p-6 pt-12 pb-32 flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)' }}>Music</h1>
        <p className="text-xs opacity-70 mt-0.5">A collection of your favorite artists and songs.</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Choose an Artist</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.keys(artistsData).map((artist: string) => (
            <button
              key={artist}
              onClick={() => setSelectedArtist(artist)}
              className="p-4 rounded-2xl border text-left transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: selectedArtist === artist ? '#C0A0FD' : 'var(--card-border)',
                color: 'var(--text-main)'
              }}
            >
              <h4 className="font-bold text-sm">{artist}</h4>
              <p className="text-[11px] opacity-60 mt-0.5">{artistsData[artist].length} songs</p>
            </button>
          ))}
        </div>
      </div>

      <div 
        className="border rounded-2xl p-5 shadow-md flex flex-col items-center gap-4 transition-colors"
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
      >
        <div className="flex items-center gap-1.5 text-purple-600 dark:text-lavender text-xs font-semibold">
          <MusicIcon size={14} /> NOW PLAYING
        </div>

        <div className="text-center w-full">
          <h2 className="text-lg font-bold truncate px-2" style={{ color: 'var(--text-main)' }}>{activeSong.title}</h2>
          <p className="text-xs opacity-70 mt-0.5">{activeSong.artist}</p>
          {!activeSong.file && (
            <p className="text-[10px] text-amber-400 mt-1">Audio file not added yet for this artist</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1.5 px-2">
          <input 
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500 dark:accent-lavender"
          />
          <div className="flex justify-between text-[10px] opacity-60" style={{ color: 'var(--text-main)' }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={handlePrev} className="p-2 opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-main)' }}>
            <SkipBack size={20} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full bg-purple-600 dark:bg-lavender text-white dark:text-darkBg flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button onClick={handleNext} className="p-2 opacity-70 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-main)' }}>
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Songs by {selectedArtist}</h3>
        <div className="flex flex-col gap-2">
          {(artistsData[selectedArtist] || []).map((song: Song, idx: number) => (
            <div
              key={idx}
              onClick={() => handlePlaySong(song)}
              className="border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all hover:opacity-90 shadow-sm"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: activeSong.title === song.title ? '#C0A0FD' : 'var(--card-border)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold opacity-40 w-4">{idx + 1}</span>
                <span className="text-sm font-medium">{song.title}</span>
              </div>
              <span className="text-xs opacity-60">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}