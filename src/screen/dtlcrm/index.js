import React, { Component } from 'react';
import { View, Text, StatusBar, Image, Alert } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { AlertHelper } from '../../component/flash';
import ambildate from '../../config/time/ambiltime';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';



export default class Dtlcrm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params,
            status: ''
        };
    }
    //Fungsi update
    _updateSt = async (dno, docno) => {
        let formData = new FormData
        let id = await AsyncStorage.getItem('tokenLogin')
        let emp = id.substring(0, id.lastIndexOf('$$'))
        const key = await AsyncStorage.getItem('pwd')
        let u = await DeviceInfo.getUniqueId()
        formData.append('keyId', key)
        formData.append('empId', emp)
        formData.append("unikId", u + emp);
        formData.append("Status", "F");
        formData.append("DocNo", docno);
        formData.append("DNo", dno);
        var link = 'http://52.168.171.84/diki_presensi/index.php/api/update';
        try {
            await fetch(link, {
                method: 'POST',
                body: formData,
            }).then(response => response.json()).then(response => {
                console.log(response);
                if (response.status == true) {
                    return (
                        this.setState({ status: 'F' }),
                        setTimeout(() => {
                            AlertHelper.show('success', response.message, 'Anda Berhasil Menyelesaikan')
                        }, 100))
                } else {
                    return (
                        setTimeout(() => {
                            AlertHelper.show('error', response.message, 'Anda Belum Melakukan Update')
                        }, 100
                        ))
                }
            })
        } catch{
            console.log('error')
        }
    }
    componentDidMount() {

        this.setState({ status: this.state.data.data.Status })
    }
    render() {
        let status, color, bgcolor, txtcolor
        const item = this.state.data.data
        this.state.status == 'P' ? (status = 'Belum Selesai', color = 'red') : (status = 'Selesai', color = 'green', txtcolor = 'green')
        item.EndDt < ambildate && this.state.status == 'P' ? (bgcolor = 'red', status = 'Telat', txtcolor = 'red') : (bgcolor = 'green')
        return (
            <View style={{ backgroundColor: '#3373ba', flex: 1, justifyContent: "space-between" }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={{ height: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
                    <Image source={require('../../assets/img/runsyn.png')} style={{ width: 124, height: 35, marginVertical: '5%' }} />
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: '#3373ba', alignItems: 'center', flex: 1 }}>
                        <View style={{ backgroundColor: '#ffffff', width: '96%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 7.27, elevation: 9, justifyContent: 'space-between', marginVertical: '3%' }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 8, borderRadius: 10, }}>
                                <View>
                                    <Text style={{ fontSize: 20, color: bgcolor }}>{item.ProjectName}</Text>
                                    <Text style={{ marginTop: -4, color: txtcolor }}>{item.CtName}</Text>
                                    <Text style={{ color: color, fontSize: 12 }}>{status}</Text>
                                    <Text style={{ color: bgcolor }}>Phase Code : {item.PhaseCode} </Text>
                                    <Text style={{ color: bgcolor }}>Phase Name : {item.PhaseName} </Text>
                                    <Text style={{ color: bgcolor }}>Category : {item.ProjectType} </Text>
                                    <Text style={{ color: bgcolor }}>Target : {item.Target} </Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text style={{ marginTop: -4, color: bgcolor }}>{item.CityName}</Text>
                                    <Text style={{ fontSize: 9, color: bgcolor }} >{item.StartDt.slice(6, 8)}-{item.StartDt.slice(4, 6)}-{item.StartDt.slice(0, 4)}</Text>
                                    <Text style={{ fontSize: 9, color: bgcolor }}  >{item.EndDt.slice(6, 8)}-{item.EndDt.slice(4, 6)}-{item.EndDt.slice(0, 4)}</Text>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 8, backgroundColor: '#F1F1F1', paddingVertical: 8, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: bgcolor }}>{item.Route}</Text>
                            </View>
                            <View style={{ alignItems: 'center', width: '100%', borderRadius: 10, marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => this.state.status == 'F' ? (Alert.alert('Done', 'Phase Ini Sudah Selesai')) : (Alert.alert('CRM CONFIRM', 'Apakah Anda Yakin Sudah Menyelesaikan Nya ?',
                                    [
                                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                        { text: 'OK', onPress: () => this._updateSt(item.DNo, item.DocNo) },
                                    ],
                                    { cancelable: false }))}>
                                    <View style={{ backgroundColor: 'green', height: 40, width: 100, alignItems: "center", justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: '#fff' }}>done</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >
        );
    }
}
