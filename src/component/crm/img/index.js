import React from 'react';
import { Image, View } from 'react-native';


const Crmimg = () => {
    return (
        <View style={{ height: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', }}>
            <Image source={require('../../../assets/img/runsyn.png')} style={{ width: 124, height: 35, marginVertical: '5%' }} />
        </View>
    )
}

export default Crmimg
