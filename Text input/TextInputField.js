import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

class TextInputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLabel: false,
            errorMsg: false,
            textVal: "",
            fadeAnim: new Animated.Value(0),
            activeColor: "#ffffff",
            inactiveColor: "#465D65",
            fontFamily: "Roboto-Bold",
            borderBottomColor: "#465D65",
            errorColor: "red",
            labelFontSize: 15,
            placeholderLabelFontSize: 15,
            placeholderLabel: "FIRST NAME",
            errorMessage: "",
            value: "",
            containerStyle: StyleSheet.create(),
        };
        this._animatedIsFocused = new Animated.Value(this.props.value === "" ? 0 : 1)
    }

    componentWillMount = () => {
        this._animatedIsFocused = new Animated.Value(this.props.value === "" ? 0 : 1)
        // console.log('this.props', this.props)
        if (this.props.activeColor)
            this.setState({ activeColor: this.props.activeColor });

        if (this.props.inactiveColor)
            this.setState({ inactiveColor: this.props.inactiveColor });

        if (this.props.fontFamily)
            this.setState({ fontFamily: this.props.fontFamily });

        if (this.props.borderBottomColor)
            this.setState({ borderBottomColor: this.props.borderBottomColor });

        if (this.props.errorColor)
            this.setState({ errorColor: this.props.errorColor });

        if (this.props.labelFontSize)
            this.setState({ labelFontSize: this.props.labelFontSize });

        if (this.props.placeholderLabelFontSize)
            this.setState({ placeholderLabelFontSize: this.props.placeholderLabelFontSize });

        if (this.props.placeholderLabel)
            this.setState({ placeholderLabel: this.props.placeholderLabel });

        if (this.props.errorMessage)
            this.setState({ errorMessage: this.props.errorMessage });

        if (this.props.value)
            this.setState({ value: this.props.value });

        if (this.props.containerStyle)
            this.setState({ containerStyle: StyleSheet.create(this.props.containerStyle) });
    }
    componentDidUpdate = () => {
        Animated.timing(this._animatedIsFocused, {
            toValue: this.state.showLabel || this.props.value !== "" ? 1 : 0,
            duration: 200
        }).start()
    }

    labelHandling = async (status) => {
        let showLabel = false
        if (status || this.state.value !== "") {
            showLabel = true
        }

        await this.setState({ showLabel: showLabel });
    }

    render() {
        return (
            <View style={{ marginBottom: RFValue(30), height: RFValue(56) }}>
                <Animated.Text
                    style={{
                        fontFamily: this.state.fontFamily,
                        color: this.state.showLabel || this.props.value !== "" ? this.state.activeColor : this.state.inactiveColor,
                        top: this._animatedIsFocused.interpolate({
                            inputRange: [0, 1],
                            outputRange: [RFValue(30), RFValue(3)]
                        }),
                        fontSize: this._animatedIsFocused.interpolate({
                            inputRange: [0, 1],
                            outputRange: [this.state.placeholderLabelFontSize, this.state.labelFontSize]
                        }),
                        height: 20
                    }}>
                    {this.state.placeholderLabel}
                </Animated.Text>
                <TextInput
                    {...this.props}
                    style={{
                        borderBottomColor: this.state.borderBottomColor,
                        borderBottomWidth: 1,
                        height: RFValue(40),
                        fontSize: RFValue(12),
                        color: "#ffffff",
                        opacity: 0.8
                    }}
                    returnKeyType={this.props.returnKeyType}
                    ref={this.props.refInner}
                    onFocus={() => this.labelHandling(1)}
                    onBlur={() => this.labelHandling(0)}
                    onChangeText={this.props.onChangeText}
                    onSubmitEditing={this.props.onSubmitEditing} />
                <Animated.Text
                    style={{
                        marginTop: RFValue(5),
                        color: this.state.errorColor,
                        fontSize: RFValue(12),
                    }}>
                    {this.props.errorMessage}
                </Animated.Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
    }
});

export default TextInputField;