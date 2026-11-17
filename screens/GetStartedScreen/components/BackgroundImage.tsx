import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Asset } from 'expo-asset';

interface BackgroundImageProps {
  children?: React.ReactNode;
}

export default function BackgroundImage({ children }: BackgroundImageProps) {
  const [videoUri, setVideoUri] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadVideoAsset() {
      try {
        const asset = Asset.fromModule(require('../../../assets/GetStarted.mp4'));
        await asset.downloadAsync();
        if (isMounted && (asset.localUri || asset.uri)) {
          setVideoUri(asset.localUri || asset.uri);
        }
      } catch (err) {
        console.warn('Unable to load video asset, using fallback background:', err);
      }
    }

    loadVideoAsset();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Instant fallback background ensures zero blank flash and crash immunity */}
      <ImageBackground
        source={require('../../../assets/get_started_bg.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        {videoUri && <ActiveVideoLayer uri={videoUri} />}
        <View style={styles.overlay}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
}

function ActiveVideoLayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="cover"
      nativeControls={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});
