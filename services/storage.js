import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    
    try{
        const jsonValue = JSON.stringify(value);
        console.log("valor json:"+jsonValue);
        await AsyncStorage.setItem(key,jsonValue);
    }catch(error){
        console.log("deu ruim pra salvar", error)
    }
};

export const getData = async (key) => {
    try{
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null
    }catch(error){
        console.log("deu ruim para pegar o dado", error);
    }
};