import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { AuthContext } from '../context'
import { AlertHelper } from '../../component/flash';
import apiUrl from '../../config/API';

const _cekakun = async () => {
    const { signOut } = React.useContext(AuthContext);
    const id = await AsyncStorage.getItem('tokenLogin')
    const pass = await AsyncStorage.getItem('pwd')
    const formData = new FormData
    let emp = id.substring(0, id.lastIndexOf('$$'))
    formData.append("empCode", emp);
    formData.append("keyCode", pass);
    let u = await DeviceInfo.getUniqueId()
    formData.append("unikCode", u + emp);
    var link = apiUrl + '/login';
    let accesstoken = await AsyncStorage.getItem('accesstoken');
    console.log('aa' + accesstoken)
    try {
        await fetch(link, {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then(response => {
            if (response.token == accesstoken) {
                AlertHelper.show('success', 'Hay', 'Selama Datang ' + emp)
            } else {
                signOut()
                console.log('tttttttt')
                AlertHelper.show('error', 'Gagal', 'Access token berubah!')
            }
        })
    } catch{
        console.log('error')
    }
}
export default _cekakun
