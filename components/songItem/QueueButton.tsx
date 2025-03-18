import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {useTheme} from "@react-navigation/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useNavigationState} from "@react-navigation/native";

interface QueueButtonProps {
    handleAddToQueue: () => Promise<void>;
    handleRemoveFromQueue: () => Promise<void>;
    isLoading: boolean;
    tooltipVisible: boolean;
    tooltipMessage?: string;
}

export default function QueueButton(props: QueueButtonProps) {
    const {colors, fonts} = useTheme();
    const colorScheme = useColorScheme();
    const currentRoute = useNavigationState((state) => state.routes[state.index]);
    const isOnQueueScreen = currentRoute.name === 'queue';

    const tooltipBgColor = colorScheme === 'dark' ? "#2a2e42" : colors.primary;

    return (
        <Pressable
            onPress={isOnQueueScreen ? props.handleRemoveFromQueue : props.handleAddToQueue}
            disabled={props.isLoading}
            style={({pressed}) => [
                localStyles.queueIcon,
                {opacity: pressed || props.isLoading ? 0.5 : 1}
            ]}
        >
            <MaterialIcons
                name={isOnQueueScreen ? "playlist-remove" : "queue-music"}
                color={colors.primary}
                size={25}
                style={{marginHorizontal: 'auto'}}
            />
            {props.tooltipVisible && (
                <View style={[localStyles.tooltip, {backgroundColor: tooltipBgColor}]}>
                    <Text style={{color: colors.text, fontFamily: fonts.regular.fontFamily}}>
                        {props.tooltipMessage}
                    </Text>
                </View>
            )}
        </Pressable>
    )
}

const localStyles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        top: 20,
        padding: 5,
        borderRadius: 3,
        alignSelf: 'center',
        width: 200,
    },
    queueIcon: {
        width: "20%"
    },
});

