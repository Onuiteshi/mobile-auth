import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, TouchableOpacity, Image, View, Text, TextInput, Alert} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useForm, Controller, SubmitErrorHandler} from 'react-hook-form';
import {Checkbox} from "expo-checkbox";
import {useState} from "react";
import {useRouter} from "expo-router";
import axios from "axios";


type FormData = {
    email: string;
    password: string;
}

export default function Login() {
    const router:any = useRouter()

    const { handleSubmit, control,  formState: { errors } } = useForm<FormData>({});
    const onSubmit = data => {
        axios.post(`https://cardex.live/api/auth/login`, {email: data.email, password: data.password}).then((r) => {
            if(r.data.statusCode === 200) {
                router.push('(tabs)');
            }
        }).catch(error => {
            Alert.alert("error")
        })
    };

    return (
        <View style={styles.container}>
            <View>
                <SafeAreaView style={{ backgroundColor: "#EDF6F5" }}>
                    <StatusBar
                        barStyle={"dark-content"}
                        translucent
                        backgroundColor={"#EDF6F5"}
                    />
                </SafeAreaView>
                <View
                    style={styles.topBar}
                    className=" flex-row items-center justify-between py-1.5 pt-3 px-3"
                >
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons
                            className=""
                            name="arrow-back"
                            size={30}
                            color={"#1A0E2C"}
                        />
                    </TouchableOpacity>
                    <Image source={require("../../assets/images/logo.png")} resizeMode={"contain"} style={{width: 21, height: 21}} />

                </View>
            </View>
            <View style={styles.cont}>
                <View style={{marginTop:10}}>
                    <Text style={styles.title}>Log in</Text>
                    <Text style={{fontFamily:"Light",fontSize:18,color:"#000000"}}>Enter email address and password to log in</Text>
                    <View style={{marginTop:40}}>
                        <View>
                            <View>
                                <Text style={styles.label}>Email Address</Text>
                                <Controller
                                    control={control}
                                    render={({field: { onChange, onBlur, value }}) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            keyboardType={"email-address"}
                                            placeholder="Enter your email address"
                                            placeholderTextColor={"#6A6A6A"}
                                        />
                                    )}
                                    name="email"
                                    rules={{ required: true }}
                                />
                                {errors.email && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>This is required.</Text>}
                            </View>
                            <View>
                                <Text style={styles.label}>Enter Password</Text>
                                <Controller
                                    control={control}
                                    render={({field: { onChange, onBlur, value }}) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            keyboardType={"default"}
                                            secureTextEntry
                                            placeholder="Enter Password"
                                            placeholderTextColor={"#6A6A6A"}
                                        />
                                    )}
                                    name="password"
                                    rules={{
                                        minLength: 8,
                                        required: true,
                                    }}
                                />
                                {errors.password && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>Password is required.</Text>}
                            </View>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={styles.label1}>Online Card Access</Text>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.btn}>
                        <Text style={styles.btnTitle}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#EDF6F5"
    },
    cont: {
        paddingHorizontal:20,
        flex:1,
        justifyContent:"space-between",
        marginBottom:40
    },
    topBar: {
        backgroundColor: "#EDF6F5",
        marginTop: Platform.OS === "android" ? 25 : null,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingVertical:10,
        paddingHorizontal:20
    },
    title: {
        fontSize: 30,
        fontFamily:"Bold",
        color:"#000000",
        marginBottom:10
    },
    label: {
        fontSize: 14,
        fontFamily:"Regular",
        color:"#BEBEBE",
        marginBottom:5
    },
    input: {
        fontSize: 14,
        fontFamily:"Regular",
        color:"#000000",
        marginBottom:10,
        backgroundColor:"rgba(209, 209, 209, 0.2)",
        paddingHorizontal:10,
        paddingVertical:23,
        borderRadius:10
    },
    label1: {
        fontFamily:"Bold",
        fontSize:18,
        color:"#042B2E",
        textAlign:"center"
    },
    btn: {
        backgroundColor: "#47EAA6",
        borderRadius: 10,
        paddingVertical: 20,
        marginTop: 20
    },
    btnTitle: {
        color: "#042B2E",
        textAlign: "center",
        fontSize: 16,
        fontFamily:"Regular"
    }
});
