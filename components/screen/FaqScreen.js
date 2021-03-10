import {Text, View, ScrollView, StyleSheet, ImageBackground} from "react-native";
import React from "react";
import {Lato_500Medium, useFonts} from "@expo-google-fonts/lato";
import { Color } from "../../utils/Colors";

function FaqScreen({navigation}) {
    let [fontLoaded] = useFonts({ Lato_500Medium});
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground source={Color.BG_IMAGE} style={styles.image}>
                <View style={styles.faqHolder}>
                    <Text style={styles.faqQuestion}>1- İlk hangi program ile baslamalıyım?</Text>
                    <Text style={styles.faqAnswer}>Aydınlanma meditasyonu ile.</Text>
                    <Text style={styles.faqQuestion}>2- Aydınlanma nedir?</Text>
                    <Text style={styles.faqAnswer}>İçinizdeki kendi kundalini enerjinizin uyanıp yükselerek 7. enerji merkezinize gelmesi ve sizi evrensel yaşam enerjisiyle bağlantıya geçirmesidir. 7 enerji merkezi videolarıyla devam edebilirsiniz.</Text>
                    <Text style={styles.faqQuestion}>3- Ellerde serin esinti ve karıncalanmanın anlamı nedir?</Text>
                    <Text style={styles.faqAnswer}>Kundalini uyandıktan sonra yükselip 7 enerji merkezinden geçerken durumunuzu yansıtan işaretlerdir. Serinlik merkezlerinizde blokaj olmadığını, karıncalanma ise blokajları gösterir.</Text>
                    <Text style={styles.faqQuestion}>4- Ne sıklıkla meditasyon yapmalıyım?</Text>
                    <Text style={styles.faqAnswer}>Mümkünse sabah güne başlamadan ve akşam yatmadan yapmak idealdir.</Text>
                    <Text style={styles.faqQuestion}>5- Meditasyon korkularımı geçirebilir mi?</Text>
                    <Text style={styles.faqAnswer}>Korkular 4. enerji merkezindeki blokajdan dolayıdır. 4.enerji merkezine yapılan meditasyon korkuyu temizler.</Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%",
        flexGrow: 1,
    },
    faqHolder:{
        paddingTop:90,
        paddingBottom:35,
        paddingLeft:35,
        paddingRight:35
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: "cover"
    },
    faqQuestion:{
        color: "#fff",
        fontFamily: "Lato_500Medium",
        fontSize:15,
        marginBottom:30
    },
    faqAnswer:{
        color: "#fff",
        fontFamily: "Lato_500Medium",
        fontSize:15,
        marginBottom:30,
        paddingLeft:20
    }
});

export default FaqScreen;
