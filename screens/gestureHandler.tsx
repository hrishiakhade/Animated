import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, useWindowDimensions, Dimensions } from 'react-native';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

const GestureHandler: React.FC = () => {
    const touch = useRef(new Animated.ValueXY({ x: 5, y: 5 })).current;
    const dim = useWindowDimensions();

    return (
        <View
            style={styles.container}
            onStartShouldSetResponder={() => true}       // make it touch responsive
            onResponderMove={(evt) => {
                touch.setValue({
                    x: evt.nativeEvent.locationX,
                    y: evt.nativeEvent.locationY
                })
            }}
            onResponderRelease={()=>{
                Animated.spring(touch,{
                    useNativeDriver : true,
                    toValue : {
                        x : 5,
                        y : 5
                    }
                    // left/top are not supported
                })
            }}
        >
            <Animated.View
                style={{
                    position: 'absolute',
                    left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
                    top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
                    // left: dim.width / 2 - CURSOR_HALF_SIDE_SIZE,
                    // top: dim.height / 2 - CURSOR_HALF_SIDE_SIZE,
                    height: CURSOR_SIDE_SIZE,
                    width: CURSOR_SIDE_SIZE,
                    borderRadius: CURSOR_HALF_SIDE_SIZE,
                    backgroundColor: 'red'
                }}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

});

export default GestureHandler;