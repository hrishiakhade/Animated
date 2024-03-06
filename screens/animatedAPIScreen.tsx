import React, { useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

interface FadeInViewProps {
  style?: any;
  children?: React.ReactNode;
  ref: any;
}

interface FadeInRef {
  leftToRight: () => void;
  backAndForth: () => void;
  parallel: () => void;
}
interface StaggerRef {
  stagger: () => void;
}

interface InterPolateRef {
  interpolate: () => void;
}

const FadeInView: React.FC<FadeInViewProps> = React.forwardRef((props, ref) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const xyValues = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const leftRight = () => {
    return Animated.timing(fadeAnim, {
      toValue: 300,
      duration: 3000,
      // easing: Easing.bounce,
      useNativeDriver: true,
      // delay: 1000,
    })
  }

  const rightLeft = () => {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    })
  }
  const leftToRight = () => {
    leftRight().start();
  };

  const backAndForth = () => {
    Animated.sequence(
      [
        leftRight(),
        rightLeft()
      ]
    ).start();
  };


  const diagonalX = Animated.spring(xyValues.x, {
    toValue: 100,
    useNativeDriver: true,
  });

  const diagonalY = Animated.spring(xyValues.y, {
    toValue: 100,
    useNativeDriver: true,
  });

  const parallel = () => {
    Animated.parallel([
      diagonalX, diagonalY
    ]).start();
  }
  // Forwarding the ref to Animated.View
  React.useImperativeHandle(ref, () => ({
    leftToRight: leftToRight,
    backAndForth: backAndForth,
    parallel: parallel
  }));

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{ translateX: fadeAnim }], // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
});




const StaggerView: React.FC<FadeInViewProps> = React.forwardRef((props, ref) => {
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  // Forwarding the ref to Animated.View


  const stagger = () => {
    Animated.stagger(500, [
      Animated.timing(opacity1, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity2, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity3, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  React.useImperativeHandle(ref, () => ({
    stagger: stagger,
  }));

  return (
    <>
      <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'red',
          borderRadius: 100 / 2,
          opacity: opacity1
        }}
      />
      <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'red',
          borderRadius: 100 / 2,
          opacity: opacity2,
        }}
      />
      <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: 'red',
          borderRadius: 100 / 2,
          opacity: opacity3,
        }}
      />
    </>
  )
});
// You can then use your `FadeInView` in place of a `View` in your components:
const AnimatedAPIScreens = () => {
  const fadeRef1 = useRef<FadeInRef>(null);
  const fadeRef2 = useRef<FadeInRef>(null);
  const fadeRef3 = useRef<FadeInRef>(null);

  const fadeRef4 = useRef<StaggerRef>(null);

  const translate = useRef(new Animated.Value(0)).current;

  const interpolate = () => {
    Animated.timing(translate, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }


  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>

      <FadeInView
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}
        ref={fadeRef1}
      />
      <Pressable
        onPress={() => fadeRef1?.current?.leftToRight()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Press me for L-R bounce</Text>
      </Pressable>



      <FadeInView
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}
        ref={fadeRef2}
      />
      <Pressable
        onPress={() => fadeRef2?.current?.backAndForth()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Press me for Sequence</Text>
      </Pressable>

      {/* <FadeInView
        style={{
          width: 100,
          height: 100,
          borderRadius: 100 / 2,
          backgroundColor: 'red',
        }}
        ref={fadeRef3} // Associate fadeRef3 with the FadeInView component for parallel animations
      />
      <Pressable
        onPress={() => fadeRef3?.current?.parallel()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Press me for Parallel</Text>
      </Pressable> */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <StaggerView ref={fadeRef4} />
      </View>
      <Pressable
        onPress={() => fadeRef4.current?.stagger()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Press me for Staggering</Text>
      </Pressable>

      <Animated.View
        style={{
          height: 100,
          width: 100,
          backgroundColor: translate?.interpolate({                      // works only for non native driver
            inputRange: [0, 150, 300],
            outputRange: ['red', 'orange', 'yellow']
          }),
          // borderRadius: 100 / 2,
          transform: [
            { translateX: translate },
            {
              rotate: translate.interpolate({
                inputRange: [0, 150, 300],
                outputRange: ['0deg', '180deg', '360deg']
              })
            }
          ],
          opacity: translate.interpolate({
            inputRange: [0, 150, 300],
            outputRange: [0, 1, 0]
          })
        }}
      />

      <Pressable
        onPress={() => interpolate()}
        style={{
          height: 50,
          width: 100,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Press me for InterPolation</Text>
      </Pressable>

    </View>
  );
};


export default AnimatedAPIScreens;