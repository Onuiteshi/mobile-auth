import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, TouchableOpacity, Image, View, Text, TextInput, Alert} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useForm, Controller} from 'react-hook-form';
import {useLocalSearchParams, useRouter} from "expo-router";
import axios from "axios";

type FormData = {
    password: string;
}

export default function Password() {
    const router:any = useRouter()
    const params = useLocalSearchParams();
    const { email} = params;

    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({});
    const onSubmit = data => {
        router.push({pathname: "/auth/info", params: {email, password: data.password}});
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
            <View style={{paddingHorizontal:20}}>
                <View style={{marginTop:10}}>
                    <Text style={styles.title}>Create Password</Text>
                    <Text style={{fontFamily:"Light",fontSize:18,color:"#000000"}}>Create your log in password to keep your account secure</Text>
                </View>
                <View style={{marginTop:40}}>
                    <View>
                        <Text style={styles.label}>Set Password</Text>
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
                                    placeholder="Set Password"
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
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    checkbox: {
        alignSelf: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#47EAA6",
        color: "#47EAA6",
        width: 17,
        height: 17,
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
