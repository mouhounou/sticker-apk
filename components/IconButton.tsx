import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress: () => void;
};



export default function IconButton({icon, label, onPress} : Props) {
    return (
        <Pressable style = {styles.iconButton}>
            <MaterialIcons name={icon} size={24} color="#fff" onPress={onPress}/>
            <Text style = {styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
})