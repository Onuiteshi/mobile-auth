import React, {useEffect, useState} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions, SafeAreaView, Platform,
} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {goBack} from "expo-router/build/global-state/routing";
import {Link} from "expo-router";



const Onboarding: React.FC = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: "#EDF6F5" }}>
                <StatusBar
                    barStyle={"dark-content"}
                    translucent
                    backgroundColor={"#fff"}
                />
            </SafeAreaView>
            <View style={styles.cont}>
                <View
                    style={styles.imageContainer}
                >

                    <Image source={require("../../assets/images/logo2.png")} resizeMode={"contain"} style={{width: 100, height: 25}} />

                    <Image source={require("../../assets/images/demo.png")} style={styles.image} />
                </View>
                <View style={styles.btnContainer}>
                    <Link href="/auth/signup" asChild>
                        <TouchableOpacity style={styles.signupBtn}>
                            <Text style={styles.text}>Create Account</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/auth/login" asChild>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={styles.text}>Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EDF6F5",
    },
    cont: {
        flex:1,
      justifyContent: "space-between",
    },
    image: {
        width:280,
        height:500,
        resizeMode:"contain",
        marginVertical:30
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical:30
    },
    btnContainer: {
        flex:1,
        flexDirection:"row",
        spaceBetween:10,
        alignItems: "flex-end",
    },
    signupBtn: {
        backgroundColor:"#47EAA633",
        borderBottomLeftRadius:30,
        paddingHorizontal:23,
        paddingVertical:40,
        flex:0.5,
        alignItems:"center"
    },
    loginBtn: {
        backgroundColor:"#47EAA6",
        borderBottomRightRadius:30,
        paddingHorizontal:23,
        paddingVertical:40,
        flex:0.5,
        alignItems:"center"
    },
    text: {
        fontFamily:"Regular",
        color: "#042B2E",
        fontSize: 18,
    }
});

export default Onboarding;