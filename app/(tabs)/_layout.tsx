import {Tabs} from 'expo-router';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text} from 'react-native';
import {useTheme} from "@react-navigation/core";

const TabLabel = ({focused, color, title}: { focused: boolean, color: string, title: string }) => {
    const theme = useTheme();
    const font = theme.fonts.regular;

    return (
        <Text style={[styles.tabBarLabel, {
            color,
            fontWeight: focused ? 'bold' : 'normal',
            fontFamily: font.fontFamily,
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
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 80,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        borderTopWidth: 0,
    },
    tabBarLabel: {
        marginTop: 5,
        fontSize: 10,
    },
});
