import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import { primary } from '../../assets/color'
const Splash = () => {
    return (
        <View style={styles.wrap}>
            <StatusBar barStyle="light-content" backgroundColor={primary} />
            <View style={styles.body}>
                <Image source={require('../../assets/img/splas.png')} style={styles.img} />
                <Text style={styles.text}>
                    Presensi
            </Text>
            </View>
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="white" />
                {/* <Text style={{ fontSize: 15, fontFamily: 'Lato-Italic' }}>
                    Loading
            </Text> */}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: primary },
    body: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    text: { fontSize: 20, color: 'white', fontFamily: 'Lato-Light' },
    img: { width: 250, height: 70, marginBottom: 10 },
    footer: { height: 70, alignItems: "center", marginBottom: '10%' }
})
export default Splash
