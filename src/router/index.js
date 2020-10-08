import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home, Login, Splash, Scan, Crm, Dtlcrm } from '../screen'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../fungsi/context';
import { TransitionPresets } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import GetLocation from 'react-native-get-location';
import { Alert, BackHandler } from 'react-native';

const Stack = createStackNavigator();
const Router = () => {
    async function setStr() {
        var value = await AsyncStorage.getItem('accesstoken');
        setStorage(value);
        console.log(value);
        return value;
    }
    async function ambilStr(u, usr, pass, token) {
        var uid = usr + '$$' + u
        await AsyncStorage.setItem('accesstoken', token);
        await AsyncStorage.setItem('tokenLogin', uid);
        await AsyncStorage.setItem('pwd', pass);
    }
    const [isloading, setloading] = React.useState(true)
    const [username, setUsername] = React.useState(null)
    const [storage, setStorage] = React.useState(null)
    const authContext = React.useMemo(() => {
        return {
            signIn: async (usr, pass, u, token) => {
                setloading(false);
                setUsername(usr);
                console.log(usr);
                console.log(token);
                ambilStr(u, usr, pass, token)
                setStr()
            },
            signOut: async () => {
                await AsyncStorage.setItem('tokenLogin', '');
                await AsyncStorage.setItem('accesstoken', '');
                await AsyncStorage.setItem('pass', '');
                setloading(false);
                setUsername(null);
                setStr();
            }
        }
    }, []
    )

    React.useEffect(() => {

        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then((location) => {
                console.log(location.latitude)
            })
            .catch((error) => {
                const { code, message } = error;
                if (code == 'UNAVAILABLE') {
                    Alert.alert("Warning", "Lokasi Tidak Aktif", [
                        { text: "OK", onPress: () => BackHandler.exitApp() }
                    ]);
                    return true
                } else if (code == 'UNAUTHORIZED') {
                    Alert.alert('Aplikasi Belum Mendapatkan Izin Akses Lokasi');
                } else {
                    console.log('else', code, message);
                }
                console.warn(code, message);
            });
        setStr()
        setTimeout(() => {
            setloading(false);
        }, 2000);
    }, []);
    if (isloading) {
        return (
            <Splash />
        )
    }
    console.log(storage);
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {storage ? (
                    < Stack.Navigator initialRouteName="Home" headerMode='none' >
                        <Stack.Screen name="Home" component={Home} options={{
                            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
                        }} />
                        <Stack.Screen name="Scan" component={Scan} options={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }} />
                        <Stack.Screen name="Crm" component={Crm} />
                        <Stack.Screen name="Dtlcrm" component={Dtlcrm} options={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }} />
                    </Stack.Navigator>
                ) : (
                        <Stack.Navigator headerMode='none'>
                            <Stack.Screen name="Login" component={Login} ptions={{

                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} />
                        </Stack.Navigator>
                    )
                }
            </NavigationContainer >
        </AuthContext.Provider >
    );

}
export default Router