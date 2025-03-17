import {Tabs} from 'expo-router';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from "@react-navigation/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLabel = ({focused, color, title}: { focused: boolean, color: string, title: string }) => {
    const {fonts} = useTheme();

    return (
        <Text style={[styles.tabBarLabel, {
            color,
            fontFamily: focused ? fonts.heavy.fontFamily : fonts.regular.fontFamily,
        }]}>
            {title}
        </Text>
    )
};

export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <AntDesign size={28} name="home" color={color}/>,
                    tabBarLabel: ({focused, color}) => (
                        <TabLabel focused={focused} color={color} title="Home"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({color}) => <AntDesign size={28} name="search1" color={color}/>,
                    tabBarLabel: ({focused, color}) => (
                        <TabLabel focused={focused} color={color} title="Search"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="playlists"
                options={{
                    title: 'Playlists',
                    tabBarIcon: ({color}) => <Ionicons size={28} name="list" color={color}/>,
                    tabBarLabel: ({focused, color}) => (
                        <TabLabel focused={focused} color={color} title="Playlists"/>
                    ),
                }}
            />
            <Tabs.Screen
                name="queue"
                options={{
                    title: 'Queue',
                    tabBarIcon: ({color}) => <MaterialIcons size={28} name="queue-music" color={color}/>,
                    tabBarLabel: ({focused, color}) => (
                        <TabLabel focused={focused} color={color} title="Queue"/>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        paddingHorizontal: 25,
        paddingTop: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: 80,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        borderTopWidth: 0,
        position: 'absolute',
    },
    tabBarLabel: {
        marginTop: 5,
        fontSize: 10,
    },
});
