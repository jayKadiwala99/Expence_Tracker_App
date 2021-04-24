import React from 'react'
import { StyleSheet, View,Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            onSkip={() => navigation.replace("Signin")}
            onDone={() => navigation.navigate("Signin")}
            pages={[
                {
                    backgroundColor: '#A6E4D0',
                    // image: <MapLogo />,
                    title: "Tack your Expense",
                    // subtitle: ''
                },
                {
                    backgroundColor: '#FDEB93',
                    // image: <SupplierLogo />,
                    title: 'Manage Budget',
                    // subtitle: 'lorem ipsum'
                },
                {
                    backgroundColor: '#E9BCBE',
                    // image: <PaymentLogo />,
                    title: 'visualization',
                    // subtitle: 'lorem ipsum'
                },
            ]}
        />
    )
}

export default OnboardingScreen