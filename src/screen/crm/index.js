import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Picker, StatusBar, Text, View, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Crmimg from '../../component/crm/img';
import _itemComponent from './renderflatlist';
import apiUrl from '../../config/API';

class Crm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataSource: [],
            link: 'P',
            kosong: ''
        };
    }
    //GANTI LINK MERUBAH STATUS P F
    _setlink = async (val) => {
        await this.setState({ link: val })
        this._fetchItem();
    }
    // AMBIL DATA
    _fetchItem = async () => {
        this.setState({ isLoading: true });
        let formData = new FormData;
        let id = await AsyncStorage.getItem('tokenLogin')
        let emp = id.substring(0, id.lastIndexOf('$$'))
        const key = await AsyncStorage.getItem('pwd')
        let u = await DeviceInfo.getUniqueId()
        formData.append('keyId', key)
        formData.append('empId', emp)
        formData.append("unikId", u + emp);
        formData.append('Status', this.state.link)
        try {
            await fetch(apiUrl + 'ambil', {
                method: 'POST',
                body: formData,
            }).then(response => response.json()).then(response => {
                console.log(response)
                response.status == true ? (this.setState({
                    isLoading: false,
                    dataSource: response.message,
                    kosong: 't'
                })) : (this.setState({
                    isLoading: false,
                    dataSource: response.message,
                    kosong: 'f'
                }))
            })
        } catch (error) {
            console.error(error);
            this.setState({
                isLoading: false,
                dataSource: [],//contoh hasil dari api bisa dikosongin nanti   
                kosong: 'f'
            })
        }
    }
    //BACKGROUND KOSONG
    _separatorComponent = () => {
        return (
            <View style={{ backgroundColor: '#3373ba' }} />
        )
    }

    //FETCH DULU SAAT DI BUKA
    componentDidMount() {
        this._fetchItem()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this._fetchItem()
        });
    }
    // BUANG SETELAH DI TUTUP
    componentWillUnmount() {
        this._unsubscribe();
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ backgroundColor: '#3373ba', flex: 1, justifyContent: "space-between" }}>
                    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                    <Crmimg />
                    <View style={{ backgroundColor: '#eeeeee', }}>
                        <Picker
                            selectedValue={this.state.link}
                            style={{ height: 30, width: '100%', }}
                            onValueChange={(itemValue, itemIndex) =>
                                this._setlink(itemValue)
                            }>
                            <Picker.Item label="Belum Selesai" value="P" />
                            <Picker.Item label="Selesai" value="F" />
                        </Picker></View>
                    <View style={{ backgroundColor: '#3373ba', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                </View>
            )
        }
        return (
            <View style={{ backgroundColor: '#3373ba', flex: 1, }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Crmimg />
                <View style={{ backgroundColor: '#eeeeee', }}>
                    <Picker
                        selectedValue={this.state.link}
                        style={{ height: 30, width: '100%', }}
                        onValueChange={(itemValue, itemIndex) =>
                            this._setlink(itemValue)
                        }>
                        <Picker.Item label="Belum Selesai" value="P" />
                        <Picker.Item label="Selesai" value="F" />
                    </Picker></View>
                {this.state.kosong === 'f' ?
                    (<View style={styles.itemkosong}><Text style={{ color: '#fff' }}>Tidak Ada Tugas</Text></View>) : (
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item, index }) => <_itemComponent item={item} navigation={this.props.navigation} />}
                            keyExtractor={(item, index) => index.toString()}
                            onRefresh={(this._fetchItem)}
                            refreshing={this.state.isLoading}
                            ItemSeparatorComponent={this._separatorComponent}
                        />)}
            </View >
        );
    }
}
const styles = StyleSheet.create({
    itemkosong: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}
)
export default Crm