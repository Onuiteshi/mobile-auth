import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    TextInput,
    ScrollView
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useForm, Controller} from 'react-hook-form';
import {useLocalSearchParams, useRouter} from "expo-router";

type FormData = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    state: string;
    address: string;
    bvn: string;
}
export default function Info() {
    const router:any = useRouter()
    const params = useLocalSearchParams();
    const { email,password} = params;

    const {  handleSubmit, control, formState: { errors } } = useForm<FormData>({});
    const onSubmit = data => {
        const infoData = {
            email: email,
            password: password,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            state: data.state,
            address: data.address,
            bvn: data.bvn
        }
        router.push({pathname: "/auth/phone", params: {infoData}});
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
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal:20}}>
                <View style={{marginTop:10}}>
                    <Text style={styles.title}>Let's get started</Text>
                    <Text style={{fontFamily:"Light",fontSize:18,color:"#000000"}}>
                        Please fill in the details as it appears on your official documents or means of identification
                    </Text>
                </View>
                <View style={{marginTop:40}}>
                    <View>
                        <Text style={styles.label}>First Name</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="First Name"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="firstName"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.firstName&& <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>First Name is required.</Text>}
                    </View>
                    <View style={{marginTop:6}}>
                        <Text style={styles.label}>Last Name</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="Last Name"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="lastName"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.lastName&& <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>Last Name is required.</Text>}
                    </View>
                    <View style={{marginTop:6}}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="yyyy-mm-dd"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="dateOfBirth"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.dateOfBirth && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>Date of Birth is required.</Text>}
                    </View>
                    <View style={{marginTop:6}}>
                        <Text style={styles.label}>Home Address</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="Enter Address"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="address"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.address && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>Address is required.</Text>}
                    </View>
                    <View style={{marginTop:6}}>
                        <Text style={styles.label}>State</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="Enter State"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="state"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.state && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>State is required.</Text>}
                    </View>
                    <View style={{marginTop:6}}>
                        <Text style={styles.label}>BVN</Text>
                        <Controller
                            control={control}
                            render={({field: { onChange, onBlur, value }}) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    keyboardType={"default"}
                                    placeholder="Enter BVN"
                                    placeholderTextColor={"#6A6A6A"}
                                />
                            )}
                            name="bvn"
                            rules={{
                                required: true,
                            }}
                        />
                        {errors.bvn && <Text style={{color:"red",fontSize:10,fontFamily:"Light"}}>BVN is required.</Text>}
                    </View>
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.btn}>
                        <Text style={styles.btnTitle}>Proceed</Text>
                    </TouchableOpacity>
                    <View style={{height:20}}/>
                </View>
            </ScrollView>

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
