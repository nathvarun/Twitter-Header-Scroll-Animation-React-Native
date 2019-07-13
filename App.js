import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Animated from 'react-native-reanimated';

// core Snoopy
import Snoopy from 'rn-snoopy';

// some Snoopy goodies we're going to use
import filter from 'rn-snoopy/stream/filter';

import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

//If you are using React 0.48 or below, then you should import:
//import EventEmitter from 'react-native/Libraries/EventEmitter/EventEmitter';

const emitter = new EventEmitter();

const events = Snoopy.stream(emitter);
filter({ method: 'updateView' }, true)(events).subscribe();

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 70;
PROFILE_IMAGE_MAX_HEIGHT = 80;
PROFILE_IMAGE_MIN_HEIGHT = 40;

const { Value, Extrapolate } = Animated;

class App extends Component {
  constructor(props) {
    super(props);

    this.scrollY = new Value(0);

    this.headerHeight = this.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: Extrapolate.CLAMP
    });
    this.profileImageHeight = this.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: Extrapolate.CLAMP
    });

    this.profileImageMarginTop = this.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5
      ],
      extrapolate: Extrapolate.CLAMP
    });
    this.headerZindex = this.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
      outputRange: [0, 0, 1000],
      extrapolate: Extrapolate.CLAMP
    });

    this.headerTitleBottom = this.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          5 +
          PROFILE_IMAGE_MIN_HEIGHT +
          26
      ],
      outputRange: [-20, -20, -20, 0],
      extrapolate: Extrapolate.CLAMP
    });
  }

  componentDidMount() {
    // setInterval(() => {
    //   for (let i = 0; i < 10000; i++) {
    //     console.log(i);
    //   }
    // }, 200);
  }
  render() {
    return (
      <View style={{ flex: 1, shadowColor: 'white' }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'lightskyblue',
            height: this.headerHeight,
            zIndex: this.headerZindex,
            // elevation: this.headerZindex, //required for android
            alignItems: 'center'
          }}
        >
          <Animated.View
            style={{ position: 'absolute', bottom: this.headerTitleBottom }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
              Varun Nath
            </Text>
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollY } } }
          ])}
        >
          <Animated.View
            style={{
              height: this.profileImageHeight,
              width: this.profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: this.profileImageMarginTop,
              marginLeft: 10
            }}
          >
            <Image
              source={require('./assets/me.png')}
              style={{ flex: 1, width: null, height: null }}
            />
          </Animated.View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 26, paddingLeft: 10 }}>
              Varun Nath
            </Text>
          </View>

          <View style={{ height: 1000 }} />
        </Animated.ScrollView>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
