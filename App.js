import React from 'react'
import { StatusBar, View } from 'react-native';
// import { Provider } from 'react-redux'
// import { store } from './src/redux'
import Router from './src/router'
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './src/component/flash';
const App = () => {
  return (
    // <Provider store={store}>
    <>
      <Router />
      <DropdownAlert
        defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
        ref={ref => AlertHelper.setDropDown(ref)}
        onClose={() => AlertHelper.invokeOnClose()}
        updateStatusBar={false}
      />
    </>
    // </Provider>
  )
}

export default App
