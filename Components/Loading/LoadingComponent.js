import React from 'react';
import { View, Animated } from 'react-native';
import { AppColors } from '../../Styles/AppColors';

class LoadingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.animatedValues = Array(5).fill().map(() => new Animated.Value(0));
    }

    componentDidMount() {
        this.animate();
    }
    animate = () => {
        Animated.stagger(200, this.animatedValues.map(value => (
            Animated.sequence([
                Animated.timing(value, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(value, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ))).start(this.animate);
    }
    render() {
        const colors = [AppColors.carbsColor,AppColors.proteinColor, AppColors.fatColor, ];
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row' }}>
                    {colors.map((color, index) => (
                        <Animated.View
                            key={index}
                            style={{
                                width: 20,
                                height: 20,
                                borderRadius: 20,
                                backgroundColor: color,
                                transform: [
                                    { scale: this.animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] }) },
                                ],
                                opacity: this.animatedValues[index].interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                            }}
                        />
                    ))}
                </View>
            </View>
        );
    }
}

export default LoadingComponent