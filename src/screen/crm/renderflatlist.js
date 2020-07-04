//HASIL RENDER
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import ambildate from '../../config/time/ambiltime';
const _itemComponent = ({ item, navigation }) => {
    //EndDt -> EndDt ganti varibel
    console.log(item)
    console.log('am' + ambildate)
    console.log(item.StartDt.slice(6, 8))
    let status, color, bgcolor, txtcolor
    item.Status == 'P' ? (status = 'Belum Selesai', color = 'red') : (status = 'Selesai', color = 'green', txtcolor = 'green')
    item.EndDt < ambildate && item.Status == 'P' ? (bgcolor = 'red', status = 'Telat', txtcolor = 'red') : (bgcolor = 'green')
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Dtlcrm', { data: item })}  >
            <View style={{ backgroundColor: '#3373ba', alignItems: 'center', }}>
                <View style={{ backgroundColor: '#ffffff', width: '96%', marginTop: '3%', borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 7.27, elevation: 9, justifyContent: 'space-between', }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', padding: 8, borderRadius: 10, }}>
                        <View>
                            <Text style={{ fontSize: 20, color: bgcolor }}>{item.ProjectName}</Text>
                            <Text style={{ marginTop: -4, color: txtcolor }}>{item.CtName}</Text>
                            <Text style={{ color: color, fontSize: 12 }}>{status}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ marginTop: -4, color: bgcolor }}>{item.CityName}</Text>
                            <Text style={{ fontSize: 9, color: bgcolor }} >{item.StartDt.slice(6, 8)}-{item.StartDt.slice(4, 6)}-{item.StartDt.slice(0, 4)}</Text>
                            <Text style={{ fontSize: 9, color: bgcolor }}  >{item.StartDt.slice(6, 8)}-{item.EndDt.slice(4, 6)}-{item.EndDt.slice(0, 4)}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 8, backgroundColor: '#F1F1F1', paddingVertical: 8, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: txtcolor }}>{item.Route}</Text>
                    </View>
                    <View style={{
                        alignItems: 'center', marginBottom: 6, width: '100%', borderRadius: 10, paddingBottom: 3
                    }}>
                        <Text style={{ color: txtcolor }}>Detail</Text>
                    </View>
                </View>
            </View>
        </ TouchableWithoutFeedback >
    )
}
export default _itemComponent