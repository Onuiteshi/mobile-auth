import { StatusBar } from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, TouchableOpacity, Image, View, Text, TextInput, Alert} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useForm, Controller} from 'react-hook-form';
import {useLocalSearchParams, useRouter} from "expo-router";
import axios from "axios";

type FormData = {
    phoneNumber: string;
}

export default function Phone() {
    const router:any = useRouter()
    const params = useLocalSearchParams();
    const { infoData} = params;

    const {  handleSubmit, control, formState: { errors } } = useForm<FormData>({});
    const onSubmit = data => {
        axios.post(`https://cardex.live/api/auth/register`,{...infoData, ...data}).then((r) => {
            if(r.data.statusCode === 200) {
                Alert.alert(r.data.message)
                setTimeout(() => {
                    router.push('/auth/login');
                },3000)
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
            <View style={{paddingHorizontal:20}}>
                <View style={{marginTop:10}}>
                    <Text style={styles.title}>Almost done</Text>
                    <Text style={{fontFamily:"Light",fontSize:18,color:"#000000"}}>We will use this phone number to authenticate transactions & Log ins</Text>
                </View>
                <View style={{marginTop:40}}>
                    <View>
                        <Text style={styles.label}>Phone Number</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"number-pad"}
                                    maxLength={11}
                                    placeholder="09067299384"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="phoneNumber"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.phoneNumber && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>Phone is required.</Text>}
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
