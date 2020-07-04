import AsyncStorage from '@react-native-community/async-storage';
import { Vibration, Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location';
import publicIP from 'react-native-public-ip';
import { AlertHelper } from '../../component/flash';
import time2 from '../../config/time';
import apiUrl from '../../config/API';

let lati, longti, ip, mesin, bar, rekamjam
//GET LOCATION, LATI LONGITU
GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
    .then(location => {
        lati = location.latitude;
        longti = location.longitude;
    })
    .catch(error => {
        const { code, message } = error;
        if (code == 'UNAVAILABLE') { Alert.alert('Lokasi Tidak Aktif') } else if (code == 'UNAUTHORIZED') { Alert.alert('Aplikasi Belum Mendapatkan Izin Akses Lokasi') } else {
            console.log('else', code, message)
        }
        console.warn(code, message);
    })
//GET MACHINE
mesin = DeviceInfo.getModel();


const _postdata = async (navigation, barcode,) => {
    //GET IP
    await publicIP()
        .then(ipv4 => {
            ip = ipv4;
        })
        .catch(error => {
            console.log(error);
        });
    //TOKEN LOGIN
    let id = await AsyncStorage.getItem('tokenLogin')
    //get pass/apikey dr storage
    let pass = await AsyncStorage.getItem('pwd')
    //GET UNIQID
    let u = await DeviceInfo.getUniqueId()
    let emp = id.substring(0, id.lastIndexOf('$$'))
    var formData = new FormData();

    console.log(id, mesin, ip, lati, longti, barcode.data, time2)
    try {
        if (bar != barcode.data) {
            formData.append("keyId", pass);
            formData.append("empId", emp);
            formData.append("data", barcode.data);
            formData.append("ipAddress", ip);
            formData.append("unikId", u + emp);//POST UNIQID + EMP
            formData.append("machine", mesin);
            formData.append("latitude", lati);
            formData.append("longitude", longti);
            var link = apiUrl + 'terima';
            await fetch(link, {
                method: 'POST',
                body: formData,
            }).then(response => response.json()).then(response => {
                console.log(response.status);
                bar = barcode.data
                if (response.message == 'Success!') {
                    return (
                        Vibration.vibrate(500),
                        rekamjam = time2,
                        navigation.navigate('Home')),
                        setTimeout(() => {
                            AlertHelper.show('success', 'Selamat', 'Anda Berhasil Absen, Pada Jam : ' + rekamjam)
                        }, 1000)
                } else if (response.message == undefined) {
                    return (
                        navigation.navigate('Home'),
                        setTimeout(() => {
                            AlertHelper.show('error', 'Gagal akses', response.error)
                        }, 1000),
                        setTimeout(() => {
                            bar = ''
                        }, 10000))
                } else {
                    return (
                        navigation.navigate('Home'),
                        setTimeout(() => {
                            AlertHelper.show('success', 'Nice', 'Anda Sudah Absen Pada Jam : ' + rekamjam)
                        }, 1000
                        ))
                }
            })
        } else {
            return (
                navigation.navigate('Home'),
                setTimeout(() => {
                    AlertHelper.show('success', 'Good!', 'Anda Sudah Absen Pada Jam : ' + rekamjam)
                }, 1000))
        }
    }
    catch (e) {
        console.log(e);
        navigation.navigate('Home')
        AlertHelper.show('error', 'Gagal', 'Barqode Tidak Sesuai');
    }
}
export default _postdata