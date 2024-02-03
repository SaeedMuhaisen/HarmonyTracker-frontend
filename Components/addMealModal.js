import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Modal, KeyboardAvoidingView, Platform,TouchableOpacity } from "react-native";


import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";


export default function ({ vis }) {
    const [isModalVisible, setModalVisible] = useState(vis);
    return (
        <>
            <Modal transparent visible={isModalVisible} style={{ flex: 1, justifyContent: 'flex-end' }} onBackdropPress>

            </Modal>
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => { this.setModalVisible(false) }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPressOut={() => { this.setModalVisible(false) }}
                    >
                            <TouchableWithoutFeedback>

                                <KeyboardAvoidingView
                                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                    style={{ flex: 1, justifyContent: 'flex-end' }}
                                >
                                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                        <View style={{ height: 100, backgroundColor: 'blue' }}>
                                            {/* TextInput with autoFocus and ref */}
                                            <TextInput

                                                autoFocus
                                                placeholder="Type something..."
                                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                                            />
                                        </View>
                                    </View>
                                </KeyboardAvoidingView>

                            </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>
            </View>
        </>
    )
}
