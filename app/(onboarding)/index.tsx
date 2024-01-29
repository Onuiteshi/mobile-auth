import React, {useEffect, useState} from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Dimensions, SafeAreaView,
} from "react-native";
import {Feather, Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";


const OnboardingScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter()

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

        }, 3000);
        if (currentIndex === images.length - 1) {
            setTimeout(() => {
                router.push('/onboarding')
                clearInterval(interval);
            },2800)
        }

        return () => clearInterval(interval);
    }, [currentIndex]);

    const [images] = useState([
        require("../../assets/images/gift-card.png"),
        require("../../assets/images/secure.png"),
        require("../../assets/images/easy.png"),
    ]);
    const [texts] = useState([
        "Gift Cards",
        "Fast & Secure",
        "Easy to use",
    ]);

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}
        >

            <SafeAreaView style={{ backgroundColor: "#fff" }}>
                <StatusBar
                    barStyle={"dark-content"}
                    translucent
                    backgroundColor={"#fff"}
                />
            </SafeAreaView>
            <View
                style={styles.imageContainer}
            >

                <Image source={require("../../assets/images/logo2.png")} resizeMode={"contain"} style={{width: 100, height: 25}} />

                <Image source={images[currentIndex]} style={styles.image} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {texts[currentIndex]}
                </Text>
                <Text style={styles.description}>
                    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                </Text>
                <View style={styles.indicatorContainer}>
                    {images.map((image, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                {
                                    backgroundColor:
                                        index === currentIndex ? "#042B2E" : "#C4C4C4",
                                    opacity: index === currentIndex ? 1 : 0.5,
                                },
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={()=>router.push('/onboarding')} style={styles.skipButton}>
                    <Text style={{fontFamily:"Regular", color: "#47EAA6", fontSize: 17}}>Skip</Text>
                </TouchableOpacity>
            </View>



        </ScrollView>
    );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        width: windowWidth,
        backgroundColor:"#EDF6F5"
    },
    image: {
        width:300,
        height:350,
        resizeMode:"contain",
        marginVertical:30
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
        backgroundColor:"#fff",
        paddingVertical:35
    },
    indicatorContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    indicator: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: "#C4C4C4",
        marginHorizontal: 4,
    },
    textContainer: {
        marginBottom: 30,
        paddingHorizontal:25,
        justifyContent:"center",
    },
    text: {
        fontSize: 22,
        marginBottom: 10,
        fontFamily:"Bold",
        textAlign:"center"
    },
    description: {
        fontSize: 16,
        color: "#000",
        fontFamily:"Light",
        textAlign:"center",
        marginBottom: 10,
    },

    skipButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        marginRight: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    finalButtonsContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 20,
    },
    signupButton: {
        backgroundColor: "#0898A0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: 335,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    signupButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    signinButton: {
        backgroundColor: "rgba(113, 135, 156, 0.1)",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: 335,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    signinButtonText: {
        color: "#0898A0",
        fontSize: 16,
        fontWeight: "bold",
    },
    bottomSpace: {
        height: 100,
    },
});

export default OnboardingScreen;