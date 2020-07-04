import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import apiUrl from '../../config/API';
import DeviceInfo from 'react-native-device-info';
import { AlertHelper } from '../../component/flash';
import { AuthContext } from '../../fungsi/context';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ navigation }) => {
    //CONTEXT -> KE ROUTER
    const { signIn } = React.useContext(AuthContext);
    //STATE
    const [usr, setUsr] = React.useState(null)
    const [pass, setPass] = React.useState(null)
    //lOADING
    const [ding, setding] = React.useState(false)
    var u
    //POST TO REST API
    const _postlogin = async (usr, pass) => {
        var formData = new FormData();
        u = await DeviceInfo.getUniqueId()
        formData.append("empId", usr);
        formData.append("keyId", pass);
        formData.append("unikId", u + usr);
        console.log(usr, pass)
        var link = apiUrl + '/log';
        if (usr && pass !== '' || null) {
            setding(true)
            try {
                await fetch(link, {
                    method: 'POST',
                    body: formData,
                }).then(response => response.json()).then(response => {
                    console.log(response.status);
                    if (response.status === true) {
                        setding(false)
                        signIn(usr, pass, u)
                        AlertHelper.show('success', 'Berhasil Login', 'Selamat Datang ' + usr)
                    } else if (response.message == 'Device change') {
                        setding(false)
                        AlertHelper.show('error', 'Gagal', response.message)
                    } else {
                        setding(false)
                        AlertHelper.show('error', 'Gagal', response.message)
                    }
                })
            } catch (error) {
                // console.log(error)
                setding(false)
                // AlertHelper.show('error', 'Gagal', error);
            }
        } else {
            if (usr == '' || usr == null) {
                AlertHelper.show('error', 'Gagal', 'Lengkapi Username')
            } else if (pass == '' || null) {
                AlertHelper.show('error', 'Gagal', 'Lengkapi Password')
            }
        }
    }
    return (
        <View style={styles.wrap}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Spinner visible={ding} textContent={'Loading'} textStyle={styles.spinnerTextStyle} animation="fade" />
            <View style={styles.header}>
                <Image source={require('../../assets/img/runsyn.png')} style={styles.img} />
            </View>
            <View style={styles.body}>
                <TextInput style={styles.textinput}
                    placeholder="Username"
                    placeholderTextColor="#ffffff"
                    value={usr}
                    onChangeText={(usr) => setUsr(usr)}
                />
                <TextInput style={styles.textinput}
                    placeholder="Password"
                    placeholderTextColor="#ffffff"
                    value={pass}
                    onChangeText={(pass) => setPass(pass)}
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => _postlogin(usr, pass)}>
                    <View style={styles.tombollogin}>
                        <Text style={{ color: 'white' }}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );
}
const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    wrap: {
        backgroundColor: '#3373ba', flex: 1
    },
    img: { width: 240, height: 67, marginVertical: '5%' },
    header: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderBottomLeftRadius: 800, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.34, shadowRadius: 7.27, elevation: 9,
    },
    body: {
        backgroundColor: '#3373ba', alignItems: 'center', paddingVertical: '5%', marginVertical: '5%'
    },
    textinput: { width: '90%', borderWidth: 2, borderRadius: 90, marginBottom: '5%', paddingLeft: 20, borderColor: '#ffffff', color: '#ffffff' },
    tombollogin:
    {
        width: 100, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff',
    }
})
export default Login;
