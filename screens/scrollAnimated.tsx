import React, { useState, useRef, useEffect } from 'react';
import { Animated, ScrollView, View } from 'react-native';


const ScrollAnimated = () => {
    // const [headerShown, setHeaderShown] = useState(false);
    const scrolling = useRef(new Animated.Value(0)).current;

    const translation = scrolling.interpolate({
        inputRange: [100, 300],
        outputRange: [-100, 0],
        extrapolate: 'clamp'
    })

    const color = scrolling.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 500],
        outputRange: ['orange', 'red'],
    })

    const opacity = scrolling.interpolate({
        extrapolate: 'clamp',
        inputRange: [0, 500],
        outputRange: [0, 1],
    })
    // useEffect(() => {
    //     Animated.timing(translation, {
    //         toValue: headerShown ? 0 : -100,
    //         duration: 250,
    //         useNativeDriver: true,
    //     }).start();
    // }, [headerShown]);

    return (
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 80,
                    backgroundColor: 'blue',
                    zIndex:1,
                    transform: [
                        { translateY: translation },
                    ],
                }}
            />

            <Animated.ScrollView
                // onScroll={(event) => {
                //     const scrolling = event.nativeEvent.contentOffset.y;

                //     if (scrolling > 100) {
                //         setHeaderShown(true);
                //     } else {
                //         setHeaderShown(false);
                //     }
                // }}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: {
                                y: scrolling
                            }
                        }
                    }], {
                    useNativeDriver: true
                }
                )}
                // onScroll will be fired every 16ms
                scrollEventThrottle={16}
                style={{
                    flex: 1,
                    // backgroundColor: color, // works for non native driver
                    backgroundColor:'red',
                    opacity : opacity
                }}
            >
                <View style={{ flex: 1, height: 1000 }} />
            </Animated.ScrollView>
        </>
    );
}

export default ScrollAnimated;