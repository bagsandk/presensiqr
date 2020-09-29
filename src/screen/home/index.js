import React from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View, StyleSheet, } from 'react-native';
import _cekakun from '../../fungsi/cekakun';
import apiUrl from '../../config/API';
import { AlertHelper } from '../../component/flash';
import _postdata from '../../fungsi/scan';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';


const Home = ({ navigation }) => {
    _cekakun()
    const [nama, setnama] = React.useState('Hadir');
    const [load, setload] = React.useState(null);
    async function ceklokasi() {
        let accesstoken = await AsyncStorage.getItem('accesstoken');
        var formData = new FormData();
        formData.append("token", accesstoken);
        const link = apiUrl + '/cekgps';
        setload(true)
        let response = await fetch(link, {
            method: 'POST',
            body: formData,
        })
        console.log(response.status);
        let data = await response.json();
        if (response.status == 200) {
            console.log(data.Type);
            if (data.Type == 'WFO') {
                AlertHelper.show('info', 'WFO'
                );
                navigation.navigate('Scan')
                setload(false)
            } else {
                AlertHelper.show('info', 'WFH'
                );
                await _postdata(navigation, { data: 'WFH' });
                setload(false)
            }
        } else {
            console.log(data)
            AlertHelper.show('info', 'Presensi', data.pesan,
            );
            setload(false)
        }
    }
    return (
        <View style={styles.wrap}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Spinner visible={load} textContent={'Melakukan Presensi'} textStyle={styles.spinnerTextStyle} animation="fade" />
            <View style={styles.header}>
                <Image source={require('../../assets/img/runsyn.png')} style={styles.img} />
            </View>
            <View style={styles.body}>
                {/* tombol  */}
                <TouchableOpacity onPress={() => ceklokasi()}>
                    <View style={styles.tombol}>
                        <Text style={styles.text}>{nama}</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Crm')}>
                    < View style={styles.tombol}>
                        <Text style={styles.text}>Crm</Text>
                    </View>
                </TouchableOpacity> */}
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