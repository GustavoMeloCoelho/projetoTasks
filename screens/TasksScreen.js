import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Modal, Button, ScrollView } from "react-native";
import Task from "../components/Task";
import { getData, storeData } from '../services/storage';




export default function TasksScreen() {
    
    const [inputValue, setInputValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");

    const [tasks, setTasks] = useState([]);
    const [originalTasks, setOriginalTasks] = useState([
       
        // {
        //     id: 4,
        //     name: "Estudar",
        //     description: "Estudar para DevInHouse",
        //     status: "false",
        //     date: "18 set 2024"
        // },
        // {
        //     id: 5,
        //     name: "Pagar boleto",
        //     description: "Pagar boleto do condominio de minas",
        //     status: "false",
        //     date: "17 set 2024"
        // },
        // {
        //     id: 6,
        //     name: "Estudar 2",
        //     description: "Estudar para Faculdade",
        //     status: "false",
        //     date: "18 set 2024"
        // },
        // {
        //     id: 7,
        //     name: "Estudar",
        //     description: "Estudar para DevInHouse",
        //     status: "false",
        //     date: "18 set 2024"
        // },
        // {
        //     id: 8,
        //     name: "Pagar boleto",
        //     description: "Pagar boleto do condominio de minas",
        //     status: "false",
        //     date: "17 set 2024"
        // },
        // {
        //     id: 9,
        //     name: "Estudar 2",
        //     description: "Estudar para Faculdade",
        //     status: "false",
        //     date: "18 set 2024"
        // }
    ]);



    useEffect(() => {
        console.log('usuario digitando no input de busca ou array Original foi alterado')
        const filtered = originalTasks.filter(item =>
            item.name.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))
        setTasks(filtered);

    }, [search, originalTasks]);

    useEffect(() => {
        async function getStorageData() {
          const _tasks = await getData('tasks')
          if (_tasks) {
            setOriginalTasks(_tasks)
          }
        }
    
        getStorageData()
      }, [])

      function newTask(){
        const newTaskToAdd = {
            id: tasks.length + 1,
            name: inputValue,
            description: "uma nova descrição provisória",
            date: "data provisória"
        }

        const data = ([...originalTasks, newTaskToAdd]);
        setOriginalTasks(data);
        storeData("tasks", data);

        setModalVisible(false);
    }

    return(
        <View style={styles.container}>

            <TextInput style={styles.searchInput} placeholder="Pesquise aqui uma tarefa" onChangeText={setSearch} value={search} />
            <Button title="Nova Tarefa" onPress={() => {
                setInputValue("")
                setModalVisible(true)
            }} />

            {tasks.length === 0 ? <Text>Não existem tarefas cadastradas</Text> : <></>}
            <ScrollView>
                <View style={styles.list}>
                    {tasks.map(task => {
                        return (
                            <Task
                                key={task.id}
                                name={task.name}
                                description={task.description}
                                status={task.status}
                                date={task.date}
                            />
                        );

                    })}
                </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Nova Tarefa</Text>
                            <TextInput
                                placeholder='Digite o nome da tarefa'
                                value={inputValue} onChangeText={setInputValue} />
                            <Button title='Cancelar' onPress={() => setModalVisible(false)} />
                            <Button title='Salvar' onPress={newTask} />
                        </View>
                    </View>
                </Modal>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginTop: 10
    },
    searchInput: {
      width: 200,
      height: 32,
      borderWidth: 1,
      borderColor: 'gray',
      textAlign: "center"
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });