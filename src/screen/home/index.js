import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import _cekakun from '../../fungsi/cekakun';

const Home = ({ navigation }) => {
    _cekakun()
    return (
        <View style={styles.wrap}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={styles.header}>
                <Image source={require('../../assets/img/runsyn.png')} style={styles.img} />
            </View>
            <View style={styles.body}>
                {/* tombol  */}
                <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
                    <View style={styles.tombol}>
                        <Text style={styles.text}>Hadir</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Crm')}>
                    < View style={styles.tombol}>
                        <Text style={styles.text}>Crm</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    wrap: { flex: 1, backgroundColor: '#3373ba', },
    header: { backgroundColor: '#ffffff', flex: 1, borderBottomLeftRadius: 800, alignItems: 'center', justifyContent: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 7.27, elevation: 9, },
    img: { width: 240, height: 67, marginTop: 10, marginLeft: 10 },
    body: { backgroundColor: '#3373ba', alignItems: 'center', paddingVertical: '5%', marginVertical: '5%' },
    tombol: { width: 150, height: 60, backgroundColor: '#fff', margin: 8, borderRadius: 40, justifyContent: 'center', alignItems: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 5, },
    text: { fontSize: 20, fontWeight: 'bold', fontFamily: 'Lato- Regular', color: '#56718d' }
})
export default Home