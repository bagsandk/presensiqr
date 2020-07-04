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
    formData.append("empId", emp);
    formData.append("keyId", pass);
    let u = await DeviceInfo.getUniqueId()
    formData.append("unikId", u + emp);
    console.log(pass)
    var link = apiUrl + 'log';
    try {
        await fetch(link, {
            method: 'POST',
            body: formData,
        }).then(response => response.json()).then(response => {
            console.log(response.status);
            if (response.status === true) {
                AlertHelper.show('success', 'Hay', 'Selama Datang ' + emp)
            } else {
                signOut()
                AlertHelper.show('error', 'Gagal', response.error)
            }
        })
    } catch{
        console.log('error')
    }
}
export default _cekakun
