import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';

const PanResponderComponent = () => {

    const pan = useRef(new Animated.ValueXY({ x: 10, y: 10 })).current;

    const scale = useRef(new Animated.Value(1)).current;

    const pointsDistance = ([xA, yA]: number[], [xB, yB]: number[]) => {
        return Math.sqrt(
            Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2)
        );
    };

    const dim = useWindowDimensions();

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                // Handle the movement here
                const activeTouches = event.nativeEvent.changedTouches.length;

                if (activeTouches == 1) {
                    pan.setValue({
                        x: gestureState.dx,
                        y: gestureState.dy
                    })
                } else if (activeTouches == 2) {
                    const activeTouches = event.nativeEvent.changedTouches;

                    const touchA = activeTouches[0];
                    const touchB = activeTouches[1];

                    const distance = pointsDistance([touchA.pageX, touchA.pageY], [touchB.pageX, touchB.pageY]);

                    const screenMovedPercents = distance / dim.width;

                    scale.setValue(1 + screenMovedPercents * 2)
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                // Handle the release here
                // pan.flattenOffset();
                Animated.parallel([

                    Animated.spring(pan, {
                        toValue: { x: 10, y: 10 },
                        useNativeDriver: true,
                    })
                    ,
                    Animated.spring(scale, {
                        toValue: 1,
                        useNativeDriver: true
                    })
                ]).start();

                // Animated.timing(pan, {
                //     toValue: { x: 0, y: 0 },
                //     useNativeDriver: true,
                //     easing : Easing.bounce,
                //     duration: 4000
                // }).start()
            },
        })
    ).current;

    return (
        <Animated.Image
            {...panResponder.panHandlers}
            source={{ uri: 'https://images.unsplash.com/photo-1708649290066-5f617003b93f' }}
            style={{
                width: '90%',
                height: 200,
                borderRadius: 10,
                transform: [
                    { translateX: pan.x, },
                    { translateY: pan.y },
                    { scale: scale }
                ]
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PanResponderComponent;