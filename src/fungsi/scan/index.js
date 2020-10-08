import AsyncStorage from '@react-native-community/async-storage';
import { Vibration, Alert, BackHandler } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import GetLocation from 'react-native-get-location';
import publicIP from 'react-native-public-ip';
import { AlertHelper } from '../../component/flash';
import time2 from '../../config/time';
import apiUrl from '../../config/API';

let lati, longti, ip, mesin, bar, rekamjam;
//GET LOCATION, LATI LONGITU
GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
  .then((location) => {
    lati = location.latitude;
    longti = location.longitude;
  })
  .catch((error) => {
    const { code, message } = error;
    if (code == 'UNAVAILABLE') {
      Alert.alert("Warning", "Lokasi Tidak Aktif", [
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true
    } else if (code == 'UNAUTHORIZED') {
      Alert.alert('Aplikasi Belum Mendapatkan Izin Akses Lokasi');
    } else {
      console.log('else', code, message);
    }
    console.warn(code, message);
  });
//GET MACHINE
mesin = DeviceInfo.getModel();

const _postdata = async (navigation, barcode) => {
  //GET IP
  await publicIP()
    .then((ipv4) => {
      ip = ipv4;
    })
    .catch((error) => {
      console.log(error);
    });
  //TOKEN LOGIN
  let token = await AsyncStorage.getItem('accesstoken');
  let u = await DeviceInfo.getUniqueId();
  var formData = new FormData();

  console.log(mesin, ip, lati, longti, barcode.data, time2);
  try {
    console.log('tim' + time2);
    if (bar != barcode.data || barcode.data == 'WFH') {
      if (barcode.data != 'WFH') {
        formData.append('qr', barcode.data);
        formData.append('type', 'WFO');
        console.log(barcode.data + 'lll')
      } else {
        console.log('nnnnnnnn')
        formData.append('type', 'WFH');
      }
      formData.append('ipAddress', ip);
      formData.append('token', token); //Pos token
      formData.append('machine', mesin);
      formData.append('latitude', lati);
      formData.append('longitude', longti);
      var link = apiUrl + '/absen';
      console.log(formData);
      await fetch(link, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response.pesan + 'pesan');
          bar = barcode.data;
          if (response.pesan == "Absen Berhasil") {
            rekamjam = time2
            Vibration.vibrate(500)
            return (
              navigation.navigate('Home'),
              setTimeout(() => {
                AlertHelper.show('success', 'Selamat', 'Anda Berhasil Presensi, Pada Jam : ' + rekamjam,
                );
              }, 1000)
            );
          }
          else {
            return (
              navigation.navigate('Home'),
              setTimeout(() => {
                AlertHelper.show('error', 'Gagal', response.pesan);
                bar = '';
              }, 1000)
            );
          }
        });
    } else {
      return (
        navigation.navigate('Home'),
        setTimeout(() => {
          AlertHelper.show(
            'success',
            'Good!',
            'Anda Sudah Presensi Pada Jam : ' + rekamjam,
          );
        }, 1000)
      );
    }
  } catch (e) {
    console.log(e);
    navigation.navigate('Home');
    AlertHelper.show('error', 'Gagal', 'Barqode Tidak Sesuai');
  }
}
export default _postdata;
