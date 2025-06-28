import { Text, Image, StyleSheet} from "react-native";  

export default function AvatarComponent({ avatarUrl, name }) {

    return (
        <Text style={styles.container}>
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            <Text style={styles.name}>{name}</Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});