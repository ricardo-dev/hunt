import React, { Component } from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Header} from 'react-native';
import api from '../services/api'; // chaama api

export default class Main extends Component{

    static navigationOptions = {
        title: 'JSHunt Main',
        headerTitleStyle: {
            textAlign:"center", 
            flex:1 
         },
    };

    // variavel estado - pratica do react
    // sempre que alterado o state, o render e chamado
    // isto e uma funcao default do react-native
    state = {
        docs: [], // numero de registros
        page: 1, // paginacao
        productInfo: {} // todos os campos fora o docs
    };

    // construtor do render
    componentDidMount(){
        this.loadProducts();
    }

    // precisa ser arrowfunction
    // modelo padrao somente para
    // metodos Component
    loadProducts = async (page = 1) => {
        const response = await api.get(
            `/products?page=${page}`
        );
        const { docs, ...productInfo } = response.data;
        console.log(docs);

        // atribuindo valor ao state
        this.setState({ docs: [...this.state.docs, ...docs], productInfo, page });
    }

    loadMore = () => {
        const { page, productInfo } = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page+1;
        this.loadProducts(pageNumber);
    }

    renderItem = ({item}) => (
        
        <View style={styles.productContainer}> 
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>

            <TouchableOpacity 
                style={styles.productButton}
                onPress={() => {
                    this.props.navigation.navigate('Product',{ product:item});
                }}>

                <Text style={styles.productButtonText}>Acessar</Text>

            </TouchableOpacity>
        </View>
    );

    render(){
        return (    
            
            <View style={styles.container}>
                <FlatList 
                contentContainerStyle={styles.list}
                data={this.state.docs}
                keyExtractor={item => item._id}
                renderItem={this.renderItem} 
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.1}/>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor: "#fafafa",
        },
        list:{
            padding: 25,
        },
        productContainer: {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#DDD',
            borderRadius: 5,
            padding: 20,
            marginBottom: 20,
        },
        productTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: '#333',
        },
        productDescription: {
            fontSize: 16,
            color: '#999',
            marginTop: 5,
            lineHeight: 24,
        }, 
        productButton: {
            height: 42,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: '#DA552F',
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        productButtonText: {
            fontSize: 16,
            color: '#DA552F',
            fontWeight: 'bold',
        },
    }
);