import { useEffect, useState } from "react";
import {StyleSheet, View, Text, Switch} from "react-native";

export default function Task({name, description, status, date}) {

    const [isDone, setIsDone] = useState(false);

    function checkTask () {
        setIsDone(!isDone);      
    }

    return(
        <View style={styles.card} >
            <Text style={isDone ? styles.strikethrough : null}>Nome: {name}</Text>
            <Text style={isDone ? styles.strikethrough : null}>Descrição: {description}</Text>
            <Text style={isDone ? styles.strikethrough : null}>Status: {status}</Text>
            <Text style={isDone ? styles.strikethrough : null}>Data: {date}</Text>
            <Switch
            value = {isDone}
            onValueChange={checkTask}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'gray',
        height: 'auto',
        padding: 14,
        borderRadius: 4,
       
    },
    strikethrough: {
        textDecorationLine: 'line-through',
    }
})